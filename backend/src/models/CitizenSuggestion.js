const mongoose = require('mongoose');

const citizenSuggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please associate a citizen with this suggestion']
    },
    constituencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency',
      required: [true, 'Please associate a constituency with this suggestion']
    },
    title: {
      type: String,
      required: [true, 'Please add a suggestion title'],
      trim: true
    },
    originalText: {
      type: String,
      required: [true, 'Please add suggestion text/description']
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'Other'
    },
    summary: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    themes: {
      type: [String],
      default: []
    },
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    },
    translatedText: {
      type: String,
      default: ''
    },
    submissionType: {
      type: String,
      enum: ['Text', 'Voice', 'Image'],
      default: 'Text'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    },
    voiceUrl: {
      type: String,
      default: ''
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Resolved'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

// GeoSpatial index
citizenSuggestionSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('CitizenSuggestion', citizenSuggestionSchema);
