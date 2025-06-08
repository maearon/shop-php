const express = require('express');
const root = require('./root.route');
const apiAuthRoute = require('./v1/auth.route');
const apiUserRoute = require('./v1/user.route');
const docsRoute = require('./v1/docs.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/v1/auth',
    route: apiAuthRoute,
  },
  {
    path: '/v1/users',
    route: apiUserRoute,
  },
  {
    path: '/',
    route: root,
  },
  // {
  //   path: '/users',
  //   route: staticPage,
  // },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/express/info/routes',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
