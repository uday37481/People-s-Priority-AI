const express = require('express');
const { analyzeSuggestionOnDemand, regenerateAIAnalysis } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('MP', 'Admin'));

router.post('/analyze/:suggestionId', analyzeSuggestionOnDemand);
router.post('/regenerate/:suggestionId', regenerateAIAnalysis);

module.exports = router;
