const mongoose = require('mongoose');

const publicDatasetSchema = new mongoose.Schema(
  {
    constituencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency',
      required: [true, 'Please associate a constituency with this dataset'],
      unique: true
    },
    population: {
      type: Number,
      default: 0
    },
    literacyRate: {
      type: Number,
      default: 0
    },
    unemploymentRate: {
      type: Number,
      default: 0
    },
    hospitalCount: {
      type: Number,
      default: 0
    },
    schoolCount: {
      type: Number,
      default: 0
    },
    roadCoverage: {
      type: Number, // Percentage of villages/areas connected by metalled roads
      default: 0
    },
    drinkingWaterCoverage: {
      type: Number, // Percentage with safe piped drinking water
      default: 0
    },
    internetCoverage: {
      type: Number, // Percentage with broadband/mobile network connectivity
      default: 0
    },
    source: {
      type: String,
      default: 'Government Open Data Portal'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PublicDataset', publicDatasetSchema);
