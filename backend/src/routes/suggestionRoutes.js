const express = require('express');
const { submitSuggestion, getMySuggestions, getSuggestionDetails } = require('../controllers/suggestionController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { suggestionUpload } = require('../middleware/upload');
const { validateSuggestion } = require('../validators/suggestionValidator');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  authorize('Citizen'),
  suggestionUpload,
  // We skip validateSuggestion middleware on files uploads in express-validator sometimes
  // because express-validator can run after body parser parses the fields. 
  // Let's run validators to confirm title/description exist.
  validateSuggestion,
  submitSuggestion
);

router.get('/my', authorize('Citizen'), getMySuggestions);
router.get('/:id', getSuggestionDetails);

module.exports = router;
