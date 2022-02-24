const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs');

router.get('/', logsController.getAllLogs);
router.post('/', logsController.addNewLog);
router.get('/:id', logsController.getLogById);
// router.put('/:id', logsController.updateLogById);
// router.delete('/:id', logsController.deleteLogById);
// router.get('/phone/:phone/sdate/:sdate/edate/:edate', logsController.getLogByPhoneDate);
router.post('/search', logsController.searchLogByParams);

module.exports = router;