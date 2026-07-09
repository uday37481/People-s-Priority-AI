const mongoose = require('mongoose');

const priorityRecommendationSchema = new mongoose.Schema(
  {
    constituencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency',
      required: [true, 'Please associate a constituency with this recommendation']
    },
    projectCategory: {
      type: String,
      enum: ['Road', 'Water', 'Education', 'Healthcare', 'Agriculture', 'Employment', 'Sanitation', 'Electricity', 'Other'],
      required: [true, 'Please specify the project category']
    },
    citizenDemandScore: {
      type: Number, // Score out of 100 derived from complaint volume
      required: true,
      default: 0
    },
    infrastructureGapScore: {
      type: Number, // Score out of 100 derived from infrastructure datasets
      required: true,
      default: 0
    },
    demographicNeedScore: {
      type: Number, // Score out of 100 derived from population statistics
      required: true,
      default: 0
    },
    aiPriorityScore: {
      type: Number, // Combined weighted score
      required: true,
      default: 0
    },
    priorityRank: {
      type: Number, // Calculated final rank order (1-5)
      required: true
    },
    aiReason: {
      type: String, // AI explanation for this ranking
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PriorityRecommendation', priorityRecommendationSchema);
