const reviewController = require('../controllers/review');
const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.post('/create', authMiddleware, reviewController.createReview);

module.exports = router;
