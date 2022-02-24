const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/getToken', authController.getToken);
router.post('/refreshToken', authController.refreshToken);
router.delete('/invalidateToken', authController.invalidateToken);

module.exports = router;