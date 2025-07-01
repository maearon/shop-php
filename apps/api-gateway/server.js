const express = require('express');
const cors = require('cors');
const path = require('path');
const gateway = require('express-gateway');

const app = express();

const corsOptions = {
  origin: "https://adidas-mocha.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

gateway()
  .load(path.join(__dirname, 'config'))
  .run(app);
