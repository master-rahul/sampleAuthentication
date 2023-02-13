const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const sessionController = require('../controllers/session');
const passport = require('../config/passport_local_strategy');

router.get('/sign-in', passport.redirectAuthenticated, userController.signIn);
router.get('/sign-up', passport.redirectAuthenticated, userController.signUp);
router.post('/add', userController.add);

router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}), sessionController.create);
router.get('/destroy-session', sessionController.destroy);

module.exports = router;