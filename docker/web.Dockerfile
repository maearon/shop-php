FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies for shared library
FROM base AS deps-shared
COPY libs/shared/package*.json ./libs/shared/
WORKDIR /app/libs/shared
RUN npm install --only=production

# Install dependencies for web app
FROM base AS deps-web
COPY apps/web/package*.json ./apps/web/
WORKDIR /app/apps/web
RUN npm install --only=production

# Build the shared library
FROM base AS builder-shared
COPY libs/shared ./libs/shared/
WORKDIR /app/libs/shared
RUN npm install
RUN npm run db:generate

# Build the web app
FROM base AS builder-web
# Copy shared library from previous stage
COPY --from=builder-shared /app/libs/shared ./libs/shared/
# Copy web app
COPY apps/web ./apps/web/
WORKDIR /app/apps/web
RUN npm install
RUN npm run build

# Production image
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared Prisma client
COPY --from=builder-shared /app/libs/shared/node_modules/.prisma ./node_modules/.prisma/
COPY --from=builder-shared /app/libs/shared/node_modules/@prisma ./node_modules/@prisma/

# Copy built app
COPY --from=builder-web /app/apps/web/public ./public
COPY --from=builder-web --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder-web --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
