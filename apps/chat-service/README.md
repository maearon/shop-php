# Chat Service 💬

A real-time chat service built with Node.js, Express, Socket.IO, and PostgreSQL. Features JWT authentication, room-based messaging, and REST API endpoints.

## 🚀 Features

- **Real-time messaging** with Socket.IO
- **JWT authentication** for secure connections
- **PostgreSQL database** with Prisma ORM
- **Room-based chat** system
- **REST API** for chat history and room management
- **Docker support** for easy deployment
- **Render deployment** ready
- **TypeScript** for type safety

## 📦 Tech Stack

- **Backend**: Node.js + Express + TypeScript
- **WebSocket**: Socket.IO
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT
- **Deployment**: Docker + Render

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone and Install

\`\`\`bash
git clone <your-repo>
cd chat-service
npm install
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your configuration:

\`\`\`env
DATABASE_URL="your-postgresql-connection-string"
PORT=3002
JWT_SECRET="your-super-secret-jwt-key"
CORS_ORIGIN="http://localhost:3000"
\`\`\`

### 3. Database Setup

\`\`\`bash
# Generate Prisma client
npm run generate

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed
\`\`\`

### 4. Development

\`\`\`bash
# Start development server
npm run dev

# Or use Makefile
make dev
\`\`\`

### 5. Production Build

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

## 🐳 Docker Development

### Using Docker Compose (Recommended)

\`\`\`bash
# Start all services (app + PostgreSQL)
make docker-up

# View logs
make docker-logs

# Stop services
make docker-down
\`\`\`

### Manual Docker Build

\`\`\`bash
# Build image
docker build -t chat-service .

# Run container
docker run -p 3002:3002 \
  -e DATABASE_URL="your-db-url" \
  -e JWT_SECRET="your-secret" \
  chat-service
\`\`\`

## 🌐 Render Deployment

### 1. Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `chat-service`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 2. Environment Variables

Add these environment variables in Render:

\`\`\`
DATABASE_URL=postgres://default:z9GYTlrXa8Qx@ep-bold-voice-a4yp8xc9-pooler.us-east-1.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15&sslmode=require
JWT_SECRET=somethingsecure
PORT=3002
CORS_ORIGIN=https://your-frontend-domain.com
\`\`\`

### 3. Deploy

\`\`\`bash
# Deploy using Render CLI (optional)
make deploy
\`\`\`

Your service will be available at: `https://your-service-name.onrender.com`

## 📡 API Endpoints

### REST API

\`\`\`bash
# Health check
GET /health

# Get chat rooms (requires JWT)
GET /rooms
Authorization: Bearer <jwt-token>

# Get room messages (requires JWT)
GET /rooms/:roomId/messages?page=1&limit=50
Authorization: Bearer <jwt-token>

# Create new room (requires JWT)
POST /rooms
Authorization: Bearer <jwt-token>
Content-Type: application/json
{
  "name": "Room Name",
  "id": "optional-custom-id"
}
\`\`\`

### WebSocket Events

#### Client → Server

\`\`\`javascript
// Join a room
socket.emit('join_room', { roomId: 'general' });

// Send message
socket.emit('message', {
  roomId: 'general',
  content: 'Hello world!',
  type: 'text' // optional: 'text', 'image', 'file'
});

// Leave room
socket.emit('leave_room', { roomId: 'general' });

// Typing indicators
socket.emit('typing_start', { roomId: 'general' });
socket.emit('typing_stop', { roomId: 'general' });
\`\`\`

#### Server → Client

\`\`\`javascript
// Room history when joining
socket.on('room_history', (data) => {
  console.log('Messages:', data.messages);
});

// New message received
socket.on('new_message', (message) => {
  console.log('New message:', message);
});

// User events
socket.on('user_joined', (data) => {
  console.log('User joined:', data.username);
});

socket.on('user_left', (data) => {
  console.log('User left:', data.username);
});

// Typing indicators
socket.on('user_typing', (data) => {
  console.log(`${data.username} is typing...`);
});

socket.on('user_stopped_typing', (data) => {
  console.log(`${data.username} stopped typing`);
});

// Error handling
socket.on('error', (error) => {
  console.error('Socket error:', error);
});
\`\`\`

## 🔧 Makefile Commands

\`\`\`bash
make dev              # Start development server
make build            # Build for production
make start            # Start production server
make migrate          # Run database migrations
make generate         # Generate Prisma client
make studio           # Open Prisma Studio
make seed             # Seed database
make docker-up        # Start with Docker Compose
make docker-down      # Stop Docker services
make clean            # Clean build files
make test             # Test service health
\`\`\`

## 🔌 Frontend Integration

### Next.js Chat Widget Example

\`\`\`typescript
// components/chat-widget.tsx
'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  user: { username: string };
  createdAt: string;
}

export default function ChatWidget() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get JWT token from your auth system
    const token = localStorage.getItem('authToken');
    
    if (!token) return;

    // Connect to chat service
    const socketInstance = io('https://your-chat-service.onrender.com', {
      query: { token }
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      // Join a room (e.g., general chat)
      socketInstance.emit('join_room', { roomId: 'general' });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('room_history', (data) => {
      setMessages(data.messages);
    });

    socketInstance.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketInstance.on('error', (error) => {
      console.error('Chat error:', error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return;

    socket.emit('message', {
      roomId: 'general',
      content: newMessage,
      type: 'text'
    });

    setNewMessage('');
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        Chat {isConnected ? '🟢' : '🔴'}
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.user.username}:</strong> {message.content}
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
\`\`\`

## 🔒 Authentication

The service expects JWT tokens with the following payload:

\`\`\`json
{
  "userId": "user123",
  "username": "john_doe",
  "iat": 1640995200,
  "exp": 1641081600
}
\`\`\`

Pass the token via:
- **Query parameter**: `?token=your-jwt-token`
- **Authorization header**: `Authorization: Bearer your-jwt-token`

## 📊 Database Schema

\`\`\`sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_by TEXT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'TEXT',
  room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **Connection refused**
   \`\`\`bash
   # Check if service is running
   make test
   curl http://localhost:3002/health
   \`\`\`

2. **Database connection failed**
   \`\`\`bash
   # Verify DATABASE_URL
   echo $DATABASE_URL
   
   # Test connection
   npx prisma db pull
   \`\`\`

3. **JWT authentication failed**
   \`\`\`bash
   # Verify JWT_SECRET is set
   echo $JWT_SECRET
   
   # Check token format in frontend
   console.log('Token:', localStorage.getItem('authToken'));
   \`\`\`

4. **CORS issues**
   \`\`\`bash
   # Update CORS_ORIGIN in .env
   CORS_ORIGIN="https://your-frontend-domain.com"
   \`\`\`

### Logs

\`\`\`bash
# Docker logs
make docker-logs

# Production logs (Render)
# Check Render dashboard logs section
\`\`\`

## 📈 Monitoring

### Health Check

\`\`\`bash
curl https://your-service.onrender.com/health
\`\`\`

### Metrics

The service provides basic logging for:
- User connections/disconnections
- Message sending
- Room joining/leaving
- Authentication attempts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**🚀 Your chat service is ready to deploy!**

For questions or support, please open an issue in the repository.
