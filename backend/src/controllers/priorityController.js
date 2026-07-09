const PriorityRecommendation = require('../models/PriorityRecommendation');
const { calculatePriorities } = require('../services/priorityService');

// @desc    Manually trigger recomputation of priority projects list
// @route   POST /api/v1/priority/generate
// @access  Private (MP, Admin)
exports.generatePriorityRanking = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const recommendations = await calculatePriorities(constituencyId);

    res.status(200).json({
      success: true,
      message: 'Priority recommendations updated successfully',
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get latest priority recommendations list
// @route   GET /api/v1/priority
// @access  Private
exports.getLatestRecommendations = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    let recommendations = await PriorityRecommendation.find({ constituencyId })
      .sort({ priorityRank: 1 });

    // If no recommendations are stored, automatically generate them
    if (recommendations.length === 0) {
      recommendations = await calculatePriorities(constituencyId);
    }

    // Format output matching API.md
    const formattedData = recommendations.map(r => ({
      rank: r.priorityRank,
      category: r.projectCategory,
      priorityScore: r.aiPriorityScore,
      reason: r.aiReason
    }));

    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    next(error);
  }
};
