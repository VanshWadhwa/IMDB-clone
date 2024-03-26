const movieController = require('../controllers/movie');

const router = require('express').Router();

router.get('/detail/:id', movieController.detail);

module.exports = router;
