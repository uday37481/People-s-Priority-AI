const mongoose = require('mongoose');

const aiAnalysisSchema = new mongoose.Schema(
  {
    suggestionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CitizenSuggestion',
      required: [true, 'Please associate a suggestion with this AI analysis'],
      unique: true
    },
    detectedCategory: {
      type: String,
      enum: ['Road', 'Water', 'Education', 'Healthcare', 'Agriculture', 'Employment', 'Sanitation', 'Electricity', 'Other'],
      required: [true, 'Category classification is required']
    },
    aiSummary: {
      type: String,
      required: [true, 'AI summary is required']
    },
    sentiment: {
      type: String,
      enum: ['Positive', 'Neutral', 'Negative', 'Urgent'],
      default: 'Neutral'
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    extractedKeywords: {
      type: [String],
      default: []
    },
    duplicateClusterId: {
      type: String,
      default: null
    },
    confidenceScore: {
      type: Number,
      default: 0
    },
    processedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);
