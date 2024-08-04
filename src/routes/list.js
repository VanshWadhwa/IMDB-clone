const listController = require('../controllers/list');
const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.get('/all', authMiddleware, listController.showLists);
router.get('/show/:id', authMiddleware, listController.showList);

router.post('/create', authMiddleware, listController.createList);
router.post('/delete', authMiddleware, listController.deleteList);

router.post('/add-item', authMiddleware, listController.addToList);
router.post('/remove-item', authMiddleware, listController.removeFromList);

module.exports = router;
