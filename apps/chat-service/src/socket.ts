import type { Server, Socket } from "socket.io"
import type { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

interface AuthenticatedSocket extends Socket {
  userId?: string
  username?: string
}

interface JoinRoomData {
  roomId: string
}

interface MessageData {
  roomId: string
  content: string
  type?: "text" | "image" | "file"
}

interface LeaveRoomData {
  roomId: string
}

export function setupSocket(io: Server, prisma: PrismaClient) {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token =
        (socket.handshake.query.token as string) || socket.handshake.headers.authorization?.replace("Bearer ", "")

      if (!token) {
        return next(new Error("Authentication token required"))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      socket.userId = decoded.userId || decoded.id
      socket.username = decoded.username || decoded.name || `User_${socket.userId}`

      console.log(`🔐 User ${socket.username} (${socket.userId}) authenticated`)
      next()
    } catch (error) {
      console.error("❌ Authentication failed:", error)
      next(new Error("Invalid authentication token"))
    }
  })

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`👋 User ${socket.username} connected (${socket.id})`)

    // Join room event
    socket.on("join_room", async (data: JoinRoomData) => {
      try {
        const { roomId } = data

        // Create room if it doesn't exist
        await prisma.room.upsert({
          where: { id: roomId },
          update: { updatedAt: new Date() },
          create: {
            id: roomId,
            name: `Room ${roomId}`,
            createdBy: socket.userId!,
          },
        })

        // Join the socket room
        socket.join(roomId)

        // Get recent messages (last 50)
        const messages = await prisma.message.findMany({
          where: { roomId },
          include: {
            user: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        })

        // Send recent messages to the user
        socket.emit("room_history", {
          roomId,
          messages: messages.reverse(),
        })

        // Notify others in the room
        socket.to(roomId).emit("user_joined", {
          userId: socket.userId,
          username: socket.username,
          timestamp: new Date(),
        })

        console.log(`📥 User ${socket.username} joined room ${roomId}`)
      } catch (error) {
        console.error("❌ Error joining room:", error)
        socket.emit("error", { message: "Failed to join room" })
      }
    })

    // Message event
    socket.on("message", async (data: MessageData) => {
      try {
        const { roomId, content, type = "text" } = data

        // Create user if doesn't exist
        await prisma.user.upsert({
          where: { id: socket.userId! },
          update: { username: socket.username! },
          create: {
            id: socket.userId!,
            username: socket.username!,
          },
        })

        // Save message to database
        const message = await prisma.message.create({
          data: {
            content,
            type,
            roomId,
            userId: socket.userId!,
          },
          include: {
            user: {
              select: { id: true, username: true },
            },
          },
        })

        // Broadcast message to all users in the room
        io.to(roomId).emit("new_message", {
          id: message.id,
          content: message.content,
          type: message.type,
          roomId: message.roomId,
          user: message.user,
          createdAt: message.createdAt,
        })

        console.log(`💬 Message from ${socket.username} in room ${roomId}: ${content.substring(0, 50)}...`)
      } catch (error) {
        console.error("❌ Error sending message:", error)
        socket.emit("error", { message: "Failed to send message" })
      }
    })

    // Leave room event
    socket.on("leave_room", (data: LeaveRoomData) => {
      const { roomId } = data
      socket.leave(roomId)

      // Notify others in the room
      socket.to(roomId).emit("user_left", {
        userId: socket.userId,
        username: socket.username,
        timestamp: new Date(),
      })

      console.log(`📤 User ${socket.username} left room ${roomId}`)
    })

    // Typing indicators
    socket.on("typing_start", (data: { roomId: string }) => {
      socket.to(data.roomId).emit("user_typing", {
        userId: socket.userId,
        username: socket.username,
      })
    })

    socket.on("typing_stop", (data: { roomId: string }) => {
      socket.to(data.roomId).emit("user_stopped_typing", {
        userId: socket.userId,
        username: socket.username,
      })
    })

    // Disconnect event
    socket.on("disconnect", () => {
      console.log(`👋 User ${socket.username} disconnected (${socket.id})`)
    })
  })
}
