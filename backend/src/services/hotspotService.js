const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const DemandHotspot = require('../models/DemandHotspot');
const mongoose = require('mongoose');

/**
 * Calculates demand hotspots by grouping citizen suggestions based on category and geospatial clustering.
 * Updates the DemandHotspot collection with calculated values.
 * @param {string} constituencyId - ID of the constituency to run analysis for
 */
const calculateHotspots = async (constituencyId) => {
  if (!constituencyId) return;

  try {
    const constituencyObjectId = new mongoose.Types.ObjectId(constituencyId);

    // Delete existing hotspots for this constituency
    await DemandHotspot.deleteMany({ constituencyId: constituencyObjectId });

    // Aggregate suggestions grouping by category and coordinate proximity
    // For proximity grouping, we round coordinates to 2 decimal places (roughly 1.1km area clusters)
    const pipeline = [
      {
        $match: {
          constituencyId: constituencyObjectId,
          status: { $ne: 'Resolved' } // Focus on active/pending complaints
        }
      },
      {
        $lookup: {
          from: 'aianalyses',
          localField: '_id',
          remoteField: 'suggestionId', // Wait, check field name in AIAnalysis model
          foreignField: 'suggestionId',
          as: 'aiInfo'
        }
      },
      {
        $unwind: '$aiInfo'
      },
      {
        $project: {
          category: '$aiInfo.detectedCategory',
          urgencyScore: '$aiInfo.urgencyScore',
          longitude: { $arrayElemAt: ['$location.coordinates', 0] },
          latitude: { $arrayElemAt: ['$location.coordinates', 1] }
        }
      },
      {
        $group: {
          _id: {
            category: '$category',
            latRound: { $round: ['$latitude', 2] },
            lngRound: { $round: ['$longitude', 2] }
          },
          complaintCount: { $sum: 1 },
          avgUrgencyScore: { $avg: '$urgencyScore' },
          origLat: { $first: '$latitude' },
          origLng: { $first: '$longitude' }
        }
      }
    ];

    const clusters = await CitizenSuggestion.aggregate(pipeline);

    if (clusters.length === 0) return;

    // Build hotspot records
    const hotspotsToInsert = clusters.map(c => {
      // Severity is a combination of quantity of complaints (weighted 60%) and average urgency (weighted 40%)
      // Max capacity clamped out of 100 for display
      const countWeight = Math.min(c.complaintCount * 10, 60); // 6 complaints maxes out count weight
      const urgencyWeight = (c.avgUrgencyScore || 50) * 0.4;
      const severityScore = Math.round(countWeight + urgencyWeight);

      return {
        constituencyId: constituencyObjectId,
        category: c._id.category,
        hotspotCenter: {
          type: 'Point',
          coordinates: [c.origLng, c.origLat] // [longitude, latitude]
        },
        complaintCount: c.complaintCount,
        severityScore: severityScore
      };
    });

    await DemandHotspot.insertMany(hotspotsToInsert);
    console.log(`Generated ${hotspotsToInsert.length} hotspots for constituency: ${constituencyId}`);
  } catch (error) {
    console.error('Error generating hotspots:', error);
  }
};

module.exports = {
  calculateHotspots
};
