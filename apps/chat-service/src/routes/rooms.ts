import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const router = Router()
const prisma = new PrismaClient()

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

// Get chat history of a room
router.get("/:roomId/messages", authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params
    const { page = 1, limit = 50 } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    const messages = await prisma.message.findMany({
      where: { roomId },
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: Number(limit),
    })

    const totalMessages = await prisma.message.count({
      where: { roomId },
    })

    res.json({
      messages: messages.reverse(),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalMessages,
        totalPages: Math.ceil(totalMessages / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

// List active chat rooms
router.get("/", authenticateToken, async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { id: true, username: true },
            },
          },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    const roomsWithLastMessage = rooms.map((room) => ({
      id: room.id,
      name: room.name,
      createdBy: room.createdBy,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      messageCount: room._count.messages,
      lastMessage: room.messages[0] || null,
    }))

    res.json({ rooms: roomsWithLastMessage })
  } catch (error) {
    console.error("Error fetching rooms:", error)
    res.status(500).json({ error: "Failed to fetch rooms" })
  }
})

// Create a new room
router.post("/", authenticateToken, async (req: any, res) => {
  try {
    const { name, id } = req.body

    if (!name) {
      return res.status(400).json({ error: "Room name is required" })
    }

    const room = await prisma.room.create({
      data: {
        id: id || undefined, // Let Prisma generate if not provided
        name,
        createdBy: req.user.userId || req.user.id,
      },
    })

    res.status(201).json({ room })
  } catch (error) {
    console.error("Error creating room:", error)
    res.status(500).json({ error: "Failed to create room" })
  }
})

export default router
