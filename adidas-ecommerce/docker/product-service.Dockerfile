FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY services/product-service/package.json ./ 
COPY services/product-service/package-lock.json ./
RUN npm ci

# Copy source code
COPY services/product-service/ .

# Install nodemon for hot reload
RUN npm install -g nodemon

EXPOSE 8082

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8082/health || exit 1

# Development vs Production
CMD if [ "$NODE_ENV" = "development" ]; then \
      npm install && npm run dev; \
    else \
      npm start; \
    fi
