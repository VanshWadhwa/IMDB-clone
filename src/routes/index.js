const router = require('express').Router();

router.use('/auth', require('./auth.js'));
router.use('/movie', require('./movie.js'));

module.exports = router;
