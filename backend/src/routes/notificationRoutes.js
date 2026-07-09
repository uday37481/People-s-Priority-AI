const express = require('express');
const { sendNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('MP', 'Admin'));

router.post('/', sendNotification);

module.exports = router;
