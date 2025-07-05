import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import md5 from "blueimp-md5";

export const getGravatarUrl = (email: string, size = 50): string => {
  const hash = md5(email.trim().toLowerCase());
  return `https://secure.gravatar.com/avatar/${hash}?s=${size}`;
};

enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE'
}

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userEmail?: string | null;
}

interface JoinRoomData {
  roomId: string;
}

interface MessageData {
  roomId: string;
  content: string;
  type?: 'text' | 'image' | 'file';
}

interface LeaveRoomData {
  roomId: string;
}

export function initializeSocket(io: Server, prisma: PrismaClient) {
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token =
        (socket.handshake.query.token as string) ||
        socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) return next(new Error('Authentication token required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { id: decoded.sub }, // ✅ lấy id từ sub
      });

      if (!user) {
        return next(new Error('User not found from token sub'));
      }

      // if (!user) {
      //   const email = decoded.email || decoded.sub;
      //   const name = decoded.name || 'Anonymous User';

      //   user = await prisma.user.create({
      //     data: {
      //       email,
      //       name,
      //       displayName: name,
      //       username: email?.split('@')[0] ?? `user_${Date.now()}`,
      //       created_at: new Date(),
      //       updated_at: new Date(),
      //       date_joined: new Date(),
      //       password: '', // hoặc một hash mặc định nếu cần
      //       first_name: '',
      //       last_name: '',
      //       avatarUrl: decoded.picture || getGravatarUrl(email),
      //     },
      //   });
      // }

      socket.userId = user.id;
      socket.userEmail = user.email;

      console.log(`✅ User authenticated: ${user.email} (${user.id})`);
      next();
    } catch (error) {
      console.error('❌ Socket authentication failed:', error);
      next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`🔌 User connected: ${socket.userEmail} (${socket.id})`);

    socket.on('join_room', async ({ roomId }: JoinRoomData) => {
      try {
        let room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room) {
          room = await prisma.room.create({
            data: {
              id: roomId,
              name: roomId,
              type: 'public',
            },
          });
        }

        socket.join(roomId);

        const messages = await prisma.message.findMany({
          where: { room_id: roomId },
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { created_at: 'desc' },
          take: 50,
        });

        socket.emit('message_history', {
          roomId,
          messages: messages.reverse(),
        });

        socket.to(roomId).emit('user_joined', {
          userId: socket.userId,
          userEmail: socket.userEmail,
          roomId,
        });

        console.log(`👥 User ${socket.userEmail} joined room: ${roomId}`);
      } catch (error) {
        console.error('❌ Error joining room:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('message', async ({ roomId, content, type = 'text' }: MessageData) => {
      try {
        if (!content?.trim()) {
          return socket.emit('error', { message: 'Message content is required' });
        }

        const prismaType = (type?.toUpperCase() as keyof typeof MessageType) || 'TEXT';

        const message = await prisma.message.create({
          data: {
            content: content.trim(),
            type: MessageType[prismaType],
            room_id: roomId,
            user_id: socket.userId!,
          },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        });

        await prisma.room.update({
          where: { id: roomId },
          data: {
            last_message_at: new Date(),
            last_message: content.trim(),
          },
        });

        const avatarUrl = getGravatarUrl(message.user.email ?? 'default@example.com');

        io.to(roomId).emit('new_message', {
          id: message.id,
          content: message.content,
          type: message.type,
          roomId: message.room_id,
          user: {
            ...message.user,
            avatar: avatarUrl,
          },
          createdAt: message.created_at,
          isBot: false,
        });

        console.log(`💬 Message sent in ${roomId} by ${socket.userEmail}`);
      } catch (error) {
        console.error('❌ Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('typing', ({ roomId, isTyping }: { roomId: string; isTyping: boolean }) => {
      socket.to(roomId).emit('user_typing', {
        userId: socket.userId,
        userEmail: socket.userEmail,
        isTyping,
      });
    });

    socket.on('leave_room', async ({ roomId }: LeaveRoomData) => {
      try {
        socket.leave(roomId);
        socket.to(roomId).emit('user_left', {
          userId: socket.userId,
          userEmail: socket.userEmail,
          roomId,
        });

        console.log(`👋 User ${socket.userEmail} left room: ${roomId}`);
      } catch (error) {
        console.error('❌ Error leaving room:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.userEmail} (${socket.id})`);
    });
  });
}
