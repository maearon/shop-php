const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { Pool } = require("pg")
const Redis = require("redis")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3001

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

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

    const result = await pool.query("SELECT id, email, name, created_at FROM users WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    const user = result.rows[0]

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
    const { email, name, auth0_id } = req.body

    const result = await pool.query(
      "INSERT INTO users (email, name, auth0_id) VALUES ($1, $2, $3) RETURNING id, email, name, created_at",
      [email, name, auth0_id],
    )

    const user = result.rows[0]

    // Cache the new user
    await redis.setEx(`user:${user.id}`, 300, JSON.stringify(user))

    res.status(201).json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`)
})

module.exports = app
