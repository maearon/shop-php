const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const index = (req, res) => {
  res.render('users/index');
};

const show = (req, res) => {
  res.render('users/show');
};

const following = (req, res) => {
  res.render('users/show_follow');
};

const followers = (req, res) => {
  res.render('users/show_follow');
};

const newUser = catchAsync(async (req, res) => {
  res.render('users/new');
});

const create = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const edit = catchAsync(async (req, res) => {
  res.render('users/edit');
});

const update = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const destroy = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  index,
  show,
  newUser,
  create,
  edit,
  update,
  destroy,
  following,
  followers,
};
