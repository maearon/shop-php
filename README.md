# Adidas E-commerce Monorepo

A production-ready microservices e-commerce platform built with modern technologies, inspired by the legacy PHP Adidas shop.

## Architecture

This monorepo contains multiple microservices:

- **Frontend (React/Next.js)**: Modern e-commerce UI with Tailwind CSS
```
this is /wish when empty and when there are wishes and the image of wish and cart icons in the menu when empty and there are items, the logic is when pressing add to bag on product items then go to /cart, pressing the heart image then go to /wish, pressing heart on items in /cart then remove that item in /cart and the item will go to wish, the heart button everywhere is the toggle wish and unwish button corresponding to the solid and empty heart icon, making the menu display the correct state of wish cart from redux context, and the remove item button in /cart works, the heart button everywhere works can toggle wish and unwish
```
- **API Gateway (ASP.NET Core)**: Central API gateway with Auth0 integration
- **Users Service (Node.js)**: User management and authentication
- **Orders Service (Node.js)**: Order processing and management
- **Payments Service (Go)**: Stripe payment processing
- **Search Service (Python/FastAPI)**: Elasticsearch-powered product search
- **Legacy Service (PHP)**: Modernized version of the original PHP code

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: ASP.NET Core, Node.js, Go, Python, PHP
- **Databases**: PostgreSQL (Neon), Redis (Upstash)
- **Message Queue**: RabbitMQ (CloudAMQP)
- **Search**: Elasticsearch (Bonsai.io)
- **Authentication**: Auth0
- **Payments**: Stripe
- **Deployment**: Docker, Render.com, Vercel
- **CI/CD**: GitHub Actions

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- .NET 8 SDK
- Go 1.21+
- Python 3.11+
- PHP 8.2+

### Development Setup

1. Clone the repository:
```
git rm -r --cached .
git add .
git commit -m "Update .gitignore and re-add files"
git clone <repository-url>
cd shop-php
```

2. Copy environment variables:
```
cp .env.example .env
# Edit .env with your actual values
```

3. Start all services with Docker Compose:
```
docker container rm $(docker container ls -aq) && docker rmi -f $(docker images -aq) && docker volume rm $(docker volume ls -q) && docker network prune -f
```
```
npm run dev
# or
docker-compose up
```

4. Services will be available at:
- Frontend: http://localhost:3000 *
- API AUTH JAVA SPRING Service: http://localhost:8080 *
- API PRODUCT RUBY RAILS Service: http://localhost:8085 *
- API Gateway: http://localhost:5000
- Users Service: http://localhost:3001
- Orders Service: http://localhost:3002 *
- Payments Service: http://localhost:3003 *
- Search Service: http://localhost:3004
- Legacy Service: http://localhost:8081 *
- ELASTICSEARCH Service: http://localhost:9200 *
- ELASTICSEARCH Service: http://localhost:5672 *                                        
- RABBITMQ Service: http://localhost:15672 *
- REDIS Service: http://localhost:6379

### Production Deployment

1. Build production images:
```
npm run build
```

2. Deploy to production:
```
npm run prod
```
## Environment Variables

Each service has its own `.env` file. Key variables include:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`: Auth0 configuration
- `STRIPE_SECRET_KEY`: Stripe payment processing
- `ELASTICSEARCH_URL`: Elasticsearch search service
- `RABBITMQ_URL`: RabbitMQ message queue

## API Documentation

### API Gateway Endpoints

- `GET /health` - Health check
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user by ID
- `POST /api/orders` - Create order
- `POST /api/search` - Search products

### Individual Service Endpoints

Each microservice exposes its own REST API. See individual service documentation for details.

## Database Schema

The system uses PostgreSQL with the following main tables:

- `users` - User accounts
- `products` - Product catalog
- `orders` - Order information
- `order_items` - Order line items
- `payments` - Payment transactions

## Message Queue Events

Services communicate via RabbitMQ events:

- `order_created` - New order placed
- `payment_completed` - Payment successful
- `payment_failed` - Payment failed

## Monitoring and Logging

- Structured logging with Serilog (.NET) and Winston (Node.js)
- Health checks for all services
- Redis caching for performance
- Elasticsearch for search analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
