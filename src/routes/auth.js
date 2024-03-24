const authController = require('../controllers/user');

const router = require('express').Router();

router.post('/login', authController.login);

module.exports = router;
