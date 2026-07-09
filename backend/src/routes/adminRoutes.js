const express = require('express');
const { getAllUsers, getAnalytics } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/users', getAllUsers);
router.get('/analytics', getAnalytics);

module.exports = router;
