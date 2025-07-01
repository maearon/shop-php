// File: config/middleware/up-check.js
module.exports = function () {
  return {
    name: 'up-check',
    mountpath: '/up',
    handler: (req, res, next) => {
      if (req.method === 'HEAD') {
        return res.status(200).end();
      }
      next();
    }
  };
};
