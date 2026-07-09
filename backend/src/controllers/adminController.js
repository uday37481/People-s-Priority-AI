const User = require('../models/User');
const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');

// @desc    Get all registered users
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate('constituencyId', 'constituencyName')
      .select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system-wide metrics and analytics
// @route   GET /api/v1/admin/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, totalSuggestions, totalAIAnalyses] = await Promise.all([
      User.countDocuments({}),
      CitizenSuggestion.countDocuments({}),
      AIAnalysis.countDocuments({})
    ]);

    // Average confidence score of AI predictions
    const avgConfidenceResult = await AIAnalysis.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: '$confidenceScore' }
        }
      }
    ]);

    const averageConfidence = avgConfidenceResult.length > 0 
      ? Math.round(avgConfidenceResult[0].avgConfidence) 
      : 0;

    // Suggestions by status count
    const statusCounts = await CitizenSuggestion.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStatusCounts = {
      Pending: 0,
      Reviewed: 0,
      Resolved: 0
    };
    statusCounts.forEach(item => {
      if (item._id in formattedStatusCounts) {
        formattedStatusCounts[item._id] = item.count;
      }
    });

    // Submissions by category counts
    const categoryCounts = await AIAnalysis.aggregate([
      {
        $group: {
          _id: '$detectedCategory',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        userStatistics: {
          totalUsers
        },
        complaintTrends: {
          totalSuggestions,
          statusCounts: formattedStatusCounts
        },
        aiProcessingMetrics: {
          totalAnalyses: totalAIAnalyses,
          averageConfidence
        },
        categoryDistribution: categoryCounts
      }
    });
  } catch (error) {
    next(error);
  }
};
