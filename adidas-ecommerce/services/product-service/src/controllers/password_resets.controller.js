const newPasswordReset = (req, res) => {
  res.render('password_resets/new');
};

const edit = (req, res) => {
  const { id: token } = req.params; // destructuring with an alias
  const { email } = req.query;
  // eslint-disable-next-line no-console
  console.log(token);
  // eslint-disable-next-line no-console
  console.log(email);
  res.render('password_resets/edit', {
    token,
    email
  });
};

module.exports = {
  newPasswordReset,
  edit,
};
