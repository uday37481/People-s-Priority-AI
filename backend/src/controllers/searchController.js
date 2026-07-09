const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');

// @desc    Search suggestions by keyword query
// @route   GET /api/v1/search/suggestions
// @access  Private
exports.searchSuggestions = async (req, res, next) => {
  const queryText = req.query.q || '';

  try {
    const searchFilter = {
      $or: [
        { title: { $regex: queryText, $options: 'i' } },
        { originalText: { $regex: queryText, $options: 'i' } }
      ]
    };

    // Filter by constituency if role is MP
    if (req.user.role === 'MP') {
      searchFilter.constituencyId = req.user.constituencyId;
    }

    const suggestions = await CitizenSuggestion.find(searchFilter)
      .populate('userId', 'fullName')
      .sort({ createdAt: -1 });

    const formattedSuggestions = [];
    for (const sug of suggestions) {
      const aiInfo = await AIAnalysis.findOne({ suggestionId: sug._id });
      formattedSuggestions.push({
        _id: sug._id,
        title: sug.title,
        originalText: sug.originalText,
        translatedText: sug.translatedText,
        submissionType: sug.submissionType,
        imageUrl: sug.imageUrl,
        audioUrl: sug.audioUrl,
        location: sug.location,
        status: sug.status,
        createdAt: sug.createdAt,
        aiAnalysis: aiInfo || null
      });
    }

    res.status(200).json({
      success: true,
      count: formattedSuggestions.length,
      data: formattedSuggestions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Filter suggestions by category, status, urgency, constituency, and date
// @route   GET /api/v1/search/filter
// @access  Private
exports.filterSuggestions = async (req, res, next) => {
  const { category, status, urgency, constituencyId, date } = req.query;

  try {
    const filter = {};

    // Apply role scoping
    if (req.user.role === 'MP') {
      filter.constituencyId = req.user.constituencyId;
    } else if (constituencyId) {
      filter.constituencyId = constituencyId;
    }

    if (status) {
      filter.status = status;
    }

    if (date) {
      filter.createdAt = { $gte: new Date(date) };
    }

    // Since Category and Urgency are in the AIAnalysis collection, 
    // we fetch matching AIAnalysis suggestionId references first
    const aiFilter = {};
    if (category) aiFilter.detectedCategory = category;
    if (urgency) aiFilter.urgency = urgency;

    if (category || urgency) {
      const matchingAi = await AIAnalysis.find(aiFilter).select('suggestionId');
      const sugIds = matchingAi.map(ai => ai.suggestionId);
      filter._id = { $in: sugIds };
    }

    const suggestions = await CitizenSuggestion.find(filter)
      .populate('userId', 'fullName')
      .sort({ createdAt: -1 });

    const formattedSuggestions = [];
    for (const sug of suggestions) {
      const aiInfo = await AIAnalysis.findOne({ suggestionId: sug._id });
      formattedSuggestions.push({
        _id: sug._id,
        title: sug.title,
        originalText: sug.originalText,
        translatedText: sug.translatedText,
        submissionType: sug.submissionType,
        imageUrl: sug.imageUrl,
        audioUrl: sug.audioUrl,
        location: sug.location,
        status: sug.status,
        createdAt: sug.createdAt,
        aiAnalysis: aiInfo || null
      });
    }

    res.status(200).json({
      success: true,
      count: formattedSuggestions.length,
      data: formattedSuggestions
    });
  } catch (error) {
    next(error);
  }
};
