// server.js
const path = require('path');
const gateway = require('express-gateway');
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS middleware tại tầng ngoài cùng
app.use(
  cors({
    origin: "https://adidas-mocha.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ⚠️ Tải cấu hình Gateway sau khi app đã sẵn sàng
gateway()
  .load(path.join(__dirname, 'config'))
  .run(app); // ← dùng `run(app)` thay vì `.run()` đơn thuần
