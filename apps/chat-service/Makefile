.PHONY: dev build start migrate generate studio seed docker-up docker-down clean

# Development
dev:
	npm run dev

# Build
build:
	npm run build

# Start production
start:
	npm start

# Database operations
migrate:
	npm run migrate

migrate-deploy:
	npm run migrate:deploy

generate:
	npm run generate

studio:
	npm run studio

seed:
	npm run seed

# Docker operations
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-build:
	docker-compose build

docker-logs:
	docker-compose logs -f chat-service

# Utility
clean:
	rm -rf dist node_modules
	npm install

install:
	npm install

# Deploy to Render (requires render CLI)
deploy:
	@echo "Deploying to Render..."
	@echo "Make sure you have set the following environment variables in Render:"
	@echo "- DATABASE_URL"
	@echo "- JWT_SECRET"
	@echo "- PORT=3002"

# Test connection
test:
	curl -f http://localhost:3002/health || echo "Service not running"
