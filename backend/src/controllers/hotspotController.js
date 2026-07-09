const DemandHotspot = require('../models/DemandHotspot');
const { calculateHotspots } = require('../services/hotspotService');

// @desc    Recompute demand hotspots on demand
// @route   POST /api/v1/hotspots/generate
// @access  Private (MP, Admin)
exports.generateHotspotsOnDemand = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    await calculateHotspots(constituencyId);

    res.status(200).json({
      success: true,
      message: 'Demand hotspots recomputed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get hotspots for map visualization
// @route   GET /api/v1/hotspots
// @access  Private (MP, Admin)
exports.getHotspots = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const hotspots = await DemandHotspot.find({ constituencyId });

    // Format output matching API.md
    const formattedHotspots = hotspots.map(h => ({
      category: h.category,
      count: h.complaintCount,
      severity: h.severityScore >= 80 ? 'Critical' : h.severityScore >= 60 ? 'High' : h.severityScore >= 40 ? 'Medium' : 'Low',
      location: {
        lat: h.hotspotCenter.coordinates[1],
        lng: h.hotspotCenter.coordinates[0]
      }
    }));

    res.status(200).json({
      success: true,
      data: formattedHotspots
    });
  } catch (error) {
    next(error);
  }
};
