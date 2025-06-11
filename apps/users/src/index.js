const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { PrismaClient } = require("@prisma/client")
const Redis = require("redis")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Prisma
// const prisma = new PrismaClient()
// Prisma singleton setup
const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton();
}

const prisma = global.prismaGlobal;

// Redis connection
const redis = Redis.createClient({
  url: process.env.REDIS_URL,
})
redis.connect()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "users" })
})

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Check cache first
    const cached = await redis.get(`user:${id}`)
    if (cached) {
      return res.json(JSON.parse(cached))
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        created_at: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Cache for 5 minutes
    await redis.setEx(`user:${id}`, 300, JSON.stringify(user))

    res.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/users", async (req, res) => {
  try {
    const { email, name, username, displayName, auth0_id } = req.body

    const user = await prisma.user.create({
      data: {
        email,
        name,
        username: username || email.split("@")[0],
        displayName: displayName || name,
        // auth0_id, // Add this field to schema if needed
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        displayName: true,
        created_at: true,
      },
    })

    // Cache the new user
    await redis.setEx(`user:${user.id}`, 300, JSON.stringify(user))

    res.status(201).json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "User already exists" })
    }
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`)
})

module.exports = app
