FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g express-gateway && \
    npm install

CMD ["eg", "gateway", "start"]
