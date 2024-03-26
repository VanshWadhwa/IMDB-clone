const authController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/protected', authMiddleware, authController.protected);

module.exports = router;
