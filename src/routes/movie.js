const movieController = require('../controllers/movie');
const ratingController = require('../controllers/rating');
const reviewController = require('../controllers/review');
const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.get('/detail/:id', movieController.detail);

router.get('/trending', movieController.trending);
router.get('/discover', movieController.discover);

// Rating and Review
router.post('/:contentId/rating', authMiddleware, ratingController.createRating);
router.post('/:contentId/review', authMiddleware, reviewController.createReview);

module.exports = router;
