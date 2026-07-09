const express = require('express');
const {
  getMpDashboard,
  getMpComplaints,
  getMpAnalytics,
  getMpHeatmap
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('MP', 'Admin'));

router.get('/dashboard', getMpDashboard);
router.get('/complaints', getMpComplaints);
router.get('/analytics', getMpAnalytics);
router.get('/heatmap', getMpHeatmap);

module.exports = router;
