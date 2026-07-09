const CitizenSuggestion = require('../models/CitizenSuggestion');
const User = require('../models/User');

// @desc    Send notification/update updates to citizen regarding complaint status
// @route   POST /api/v1/notifications
// @access  Private (MP, Admin)
exports.sendNotification = async (req, res, next) => {
  const { suggestionId, message } = req.body;

  try {
    if (!suggestionId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Suggestion ID and message are required',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const suggestion = await CitizenSuggestion.findById(suggestionId).populate('userId', 'fullName email');
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion record not found',
        errorCode: 'NOT_FOUND'
      });
    }

    // Mock notification log: simulating SMS/Email updates
    console.log(`[NOTIFICATION SENT] To: ${suggestion.userId.fullName} (${suggestion.userId.email})`);
    console.log(`[MSG]: ${message}`);

    res.status(200).json({
      success: true,
      message: 'Notification sent successfully to the citizen.'
    });
  } catch (error) {
    next(error);
  }
};
