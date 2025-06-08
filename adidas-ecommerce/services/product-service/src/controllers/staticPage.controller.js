const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const home = catchAsync(async (req, res) => {
  // Set a flash name and pass it to the home page.
  // If empty, we won't display. That's handled by EJS.
  const userName = req.flash('user');
  res.status(httpStatus.OK).render('static_pages/home', { userName });
});

const help = (req, res) => {
  res.render('static_pages/help');
};

const about = (req, res) => {
  res.render('static_pages/about');
};

const contact = (req, res) => {
  res.render('static_pages/contact');
};

module.exports = {
  home,
  help,
  about,
  contact,
};
