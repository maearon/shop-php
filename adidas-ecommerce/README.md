# 🏃‍♂️ Adidas E-commerce Platform

A modern, scalable e-commerce platform built with microservices architecture, inspired by adidas.com.

## 🏗️ Architecture Overview

### Frontend Applications
- **Frontstore** (Next.js 14) - Customer-facing storefront at `:3000`
- **Admin Dashboard** (Next.js) - Management interface at `:3001`

### Backend Services (Internal)
- **Auth Service** (Java Spring Boot) - Authentication & JWT management
- **Order Service** (ASP.NET 9) - Order processing & management
- **Product Service** (Node.js + Express) - Product catalog & search
- **Cart Service** (Go Gin) - Shopping cart operations
- **Payment Service** (FastAPI + Stripe) - Payment processing
- **Image Service** (Rails 8 + Active Storage) - Image upload & management

### Infrastructure
- **API Gateway** (OpenResty/Nginx + Lua) - Request routing & JWT validation
- **PostgreSQL** - Primary database
- **Redis** - Caching & sessions
- **RabbitMQ** - Message queue
- **Elasticsearch** - Product search

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Git

### 1. Clone & Setup

\`\`\`bash
git clone <your-repo-url>
cd adidas-ecommerce
\`\`\`

### 2. Environment Setup

\`\`\`bash
# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Install dependencies
npm install

# Setup development environment
npm run setup:dev
\`\`\`

### 3. Start Development Environment

\`\`\`bash
# Start all services with hot reload
npm run dev

# Or run in background
npm run dev:detach
\`\`\`

### 4. Initialize Database

\`\`\`bash
# Run migrations
npm run migrate

# Seed with sample data
npm run seed
\`\`\`

### 5. Access Applications

- **Frontstore**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Gateway**: http://localhost/api

## 🛠️ Development Commands

### Service Management

\`\`\`bash
# Check service status
npm run status

# Check service health
npm run health

# View all logs
npm run logs

# View specific service logs
npm run logs:frontstore
npm run logs:auth
npm run logs:gateway

# Restart all services
npm run restart

# Restart specific service
npm run restart:service --service=auth

# Rebuild specific service
npm run rebuild:service --service=product
\`\`\`

### Database Operations

\`\`\`bash
# Run all migrations
npm run migrate

# Run specific service migrations
npm run migrate:auth
npm run migrate:order
npm run migrate:image

# Seed all data
npm run seed

# Seed specific service
npm run seed:product
npm run seed:auth
\`\`\`

### Testing

\`\`\`bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run specific service tests
npm run test:auth
npm run test:product
npm run test:payment
\`\`\`

### Building & Deployment

\`\`\`bash
# Build all services
npm run build

# Build frontend only
npm run build:frontend

# Build backend services only
npm run build:services

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production

# Rollback deployment
npm run rollback
\`\`\`

### Cleanup

\`\`\`bash
# Stop all services
npm run down

# Stop and remove volumes (⚠️ data loss)
npm run down:volumes

# Clean containers and images
npm run clean

# Complete cleanup
npm run clean:images
\`\`\`

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **API Gateway** - Single entry point with rate limiting
- **CORS Protection** - Properly configured cross-origin requests
- **Input Validation** - All endpoints validate input data
- **Network Isolation** - Services communicate via internal network only

## 📊 Service Communication Flow

\`\`\`
Frontend Apps (3000, 3001) 
    ↓
API Gateway (80) 
    ↓
Backend Services (Internal Network)
    ↓
Databases & Infrastructure
\`\`\`

### API Endpoints

- **Auth**: `/api/auth/*` → auth-service:8080
- **Orders**: `/api/orders/*` → order-service:8081
- **Products**: `/api/products/*` → product-service:8082
- **Cart**: `/api/cart/*` → cart-service:8083
- **Payments**: `/api/payments/*` → payment-service:8084
- **Images**: `/api/images/*` → image-service:8085

## 🚀 CI/CD Pipeline

### Automated Deployment

1. **Push to `main`** → Deploy to Production
2. **Push to `staging`** → Deploy to Staging
3. **Pull Request** → Run Tests Only

### Pipeline Steps

1. ✅ **Test** - Unit, integration, and E2E tests
2. ✅ **Build** - Docker images for all services
3. ✅ **Deploy** - Automatic deployment to Render
4. ✅ **Health Check** - Verify deployment success
5. ✅ **Rollback** - Automatic rollback on failure

### Deployment Platforms

- **Render.com** (Recommended)
- **Railway.app** (Alternative)
- **Docker Compose** (Self-hosted)

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

\`\`\`bash
# Database
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=6a31ee167b28ab32ab171795d2eff778

# Payment Processing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Deployment
RENDER_API_KEY=your_render_api_key
PRODUCTION_SERVICE_ID=srv_...
\`\`\`

### Service Ports (Internal)

- Auth Service: 8080
- Order Service: 8081
- Product Service: 8082
- Cart Service: 8083
- Payment Service: 8084
- Image Service: 8085

## 🧪 Testing Strategy

### Unit Tests
- Each service has comprehensive unit tests
- Run with `npm run test:unit`

### Integration Tests
- Test service-to-service communication
- Database integration testing
- Run with `npm run test:integration`

### End-to-End Tests
- Full user journey testing
- Frontend to backend integration
- Run with `npm run test:e2e`

## 📈 Monitoring & Observability

### Health Checks
- All services expose `/health` endpoints
- Automatic health monitoring in production
- Run `npm run health` to check locally

### Logging
- Structured logging across all services
- Centralized log aggregation
- View logs with `npm run logs`

### Metrics (Optional)
- Prometheus metrics collection
- Grafana dashboards
- Start with `npm run monitor`

## 🚨 Troubleshooting

### Common Issues

**Services won't start:**
\`\`\`bash
npm run clean
npm run setup:dev
npm run dev
\`\`\`

**Database connection issues:**
\`\`\`bash
npm run down:volumes
npm run setup:volumes
npm run dev
\`\`\`

**Port conflicts:**
\`\`\`bash
# Check what's using ports 3000, 3001, 80
lsof -i :3000
lsof -i :3001
lsof -i :80

# Kill processes if needed
npm run down
npm run dev
\`\`\`

**Build failures:**
\`\`\`bash
# Clean Docker cache
docker system prune -a
npm run build
\`\`\`

### Getting Help

1. Check service logs: `npm run logs:servicename`
2. Verify health: `npm run health`
3. Check Docker status: `npm run status`
4. Review environment: `cat .env`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm run test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by adidas.com architecture
- Built with modern microservices best practices
- Designed for scalability and maintainability

---

**Happy coding! 🚀**
