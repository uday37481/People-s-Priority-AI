const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const { analyzeSuggestion } = require('../services/geminiService');
const { calculateHotspots } = require('../services/hotspotService');
const { calculatePriorities } = require('../services/priorityService');

// @desc    Analyze a suggestion on demand
// @route   POST /api/v1/ai/analyze/:suggestionId
// @access  Private (MP, Admin)
exports.analyzeSuggestionOnDemand = async (req, res, next) => {
  const { suggestionId } = req.params;

  try {
    const suggestion = await CitizenSuggestion.findById(suggestionId);
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion record not found',
        errorCode: 'NOT_FOUND'
      });
    }

    // Check if analysis already exists
    let analysis = await AIAnalysis.findOne({ suggestionId });
    if (analysis) {
      return res.status(400).json({
        success: false,
        message: 'Analysis record already exists. Use regenerate instead.',
        errorCode: 'DUPLICATE_KEY'
      });
    }

    // Run AI analysis
    const results = await analyzeSuggestion(suggestion.originalText, null, null);

    analysis = await AIAnalysis.create({
      suggestionId: suggestion._id,
      detectedCategory: results.detectedCategory || 'Other',
      aiSummary: results.aiSummary || 'Summary not available.',
      sentiment: results.sentiment || 'Neutral',
      urgency: results.urgency || 'Medium',
      extractedKeywords: results.extractedKeywords || [],
      confidenceScore: results.aiConfidence || results.categoryConfidence || 80,
      processedAt: new Date()
    });

    // Update translated text in CitizenSuggestion
    if (results.translatedText && results.translatedText !== suggestion.originalText) {
      suggestion.translatedText = results.translatedText;
      await suggestion.save();
    }

    // Trigger updates
    await calculateHotspots(suggestion.constituencyId);
    await calculatePriorities(suggestion.constituencyId);

    res.status(200).json({
      success: true,
      message: 'AI analysis completed successfully',
      data: {
        category: analysis.detectedCategory,
        summary: analysis.aiSummary,
        urgency: analysis.urgency,
        confidence: analysis.confidenceScore,
        keywords: analysis.extractedKeywords
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Regenerate AI analysis for a suggestion
// @route   POST /api/v1/ai/regenerate/:suggestionId
// @access  Private (MP, Admin)
exports.regenerateAIAnalysis = async (req, res, next) => {
  const { suggestionId } = req.params;

  try {
    const suggestion = await CitizenSuggestion.findById(suggestionId);
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion record not found',
        errorCode: 'NOT_FOUND'
      });
    }

    // Delete existing analysis
    await AIAnalysis.deleteMany({ suggestionId });

    // Run fresh AI analysis
    const results = await analyzeSuggestion(suggestion.originalText, null, null);

    const analysis = await AIAnalysis.create({
      suggestionId: suggestion._id,
      detectedCategory: results.detectedCategory || 'Other',
      aiSummary: results.aiSummary || 'Summary not available.',
      sentiment: results.sentiment || 'Neutral',
      urgency: results.urgency || 'Medium',
      extractedKeywords: results.extractedKeywords || [],
      confidenceScore: results.aiConfidence || results.categoryConfidence || 80,
      processedAt: new Date()
    });

    // Update translated text in CitizenSuggestion
    if (results.translatedText && results.translatedText !== suggestion.originalText) {
      suggestion.translatedText = results.translatedText;
      await suggestion.save();
    }

    // Trigger updates
    await calculateHotspots(suggestion.constituencyId);
    await calculatePriorities(suggestion.constituencyId);

    res.status(200).json({
      success: true,
      message: 'AI analysis regenerated successfully',
      data: {
        category: analysis.detectedCategory,
        summary: analysis.aiSummary,
        urgency: analysis.urgency,
        confidence: analysis.confidenceScore,
        keywords: analysis.extractedKeywords
      }
    });
  } catch (error) {
    next(error);
  }
};
