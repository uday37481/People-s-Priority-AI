const express = require('express');
const { generateHotspotsOnDemand, getHotspots } = require('../controllers/hotspotController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);

router.post('/generate', authorize('MP', 'Admin'), generateHotspotsOnDemand);
router.get('/', getHotspots);

module.exports = router;
