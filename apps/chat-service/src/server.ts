import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import { setupSocket } from "./socket"
import roomRoutes from "./routes/rooms"

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

const prisma = new PrismaClient()

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Routes
app.use("/rooms", roomRoutes)

// Setup Socket.IO
setupSocket(io, prisma)

const PORT = process.env.PORT || 3002

server.listen(PORT, () => {
  console.log(`🚀 Chat service running on port ${PORT}`)
  console.log(`📡 Socket.IO server ready for connections`)
})

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🔄 Shutting down gracefully...")
  await prisma.$disconnect()
  server.close(() => {
    console.log("✅ Server closed")
    process.exit(0)
  })
})
