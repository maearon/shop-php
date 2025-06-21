# Adidas E-commerce Clone - Microservices Architecture

A production-ready microservices e-commerce platform built with modern technologies, cloning the complete Adidas.com experience with advanced features like real-time chat, location-based delivery, and comprehensive product management.

## 🏗️ Architecture Overview

This monorepo implements a sophisticated microservices architecture designed to handle enterprise-level e-commerce operations:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

                    [User visits Adidas Clone]
                             ↓
                  ┌────────────────────────────┐
                  │   Next.js 14 Frontend     │
                  │   (Vercel/Nginx)          │
                  │   Port: 3001              │
                  └────────────┬───────────────┘
                               │
                               │ API Calls
                               ↓
                  ┌────────────────────────────┐
                  │   Express API Gateway     │
                  │   Port: 9000              │
                  │   - Route Management      │
                  │   - Authentication        │
                  │   - Load Balancing        │
                  └────────────┬───────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ↓                      ↓                      ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Spring Boot  │    │ Rails API    │    │ Go Payments  │
│ Auth Service │    │ Products     │    │ Service      │
│ Port: 8080   │    │ Orders/Cart  │    │ Port: 3003   │
│ - JWT Auth   │    │ Wishlist     │    │ - Stripe     │
│ - User Mgmt  │    │ Port: 3000   │    │ - Webhooks   │
└──────────────┘    └──────────────┘    └──────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                    ┌──────────────────┐
                    │ Python Django    │
                    │ Search Service   │
                    │ Port: 8000       │
                    │ - Elasticsearch  │
                    │ - Product Search │
                    └──────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ↓                      ↓                      ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ PostgreSQL   │    │ Redis Cache  │    │ RabbitMQ     │
│ (Neon)       │    │ Port: 6379   │    │ Port: 5672   │
│ - Prisma ORM │    │ - Sessions   │    │ - Events     │
│ - Multi-DB   │    │ - Cache      │    │ - Queues     │
└──────────────┘    └──────────────┘    └──────────────┘
\`\`\`

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router, Server Components
- **React 18** - Modern React with Hooks
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **TypeScript** - Type safety

### Backend Services
- **Spring Boot 3** (Java) - Authentication & User Management
- **Ruby on Rails 7** - Products, Orders, Cart, Wishlist
- **Go with Gin** - High-performance Payment Processing
- **Python Django** - Search & Analytics
- **Express.js** - API Gateway & Routing

### Database & Storage
- **PostgreSQL** (Neon) - Primary database
- **Prisma ORM** - Database toolkit
- **Redis** (Upstash) - Caching & Sessions
- **Elasticsearch** - Product search

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **RabbitMQ** - Message queuing
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend deployment

## 🚀 Quick Start

### Prerequisites

\`\`\`bash
# Required software
- Docker & Docker Compose
- Node.js 18+
- Java 17+ (for Spring Boot)
- Ruby 3.4+ (for Rails)
- Go 1.21+ (for Payments)
- Python 3.11+ (for Search)
\`\`\`

### Development Setup

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/maearon/shop-php.git
cd shop-php
\`\`\`

2. **Environment setup:**
\`\`\`bash
# Copy environment template
cp .env.example .env

# Edit with your actual values
nano .env
\`\`\`

3. **Database setup:**
\`\`\`bash
# Generate Prisma client
cd database/shared
npx prisma generate
npx prisma db push
npx prisma db seed
\`\`\`

4. **Start all services:**
\`\`\`bash
# Clean previous containers (if needed)
docker stop $(docker ps -aq)
docker container rm $(docker container ls -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker network prune -f

# Build and start services
docker-compose build --no-cache
docker-compose up
\`\`\`

### Service Endpoints

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Frontend** | 3001 | http://localhost:3001 | Next.js App |
| **API Gateway** | 9000 | http://localhost:9000 | Express Gateway |
| **Auth Service** | 8080 | http://localhost:8080 | Spring Boot |
| **Product API** | 3000 | http://localhost:3000 | Rails API |
| **Payments** | 3003 | http://localhost:3003 | Go Service |
| **Search** | 8000 | http://localhost:8000 | Django API |
| **Redis** | 6379 | redis://localhost:6379 | Cache |
| **RabbitMQ** | 15672 | http://localhost:15672 | Message Queue |
| **Elasticsearch** | 9200 | http://localhost:9200 | Search Engine |

## 📊 Database Schema

The system uses a comprehensive PostgreSQL schema managed by Prisma:

### Core Entities
- **Users** - Authentication & profiles
- **Products** - Product catalog with variants
- **Orders** - Order management
- **Cart/Wishlist** - Shopping cart & wishlist
- **Payments** - Payment transactions
- **Reviews** - Product reviews

### Key Features
- Multi-variant products (size, color)
- Guest cart/wishlist support
- Order tracking
- User relationships (following)
- Real-time notifications

## 🔧 Development Workflow

### Adding New Features

1. **Frontend Changes:**
\`\`\`bash
# Work in the root directory (Next.js app)
npm run dev
# Components in /components
# Pages in /app
\`\`\`

2. **Backend Services:**
\`\`\`bash
# Spring Boot (Auth)
cd apps/spring-boilerplate
./mvnw spring-boot:run

# Rails (Products)
cd apps/ruby-rails-boilerplate
rails server

# Go (Payments)
cd apps/payments
go run main.go
\`\`\`

3. **Database Changes:**
\`\`\`bash
cd database/shared
npx prisma db push
npx prisma generate
\`\`\`

## 🚢 Production Deployment

### Docker Production Build

\`\`\`bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Environment Variables

Key production variables:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
POSTGRES_PRISMA_URL=postgresql://user:pass@host:5432/db

# Authentication
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_secret

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Infrastructure
REDIS_URL=redis://user:pass@host:6379
RABBITMQ_URL=amqp://user:pass@host:5672
ELASTICSEARCH_URL=https://host:9200
\`\`\`

## 🎯 Current Features

### ✅ Implemented
- Complete product catalog with variants
- Shopping cart & wishlist functionality
- User authentication & profiles
- Order management
- Payment processing (Stripe)
- Product search (Elasticsearch)
- Real-time notifications
- Responsive design
- Redux state management

### 🚧 In Progress
- Location-based delivery modal
- Real-time chat system for logged users
- Feedback system for non-logged users
- Advanced product filtering
- Order tracking
- Admin dashboard

## 📋 Next Development Tasks

### 1. Location Modal (Priority: High)
\`\`\`typescript
// components/location-modal.tsx
- Auto-show on first visit
- Country/region selection
- Delivery location persistence
- Flag icons integration
\`\`\`

### 2. Chat System (Priority: High)
\`\`\`typescript
// components/chat-widget.tsx
- Show only for logged users
- Collapsible chat interface
- Virtual agent integration
- Chat history persistence
\`\`\`

### 3. User Feedback (Priority: Medium)
\`\`\`typescript
// components/feedback-modal.tsx
- Show for non-logged users
- Feedback collection
- Email integration
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- TypeScript for all new code
- Tailwind CSS for styling
- Prisma for database operations
- Jest for testing
- ESLint + Prettier for formatting

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@adidas-clone.com

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Adidas Clone Team**
