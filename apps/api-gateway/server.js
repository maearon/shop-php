const path = require('path');
const gateway = require('express-gateway');
const express = require('express');

const app = express();

// ✅ HEAD /up route
app.head('/up', (req, res) => {
  res.status(200).end();
});

gateway()
  .load(path.join(__dirname, 'config'))
  .run(app);
