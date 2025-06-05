FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY apps/users/package*.json ./
RUN npm ci --only=production

# Copy source code
COPY apps/users/ .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3001
ENV NODE_ENV=production

CMD ["npm", "start"]
