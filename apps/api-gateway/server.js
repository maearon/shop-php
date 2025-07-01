const express = require('express');
const cors = require('cors');
const path = require('path');
const gateway = require('express-gateway');

const app = express();

app.use(
  '*',
  cors({
    origin: 'https://adidas-mocha.vercel.app',
    credentials: true,
  })
);

gateway()
  .load(path.join(__dirname, 'config'))
  .run(app);
