const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.use('/user/', require('./user'));
router.use('/profile', require('./profile'));
router.get('/', homeController.home);

module.exports = router;