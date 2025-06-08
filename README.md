# Adidas E-commerce Monorepo

A production-ready microservices e-commerce platform built with modern technologies, inspired by the legacy PHP Adidas shop.

## Architecture

This monorepo contains multiple microservices:

- **Frontend (React/Next.js)**: Modern e-commerce UI with Tailwind CSS
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
\`\`\`bash
git rm -r --cached .
git add .
git commit -m "Update .gitignore and re-add files"
git clone <repository-url>
cd shop-php
\`\`\`

2. Copy environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your actual values
\`\`\`

3. Start all services with Docker Compose:
\`\`\`bash
maearon@maearon:~/code/shop-php/apps/web$ docker container rm $(docker container ls -aq) 
565e74b1db16
05239c8eca40
94a781ee0706
454a5d9e2cfc
5979958e4dd7
01a7434df88a
953d0c9ee933
e1a7f997744b
8bd905bd144c
58aef5be5809
cd35bb822f36
maearon@maearon:~/code/shop-php/apps/web$ docker rmi -f $(docker images -aq)
Untagged: shop-php-web:latest
Deleted: sha256:81697ddb7e818eb4a52c4c54e03d47f2863d0d1c0d1203b368938d9db6543157
Untagged: shop-php-legacy:latest
Deleted: sha256:9fffe83276194e5b56d457c43a855cd161e81d93341af451721aab21705e728d
Untagged: shop-php-api:latest
Deleted: sha256:1ef3f835a428912008896fad83eca92fdef08b83bbb2efc6aad1a1286b9912f2
Untagged: shop-php-users:latest
Deleted: sha256:2bf7f69ab6017f428f78f299220d0e72fac1c3af6fef25191d83066aad92fb8b
Untagged: shop-php-search:latest
Deleted: sha256:0b40750b26843a2ed95f80fc9e26f81580c8759c571fe329a7dce10145ee18da
Untagged: shop-php-orders:latest
Deleted: sha256:f6a703096a99f68a6a76d9cd01a225f7988869f3919a285890373d5af544b3fc
Untagged: shop-php-api-java:latest
Deleted: sha256:c24d8c9aabebe635f40b912c41aab4831198e000dffef3121ac61d33a7048cb4
Untagged: shop-php-payments:latest
Deleted: sha256:d09badc541a92560d96fc96b6702c73de8d9f6ef8002aa8798d697eacf216ceb
Untagged: redis:7-alpine
Untagged: redis@sha256:ee9e8748ace004102a267f7b8265dab2c618317df22507b89d16a8add7154273
Deleted: sha256:7ff232a1fe042a3825e8acbf8b3cddf5f2d8b45fed1fc3f4628e0dee0fac3667
Deleted: sha256:d23e3b9f008b7812ce9f7ef5db0dc6840c29c4809f25b5ffe02cbc7a727a925a
Deleted: sha256:a43d4f18c584ab154d6e9b608c2dc1e9dcb2e66bd3d16822beb637a002841b69
Deleted: sha256:7c8fc6fe8cb7a241c6bbe6e5273f7a5ae92c6953a00b4db5b4b470ad26301936
Deleted: sha256:50d8bbafd50ac0449bfeb04da671a0b958005d86dcf0f83adf1997ce7a7389f2
Deleted: sha256:4adfbae2427b5f69f1157fe61edd2226664dc41cdc4cbe2dff71507b1061144c
Deleted: sha256:4a4a2b0d5b5907aae74d736bc024bdba6731532f41f8a70bae7a3a3be6df2478
Deleted: sha256:6ffbbd53d03bb7bb179a3353b90550cdef758c9f85e1958a7af24735748d01d6
Untagged: rabbitmq:3-management-alpine
Untagged: rabbitmq@sha256:39337d7fabefbea4656fa326f4768ff5487898f29f65ee6de2e62deabd0dfb6d
Deleted: sha256:f93298e779fb6b5a8339a5c735a843fa85134756f99c1cd0dd2b74641f4d0ded
Untagged: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
Untagged: docker.elastic.co/elasticsearch/elasticsearch@sha256:4cd9ce4ccb04618617114da1df8240473bbd004329c1bc0252cebeec089b629e
Deleted: sha256:7f03b6ec0c6f6d9a844550d1b3689e868e11850ac4e668e8583490c96baca8f1
maearon@maearon:~/code/shop-php/apps/web$ docker volume rm $(docker volume ls -q)
shop-php_elasticsearch_data
shop-php_rabbitmq_data
shop-php_redis_data
maearon@maearon:~/code/shop-php/apps/web$ docker network prune -f
Deleted Networks:
shop-php_adidas-network

npm run dev
# or
docker-compose up
\`\`\`

4. Services will be available at:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:5000
- Users Service: http://localhost:3001
- Orders Service: http://localhost:3002
- Payments Service: http://localhost:3003
- Search Service: http://localhost:3004
- Legacy Service: http://localhost:8080

### Production Deployment

1. Build production images:
\`\`\`bash
npm run build
\`\`\`

2. Deploy to production:
\`\`\`bash
npm run prod
\`\`\`

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
