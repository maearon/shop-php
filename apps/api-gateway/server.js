const gateway = require('express-gateway');
const path = require('path');

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
