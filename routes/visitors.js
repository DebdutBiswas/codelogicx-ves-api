const express = require('express');
const router = express.Router();
const visitorsController = require('../controllers/visitors');

router.get('/', visitorsController.getAllVisitors);
router.post('/', visitorsController.addNewVisitor);
router.get('/:id', visitorsController.getVisitorById);
// router.put('/:id', visitorsController.updateVisitorById);
// router.delete('/:id', visitorsController.deleteVisitorById);
// router.get('/phone/:phone/fname/:fname', visitorsController.getVisitorByPhoneFname);
router.post('/search', visitorsController.searchVisitorByParams);
router.post('/checkout', visitorsController.checkoutVisitor);

module.exports = router;