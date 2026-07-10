const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['Citizen', 'MP', 'Admin'])
    .withMessage('Invalid role specified'),
  body('preferredLanguage')
    .optional()
    .trim(),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
    
  // Middleware function to intercept validation results
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

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
    
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
  validateRegister,
  validateLogin
};
