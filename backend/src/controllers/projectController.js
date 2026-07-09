const DevelopmentProject = require('../models/DevelopmentProject');
const { calculatePriorities } = require('../services/priorityService');

// @desc    Create a new development project
// @route   POST /api/v1/projects
// @access  Private (MP, Admin)
exports.createProject = async (req, res, next) => {
  const { projectTitle, category, estimatedBudget, status, description } = req.body;

  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const project = await DevelopmentProject.create({
      constituencyId,
      projectTitle,
      category,
      estimatedBudget,
      status: status || 'Proposed',
      description
    });

    // Recompute priority list in background, as project status has altered
    calculatePriorities(constituencyId);

    res.status(201).json({
      success: true,
      message: 'Development project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all development projects for the constituency
// @route   GET /api/v1/projects
// @access  Private
exports.getAllProjects = async (req, res, next) => {
  try {
    const constituencyId = req.user.constituencyId;
    if (!constituencyId) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with any constituency',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const projects = await DevelopmentProject.find({ constituencyId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update development project status
// @route   PATCH /api/v1/projects/:id/status
// @access  Private (MP, Admin)
exports.updateProjectStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    if (!['Proposed', 'Approved', 'Ongoing', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project status provided',
        errorCode: 'VALIDATION_ERROR'
      });
    }

    let project = await DevelopmentProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        errorCode: 'NOT_FOUND'
      });
    }

    project.status = status;
    await project.save();

    // Recompute ranking after status modify
    await calculatePriorities(project.constituencyId);

    res.status(200).json({
      success: true,
      message: 'Project status updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};
