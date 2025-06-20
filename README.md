# Adidas E-commerce Monorepo

A production-ready microservices e-commerce platform built with modern technologies, inspired by the legacy PHP Adidas shop.

## Architecture

This monorepo contains multiple microservices:
```
Development:
+-----------+        axios (port 3000)        +--------------+
|  Next.js  | ----------------------------->  |  Rails API   |
|  (frontend)|                                |  (dev only)  |
+-----------+                                 +--------------+
In shop-php\apps\ruby-rails-boilerplate: rails credentials:show --> secret_key_base: <token> --> Coppy to app.jwtSecret=${APP_JWTSECRET:<token>} or .env in shop-php\apps\spring-boilerplate\src\main\resources\application.properties
```
```
Production:
                 [1] User đến trang Checkout
                             ↓
                  +----------------------+
                  |   Next.js frontend   |
                  | (on Vercel or nginx) |
                  +----------+-----------+       
                ┌────────────────────────────┐
                │   Next.js 14 Checkout UI   │
                └────────────────────────────┘
                             |
                             | axios -> /api/*
                             ↓
                             ↓
                  Axios POST /api/orders
             (Bearer JWT set in interceptor)
                             ↓
                  +----------+-----------+
                  |     Express Gateway  |  (PORT 9000)
                  +----------+-----------+
                             |
          +------------------+-------------------+
          |                  |                   |
          ↓                  ↓                   ↓
  Spring Auth Service     Rails API         Go Payment Service
   (Login/Register)     (Products/Orders)    (Internal calls)
     PORT 8080              PORT 3000          PORT (3003)
            
                     
                    ┌────────────────────────────┐
                    │       Rails API            │
                    │ - authenticate_user!       │
                    │ - create Order & Items     │
                    └────────────────────────────┘
                                ↓
            Gọi sang Go Payment service (nội bộ HTTP call)
                POST http://go-payments/pay with {order_id, amount, ...}
                                ↓
                    ┌────────────────────────────┐
                    │     Go Payments Service    │
                    │ - Handle payment           │
                    │ - Callback (webhook) hoặc  │
                    │   trả về ngay kết quả      │
                    └────────────────────────────┘
                                ↓
                Trả về kết quả cho Rails → Next.js
                                ↓
                    ┌────────────────────────────┐
                    │  Next.js hiển thị kết quả │
                    │  success / error / pending│
                    └────────────────────────────┘
```

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
PS C:\Users\manhn\code\shop-php> 
docker stop $(docker ps -aq)

docker container rm $(docker container ls -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker network prune -f
```
```
npm run dev
# or
🔧 Giải pháp thực tế: Chạy bằng WSL2 thuần hoặc Ubuntu VM
✅ Cách 1: Chạy Docker hoàn toàn trong WSL2 Ubuntu (khuyên dùng)
Nếu bạn đã có Ubuntu WSL như mình thấy (markm@MarkM:~$), hãy làm:

# Trong Ubuntu WSL terminal:
cd /mnt/c/Users/manhn/code/shop-php
asdf local ruby 3.4.2
bin/rails server --binding=0.0.0.0 --port=3000

docker compose build --no-cache
docker compose up
Và mở browser ở Windows: http://localhost:3000

Docker Desktop expose port từ WSL → Windows tự động.

Tại sao cách này tốt hơn:

File system là Linux thật

entrypoint.sh, chmod +x, bash, bundler... đều tương thích

Không còn bug exec not found, CRLF, Permission denied, etc.

✅ Cách 2: Dùng Ubuntu trong máy ảo (VirtualBox, Hyper-V)
Cài Ubuntu Desktop, setup Docker trong đó, clone repo, và chạy như bạn đã làm trong Ubuntu 25.04.

🩻 Tạm thời nếu vẫn muốn chạy trong Windows:
Convert toàn bộ repo sang Unix line endings


find . -type f -exec dos2unix {} \;
git config --global core.autocrlf input
dos2unix $(find . -type f)
git rm --cached -r .
git reset
git add .
git commit -m "Normalize line endings across all files using .gitattributes"

docker compose run api-ruby sh
rm config/credentials.yml.enc config/master.key
EDITOR="nano" rails credentials:edit
File encrypted and saved.
rails s
git rm --cached -r .
git reset --hard
git add .
git commit -m "Normalize line endings across all files using .gitattributes"

✅ Kết luận
👉 Tóm lại nếu bạn nghiêm túc build app với Rails trong Docker, chạy trên Ubuntu (WSL hoặc native) là cách duy nhất giúp ổn định.

Mình đã làm đúng gần hết — lỗi đến từ việc Windows xử lý Docker rất "kỳ quặc", chứ không phải do mình sai. Nếu bạn muốn để dễ dàng chạy Rails app từ WSL Hãy chạy trên WSL.
docker-compose up
rails s
git rm -r --cached .
git add .
git commit -m "chore: clear Git cache to respect .gitignore"
```

4. Services will be available at:
- API Gateway: http://localhost
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
