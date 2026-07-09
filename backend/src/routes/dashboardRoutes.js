const express = require('express');
const { getCitizenDashboard, getMpDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);

router.get('/citizen', authorize('Citizen'), getCitizenDashboard);
router.get('/mp', authorize('MP', 'Admin'), getMpDashboard);

module.exports = router;
