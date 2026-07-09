const express = require('express');
const { generatePriorityRanking, getLatestRecommendations } = require('../controllers/priorityController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);

router.post('/generate', authorize('MP', 'Admin'), generatePriorityRanking);
router.get('/', getLatestRecommendations);

module.exports = router;
