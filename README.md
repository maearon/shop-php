🛍️ Shop Microservices Monorepo
Monorepo chứa toàn bộ mã nguồn hệ thống ecommerce mô phỏng adidas.com/us sử dụng kiến trúc microservices.

🧱 Kiến trúc thư mục
bash
Sao chép
Chỉnh sửa
```
monorepo/
├── apps/
│   ├── web/               # React frontend (Next.js)
│   ├── editor/            # (Optional) React editor interface
│   ├── api-gateway/       # ASP.NET Core API Gateway
│   └── api-service/       # ASP.NET Core API (main backend)
│
├── services/
│   ├── deployer/          # Go service for deployment logic
│   ├── builder/           # Node.js build service
│   └── stripe-service/    # Stripe payment (Node.js)
│
├── libs/
│   └── shared/prisma/     # Prisma schemas, DTOs
│
├── infra/
│   ├── docker/            # Dockerfiles
│   ├── github/            # GitHub Actions CI/CD
│   └── k8s/               # (Optional) Kubernetes manifests
│
├── nginx/
│   └── default.conf       # Nginx reverse proxy for dev
│
├── docker-compose.yml     # Dev environment
├── .env                   # Environment variables
└── README.md
```
🚀 Công nghệ sử dụng
Frontend: React (Next.js), TailwindCSS

Backend: ASP.NET Core 9

Payment: Stripe API

Deployment: Docker, GitHub Actions

Queue/Message Broker: RabbitMQ

Database: PostgreSQL, Redis

Monitoring: Fluentd + Seq + Elasticsearch (optional)

🛠️ Cài đặt và chạy local
bash
Sao chép
Chỉnh sửa
```
# Clone repo
git clone https://github.com/maearon/shop-php.git
cd shop-php

# Copy file env mẫu
cp .env.example .env

# Khởi động hệ thống
docker-compose up --build
```
Truy cập:

http://localhost → React frontend

http://localhost/api → API Gateway

http://localhost/editor → Admin Editor UI

⚙️ Các service chính
Service	Port	Mô tả
web	3000	Giao diện người dùng chính
editor	3001	UI quản lý nội dung (tùy chọn)
api-gateway	5000	ASP.NET Core API Gateway
api-service	5001	ASP.NET Core API chính
stripe-service	3002	Payment Gateway
builder	3003	Service biên dịch frontend
deployer	3004	Service triển khai Go (CI/CD hooks)
postgres	5432	Cơ sở dữ liệu chính
redis	6379	Redis cache
rabbitmq	5672/15672	Message queue
seq	5341	Log management

🧪 CI/CD
Sử dụng GitHub Actions để:

Kiểm tra code format

Build các service

Deploy từng microservice (Render, Vercel...)

☁️ Deployment gợi ý
Layer	Platform	Ghi chú
Frontend	Vercel	Tự động từ apps/web
API Gateway	Render.com	.NET Core
Services	Render, Railway, Fly.io	Tuỳ loại service
DB	Neon.tech	PostgreSQL Free
Redis	Upstash	Free Plan
Queue	CloudAMQP	Free tier
Logs	Seq + Fluentd	Tùy chọn giám sát log

🧰 Dev Tips
Dùng Dev Containers nếu muốn run bằng VS Code.

Có thể mở rộng bằng K8s manifests trong infra/k8s/.

Thêm adminer/pgadmin để quản lý DB dễ hơn trong dev.

👨‍💻 Maintainer
Nguyễn Đức Mạnh

GitHub: @maearon