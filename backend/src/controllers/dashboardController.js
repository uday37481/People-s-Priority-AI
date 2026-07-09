const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const DemandHotspot = require('../models/DemandHotspot');
const PriorityRecommendation = require('../models/PriorityRecommendation');
const PublicDataset = require('../models/PublicDataset');

const buildComplaintPayload = async (suggestion) => {
  const aiInfo = await AIAnalysis.findOne({ suggestionId: suggestion._id });
  const priority = suggestion.priority || (aiInfo ? aiInfo.urgency : 'Medium');

  return {
    _id: suggestion._id,
    citizenId: suggestion.userId?._id || suggestion.userId,
    title: suggestion.title,
    description: suggestion.description || suggestion.originalText,
    category: suggestion.category || (aiInfo ? aiInfo.detectedCategory : 'Other'),
    summary: suggestion.summary || (aiInfo ? aiInfo.aiSummary : ''),
    priority,
    themes: suggestion.themes || (aiInfo ? aiInfo.extractedKeywords || [] : []),
    latitude: suggestion.latitude ?? suggestion.location?.coordinates?.[1] ?? null,
    longitude: suggestion.longitude ?? suggestion.location?.coordinates?.[0] ?? null,
    imageUrl: suggestion.imageUrl || '',
    voiceUrl: suggestion.voiceUrl || suggestion.audioUrl || '',
    status: suggestion.status,
    createdAt: suggestion.createdAt,
    updatedAt: suggestion.updatedAt,
    citizenName: suggestion.userId?.fullName || 'Anonymous',
    aiAnalysis: aiInfo
  };
};

// @desc    Get dashboard metrics for logged-in citizen
// @route   GET /api/v1/dashboard/citizen
// @access  Private (Citizen)
exports.getCitizenDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Run parallel counts for fast response
    const [total, pending, resolved, recent] = await Promise.all([
      CitizenSuggestion.countDocuments({ userId }),
      CitizenSuggestion.countDocuments({ userId, status: 'Pending' }),
      CitizenSuggestion.countDocuments({ userId, status: 'Resolved' }),
      CitizenSuggestion.find({ userId })
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    // Format recent activity list
    const formattedRecent = recent.map(r => ({
      id: r._id,
      title: r.title,
      status: r.status,
      type: r.submissionType,
      date: r.createdAt
    }));

    res.status(200).json({
      success: true,
      data: {
        totalSubmissions: total,
        pendingReviewCount: pending,
        resolvedCount: resolved,
        recentActivity: formattedRecent
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics metrics for constituency MP
// @route   GET /api/v1/dashboard/mp
// @access  Private (MP, Admin)
exports.getMpDashboard = async (req, res, next) => {
  const constituencyId = req.user.constituencyId;

  if (!constituencyId) {
    return res.status(400).json({
      success: false,
      message: 'User is not associated with any constituency',
      errorCode: 'VALIDATION_ERROR'
    });
  }

  try {
    const [totalComplaints, pendingComplaints, resolvedComplaints] = await Promise.all([
      CitizenSuggestion.countDocuments({ constituencyId }),
      CitizenSuggestion.countDocuments({ constituencyId, status: 'Pending' }),
      CitizenSuggestion.countDocuments({ constituencyId, status: 'Resolved' })
    ]);

    const complaintsByCategory = await CitizenSuggestion.aggregate([
      { $match: { constituencyId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { name: { $ifNull: ['$_id', 'Other'] }, count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    const complaintsByPriority = await CitizenSuggestion.aggregate([
      { $match: { constituencyId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $project: { name: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    const recentComplaints = await CitizenSuggestion.find({ constituencyId })
      .populate('userId', 'fullName')
      .sort({ createdAt: -1 })
      .limit(8);

    const recentComplaintPayload = await Promise.all(recentComplaints.map(buildComplaintPayload));

    const aiRecommendations = await PriorityRecommendation.find({ constituencyId })
      .sort({ priorityRank: 1 })
      .limit(6);

    const formattedRecommendations = aiRecommendations.length
      ? aiRecommendations.map(item => ({
          rank: item.priorityRank,
          category: item.projectCategory,
          priorityScore: item.aiPriorityScore,
          reason: item.aiReason,
          title: item.projectCategory
        }))
      : complaintsByCategory.slice(0, 3).map((item, index) => ({
          rank: index + 1,
          category: item.name,
          priorityScore: Math.min(100, 70 + index * 8),
          reason: `${item.count} complaints recorded for ${item.name} in the current constituency view.`,
          title: item.name
        }));

    const monthlyTrends = await CitizenSuggestion.aggregate([
      { $match: { constituencyId } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 6 },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: '$_id.month' }
            ]
          },
          count: 1,
          _id: 0
        }
      }
    ]);

    const hotspots = await DemandHotspot.find({ constituencyId });
    const formattedHotspots = hotspots.map(h => ({
      category: h.category,
      count: h.complaintCount,
      severity: h.severityScore >= 80 ? 'Critical' : h.severityScore >= 60 ? 'High' : h.severityScore >= 40 ? 'Medium' : 'Low',
      severityScore: h.severityScore,
      location: {
        lat: h.hotspotCenter.coordinates[1],
        lng: h.hotspotCenter.coordinates[0]
      }
    }));

    const dataset = await PublicDataset.findOne({ constituencyId });
    const statistics = {
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      resolveRate: totalComplaints ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0,
      highPriorityCount: recentComplaintPayload.filter(item => ['High', 'Critical'].includes(item.priority)).length,
      infrastructureStats: dataset ? {
        schoolCount: dataset.schoolCount || 0,
        hospitalCount: dataset.hospitalCount || 0,
        roadCoverage: dataset.roadCoverage || 0,
        drinkingWaterCoverage: dataset.drinkingWaterCoverage || 0,
        internetCoverage: dataset.internetCoverage || 0,
        population: dataset.population || 0
      } : {
        schoolCount: 0,
        hospitalCount: 0,
        roadCoverage: 0,
        drinkingWaterCoverage: 0,
        internetCoverage: 0,
        population: 0
      }
    };

    res.status(200).json({
      success: true,
      data: {
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        complaintsByCategory,
        complaintsByPriority,
        recentComplaints: recentComplaintPayload,
        aiRecommendations: formattedRecommendations,
        statistics,
        monthlyTrends,
        demandHotspots: formattedHotspots,
        categoryDistribution: complaintsByCategory.map(item => ({ name: item.name, value: item.count })),
        priorityRankings: formattedRecommendations,
        recentSubmissions: recentComplaintPayload
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMpComplaints = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const filter = { constituencyId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.priority) filter.priority = req.query.priority;

    const [complaints, total] = await Promise.all([
      CitizenSuggestion.find(filter)
        .populate('userId', 'fullName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      CitizenSuggestion.countDocuments(filter)
    ]);

    const formattedComplaints = await Promise.all(complaints.map(buildComplaintPayload));

    res.status(200).json({
      success: true,
      data: formattedComplaints,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMpAnalytics = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;

    const [categoryCounts, priorityCounts, monthlyTrends, recentComplaints] = await Promise.all([
      CitizenSuggestion.aggregate([
        { $match: { constituencyId } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { name: { $ifNull: ['$_id', 'Other'] }, count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),
      CitizenSuggestion.aggregate([
        { $match: { constituencyId } },
        { $group: { _id: '$priority', count: { $sum: 1 } } },
        { $project: { name: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),
      CitizenSuggestion.aggregate([
        { $match: { constituencyId } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 6 },
        {
          $project: {
            month: {
              $concat: [
                { $toString: '$_id.year' },
                '-',
                { $toString: '$_id.month' }
              ]
            },
            count: 1,
            _id: 0
          }
        }
      ]),
      CitizenSuggestion.find({ constituencyId }).sort({ createdAt: -1 }).limit(20)
    ]);

    const totalComplaints = await CitizenSuggestion.countDocuments({ constituencyId });
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - 60);
    const previousComplaints = await CitizenSuggestion.countDocuments({
      constituencyId,
      createdAt: { $gte: previousPeriodStart }
    });

    const topLocations = await CitizenSuggestion.aggregate([
      { $match: { constituencyId, latitude: { $ne: null }, longitude: { $ne: null } } },
      {
        $group: {
          _id: {
            lat: { $round: ['$latitude', 2] },
            lng: { $round: ['$longitude', 2] }
          },
          count: { $sum: 1 },
          category: { $first: '$category' },
          priority: { $first: '$priority' },
          status: { $first: '$status' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 8 },
      {
        $project: {
          _id: 0,
          name: {
            $concat: ['Lat ', { $toString: '$_id.lat' }, ' / Lng ', { $toString: '$_id.lng' }]
          },
          count: 1,
          category: 1,
          priority: 1,
          status: 1,
          latitude: '$_id.lat',
          longitude: '$_id.lng'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        categoryCounts,
        priorityCounts,
        monthlyTrends,
        complaintGrowth: {
          totalComplaints,
          previousPeriodComplaints: previousComplaints,
          percentageChange: totalComplaints && previousComplaints ? Math.round(((totalComplaints - previousComplaints) / previousComplaints) * 100) : 0
        },
        topLocations
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMpHeatmap = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    const complaints = await CitizenSuggestion.find({ constituencyId, latitude: { $ne: null }, longitude: { $ne: null } })
      .select('latitude longitude priority category status')
      .sort({ createdAt: -1 });

    const heatmapPoints = complaints.map(item => ({
      latitude: item.latitude,
      longitude: item.longitude,
      priority: item.priority,
      category: item.category,
      status: item.status
    }));

    res.status(200).json({
      success: true,
      data: heatmapPoints
    });
  } catch (error) {
    next(error);
  }
};
