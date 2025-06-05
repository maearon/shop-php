FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
# Copy shared library first
COPY libs/shared/package*.json ./libs/shared/
COPY libs/shared/prisma ./libs/shared/prisma/
# Copy web app package files
COPY apps/web/package*.json ./apps/web/
# Install shared dependencies and generate Prisma client
WORKDIR /app/libs/shared
RUN npm install
RUN npm run db:generate
# Install web app dependencies
WORKDIR /app/apps/web
RUN npm install

# Build the app
FROM base AS builder
# Copy shared library
COPY libs/shared ./libs/shared/
WORKDIR /app/libs/shared
RUN npm install
RUN npm run db:generate
# Copy and build web app
WORKDIR /app
COPY apps/web ./apps/web/
WORKDIR /app/apps/web
RUN npm install
RUN npm run build

# Production image
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared Prisma client
COPY --from=builder /app/libs/shared/node_modules/.prisma ./libs/shared/node_modules/.prisma/
COPY --from=builder /app/libs/shared/node_modules/@prisma ./libs/shared/node_modules/@prisma/

# Copy built app
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
