const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const { uploadFile } = require('../services/cloudinaryService');
const { analyzeSuggestion } = require('../services/geminiService');
const { calculateHotspots } = require('../services/hotspotService');
const { calculatePriorities } = require('../services/priorityService');

const getSubmissionType = (req, localImagePath, localAudioPath) => {
  if (req.body.submissionType === 'Voice' || req.body.submissionType === 'Image' || req.body.submissionType === 'Text') {
    return req.body.submissionType;
  }

  if (localAudioPath) return 'Voice';
  if (localImagePath) return 'Image';
  return 'Text';
};

// @desc    Submit a new citizen suggestion/complaint
// @route   POST /api/v1/suggestions
// @access  Private (Citizen)
exports.submitSuggestion = async (req, res, next) => {
  try {
    const title = req.body.title || '';
    const description = req.body.description || req.body.originalText || '';
    const latitude = parseFloat(req.body.latitude ?? req.body.coordinates?.lat);
    const longitude = parseFloat(req.body.longitude ?? req.body.coordinates?.lng);

    if (!title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Complaint title is required',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    if (!description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Complaint description is required',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Valid coordinates (latitude and longitude) are required',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    // Capture file paths from upload middleware
    const localImagePath = req.files && req.files.image ? req.files.image[0].path : null;
    const localAudioPath = req.files && req.files.audio ? req.files.audio[0].path : null;

    // 1. Upload files to Cloudinary (or fallback to local paths)
    let imageUrl = '';
    let audioUrl = '';

    if (localImagePath) {
      imageUrl = await uploadFile(localImagePath, 'images');
    }
    if (localAudioPath) {
      audioUrl = await uploadFile(localAudioPath, 'audio');
    }

    // 2. Create the suggestion record in MongoDB
    const suggestion = await CitizenSuggestion.create({
      userId: req.user.id,
      constituencyId: req.user.constituencyId,
      title,
      originalText: description,
      description,
      category: req.body.category || 'Other',
      summary: '',
      priority: 'Medium',
      themes: [],
      latitude,
      longitude,
      submissionType: getSubmissionType(req, localImagePath, localAudioPath),
      imageUrl,
      audioUrl,
      voiceUrl: audioUrl,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // [longitude, latitude]
      },
      status: 'Pending'
    });

    // 3. Trigger Gemini processing and persist the AI output
    try {
      const aiResults = await analyzeSuggestion(description, localImagePath, localAudioPath);
      const detectedCategory = aiResults.detectedCategory || req.body.category || 'Other';
      const urgency = aiResults.urgency || 'Medium';

      await AIAnalysis.create({
        suggestionId: suggestion._id,
        detectedCategory,
        aiSummary: aiResults.aiSummary || 'Summary not available.',
        sentiment: aiResults.sentiment || 'Neutral',
        urgency,
        extractedKeywords: aiResults.extractedKeywords || [],
        confidenceScore: aiResults.aiConfidence || aiResults.categoryConfidence || 80,
        processedAt: new Date()
      });

      suggestion.description = description;
      suggestion.originalText = description;
      suggestion.category = detectedCategory;
      suggestion.summary = aiResults.aiSummary || 'Summary not available.';
      suggestion.priority = urgency;
      suggestion.themes = aiResults.extractedKeywords || [];
      suggestion.latitude = latitude;
      suggestion.longitude = longitude;
      suggestion.imageUrl = imageUrl;
      suggestion.audioUrl = audioUrl;
      suggestion.voiceUrl = audioUrl;
      suggestion.location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      if (aiResults.translatedText && aiResults.translatedText !== description) {
        suggestion.translatedText = aiResults.translatedText;
      }

      await suggestion.save();

      calculateHotspots(req.user.constituencyId).then(() => {
        calculatePriorities(req.user.constituencyId);
      });
    } catch (aiErr) {
      console.error('AI Processing Pipeline Error:', aiErr);
      await AIAnalysis.create({
        suggestionId: suggestion._id,
        detectedCategory: req.body.category || 'Other',
        aiSummary: 'Fallback: Summary generation failed during pipeline execution.',
        sentiment: 'Neutral',
        urgency: 'Medium',
        confidenceScore: 50,
        processedAt: new Date()
      });

      suggestion.category = req.body.category || 'Other';
      suggestion.summary = 'Fallback: Summary generation failed during pipeline execution.';
      suggestion.priority = 'Medium';
      suggestion.latitude = latitude;
      suggestion.longitude = longitude;
      suggestion.imageUrl = imageUrl;
      suggestion.audioUrl = audioUrl;
      suggestion.voiceUrl = audioUrl;
      await suggestion.save();
    }

    res.status(201).json({
      success: true,
      message: 'Suggestion submitted and analyzed successfully',
      suggestionId: suggestion._id,
      data: suggestion.toObject()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all suggestions for logged in citizen
// @route   GET /api/v1/suggestions/my
// @access  Private (Citizen)
exports.getMySuggestions = async (req, res, next) => {
  try {
    const suggestions = await CitizenSuggestion.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    // Populate AI analysis info for each suggestion
    const formattedSuggestions = [];
    for (const sug of suggestions) {
      const aiInfo = await AIAnalysis.findOne({ suggestionId: sug._id });
      formattedSuggestions.push({
        _id: sug._id,
        title: sug.title,
        originalText: sug.originalText,
        description: sug.description || sug.originalText,
        category: sug.category || (aiInfo ? aiInfo.detectedCategory : 'Other'),
        summary: sug.summary || (aiInfo ? aiInfo.aiSummary : ''),
        priority: sug.priority || (aiInfo ? aiInfo.urgency : 'Medium'),
        themes: sug.themes || (aiInfo ? aiInfo.extractedKeywords || [] : []),
        latitude: sug.latitude,
        longitude: sug.longitude,
        translatedText: sug.translatedText,
        submissionType: sug.submissionType,
        imageUrl: sug.imageUrl,
        audioUrl: sug.audioUrl,
        voiceUrl: sug.voiceUrl || sug.audioUrl,
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

// @desc    Get suggestion details
// @route   GET /api/v1/suggestions/:id
// @access  Private
exports.getSuggestionDetails = async (req, res, next) => {
  try {
    const suggestion = await CitizenSuggestion.findById(req.params.id)
      .populate('userId', 'fullName email')
      .populate('constituencyId', 'constituencyName district state');

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found',
        errorCode: 'NOT_FOUND'
      });
    }

    // Verify access rights (Citizens can only view their own)
    if (req.user.role === 'Citizen' && suggestion.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this suggestion record',
        errorCode: 'FORBIDDEN'
      });
    }

    const aiInfo = await AIAnalysis.findOne({ suggestionId: suggestion._id });

    res.status(200).json({
      success: true,
      data: {
        ...suggestion.toObject(),
        aiAnalysis: aiInfo || null
      }
    });
  } catch (error) {
    next(error);
  }
};
