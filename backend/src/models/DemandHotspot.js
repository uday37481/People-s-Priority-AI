const mongoose = require('mongoose');

const demandHotspotSchema = new mongoose.Schema(
  {
    constituencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency',
      required: [true, 'Please associate a constituency with this hotspot']
    },
    category: {
      type: String,
      required: [true, 'Please add a development category'],
      trim: true
    },
    hotspotCenter: {
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
    complaintCount: {
      type: Number,
      required: true,
      default: 0
    },
    severityScore: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// GeoSpatial index
demandHotspotSchema.index({ hotspotCenter: '2dsphere' });

module.exports = mongoose.model('DemandHotspot', demandHotspotSchema);
