.PHONY: help dev build start migrate seed docker-up docker-down clean

# Default target
help:
	@echo "Available commands:"
	@echo "  dev          - Start development server with hot reload"
	@echo "  build        - Build TypeScript to JavaScript"
	@echo "  start        - Start production server"
	@echo "  migrate      - Run database migrations"
	@echo "  migrate-prod - Run production database migrations"
	@echo "  seed         - Seed database with sample data"
	@echo "  generate     - Generate Prisma client"
	@echo "  studio       - Open Prisma Studio"
	@echo "  docker-up    - Start with Docker Compose"
	@echo "  docker-down  - Stop Docker Compose"
	@echo "  clean        - Clean build artifacts"
	@echo "  install      - Install dependencies"

# Development
dev:
	npm run dev

# Build
build:
	npm run build

# Start production
start:
	npm run start

# Database operations
migrate:
	npm run migrate

migrate-prod:
	npm run migrate:deploy

generate:
	npm run generate

seed:
	npm run seed

studio:
	npm run studio

# Docker operations
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f chat-service

# Utility
install:
	npm install

clean:
	rm -rf dist
	rm -rf node_modules/.cache

# Setup for new environment
setup: install generate migrate seed
	@echo "✅ Setup complete! Run 'make dev' to start development server"

# Deploy preparation
deploy-prep: install generate build
	@echo "✅ Ready for deployment!"
