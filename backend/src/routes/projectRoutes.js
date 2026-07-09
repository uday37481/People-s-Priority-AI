const express = require('express');
const { createProject, getAllProjects, updateProjectStatus } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);

router.post('/', authorize('MP', 'Admin'), createProject);
router.get('/', getAllProjects);
router.patch('/:id/status', authorize('MP', 'Admin'), updateProjectStatus);

module.exports = router;
