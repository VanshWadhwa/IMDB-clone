const router = require('express').Router();

router.use('/auth', require('./auth.js'));
router.use('/movie', require('./movie.js'));
router.use('/list', require('./list.js'));
router.use('/review', require('./review.js'));
router.use('/rating', require('./rating.js'));

module.exports = router;
