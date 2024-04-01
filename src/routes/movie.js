const movieController = require('../controllers/movie');

const router = require('express').Router();

router.get('/detail/:id', movieController.detail);
router.get('/trending', movieController.trending);
router.get('/discover', movieController.discover);

module.exports = router;
