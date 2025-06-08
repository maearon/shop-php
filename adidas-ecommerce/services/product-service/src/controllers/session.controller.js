const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');
// const { User } = require('../models');
// const { authService } = require('../services');

const newSession = catchAsync(async (req, res) => {
  const locals = {
    title: 'Welcome to the Sample App',
    description: 'Page Description',
    header: 'Page Header',
  };
  res.status(httpStatus.OK).render('sessions/new', locals);
});

const create = catchAsync(async (req, res) => {
  const { email, password } = req.body.session;
  // eslint-disable-next-line no-console
  console.log(req.body);
  // http://expressjs.com/en/resources/middleware/cookie-session.html
  // https://www.npmjs.com/package/express-session
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  // eslint-disable-next-line no-console
  console.log(tokens);
  // res.send({ user, tokens });
  req.flash('user', 'Please check your email to activate your account.');
  res.status(httpStatus.OK).render('static_pages/home');
});

const destroy = (req, res) => {
  res.render('static_pages/about');
};

module.exports = {
  newSession,
  create,
  destroy,
};
