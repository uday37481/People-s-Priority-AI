const PublicDataset = require('../models/PublicDataset');
const Constituency = require('../models/Constituency');

// @desc    Get constituency public datasets
// @route   GET /api/v1/datasets/:constituencyId
// @access  Private
exports.getConstituencyDataset = async (req, res, next) => {
  const { constituencyId } = req.params;

  try {
    let dataset = await PublicDataset.findOne({ constituencyId });

    if (!dataset) {
      // Check if constituency exists
      const constituencyExists = await Constituency.findById(constituencyId);
      if (!constituencyExists) {
        return res.status(404).json({
          success: false,
          message: 'Constituency not found',
          errorCode: 'NOT_FOUND'
        });
      }

      // Automatically seed mock dataset details if empty, to ensure dashboard displays visual data
      dataset = await PublicDataset.create({
        constituencyId,
        population: constituencyExists.population || 180000,
        literacyRate: 74.2,
        unemploymentRate: 6.8,
        hospitalCount: Math.max(1, Math.round((constituencyExists.population || 180000) / 15000)),
        schoolCount: Math.max(5, Math.round((constituencyExists.population || 180000) / 3000)),
        roadCoverage: 78.5,
        drinkingWaterCoverage: 65.2,
        internetCoverage: 80.1,
        source: 'Census Core Estimation (Hackathon Mock)'
      });
    }

    res.status(200).json({
      success: true,
      data: dataset
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update constituency public datasets
// @route   PUT /api/v1/datasets/:id
// @access  Private (Admin)
exports.updateDataset = async (req, res, next) => {
  try {
    let dataset = await PublicDataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset record not found',
        errorCode: 'NOT_FOUND'
      });
    }

    dataset = await PublicDataset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dataset updated successfully',
      data: dataset
    });
  } catch (error) {
    next(error);
  }
};
