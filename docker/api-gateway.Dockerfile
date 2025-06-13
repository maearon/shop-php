FROM node:18-alpine

WORKDIR /app

COPY apps/api-gateway/package*.json ./
RUN npm install

COPY apps/api-gateway/ .

EXPOSE 9000

CMD ["node", "server.js"]
