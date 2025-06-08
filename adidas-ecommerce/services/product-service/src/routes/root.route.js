const express = require('express');
const staticPageController = require('../controllers/staticPage.controller');
const sessionController = require('../controllers/session.controller');
const usersController = require('../controllers/users.controller');
const passwordResetsController = require('../controllers/password_resets.controller');

const router = express.Router();

router.get('/', staticPageController.home);
router.get('/help', staticPageController.help);
router.get('/about', staticPageController.about);
router.get('/contact', staticPageController.contact);
router.get('/signup', usersController.newUser);
router.get('/login', sessionController.newSession);
router.post('/login', sessionController.create);

router.get('/users', usersController.index);
// router.post('/users', staticPageController.home);
// router.get('/users/new', staticPageController.home);
router.get('/users/:id/edit', staticPageController.home);
router.get('/users/:id', usersController.show);
router.patch('/users/:id', staticPageController.home);
router.put('/users/:id', staticPageController.home);
router.delete('/users/:id', staticPageController.home);

router.get('/users/:user_id/microposts', staticPageController.home);
router.post('/users/:user_id/microposts', staticPageController.home);
router.get('/users/:user_id/microposts/new', staticPageController.home);
router.get('/users/:user_id/microposts/:id/edit', staticPageController.home);
router.get('/users/:user_id/microposts/:id', staticPageController.home);
router.patch('/users/:user_id/microposts/:id', staticPageController.home);
router.put('/users/:user_id/microposts/:id', staticPageController.home);
router.delete('/users/:user_id/microposts/:id', staticPageController.home);

router.post('/relationships/:id', staticPageController.home);
router.delete('/relationships/:id', staticPageController.home);

router.get('/users/:user_id/following', usersController.following);
router.get('/users/:user_id/followers', usersController.followers);

router.get('/password_resets/new', passwordResetsController.newPasswordReset);
router.get('/password_resets/:id/edit', passwordResetsController.edit);

module.exports = router;
