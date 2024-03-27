const ratingController = require('../controllers/rating');

const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.post('/create', authMiddleware, ratingController.createRating);

module.exports = router;
