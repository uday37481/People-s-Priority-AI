const express = require('express');
const { searchSuggestions, filterSuggestions } = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/suggestions', searchSuggestions);
router.get('/filter', filterSuggestions);

module.exports = router;
