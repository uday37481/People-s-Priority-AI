const { body, validationResult } = require('express-validator');

const validateSuggestion = [
  body('title')
    .notEmpty()
    .withMessage('Suggestion title is required')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters long'),
  body('description')
    .notEmpty()
    .withMessage('Suggestion description is required')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters long'),
  body('latitude')
    .notEmpty()
    .withMessage('Latitude coordinate is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid float value between -90 and 90'),
  body('longitude')
    .notEmpty()
    .withMessage('Longitude coordinate is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid float value between -180 and 180'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errorCode: 'VALIDATION_ERROR',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateSuggestion
};
