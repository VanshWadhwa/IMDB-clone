const listController = require('../controllers/list');
const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.get('/all', authMiddleware, listController.showLists);
router.get('/show/:id', authMiddleware, listController.showList);

router.post('/createList', authMiddleware, listController.createList);
router.post('/deleteList', authMiddleware, listController.deleteList);

router.post('/addToList', authMiddleware, listController.addToList);
router.post('/removeFromList', authMiddleware, listController.removeFromList);

module.exports = router;
