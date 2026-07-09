const express = require('express');
const { getConstituencyDataset, updateDataset } = require('../controllers/datasetController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);

router.get('/:constituencyId', getConstituencyDataset);
router.put('/:id', authorize('Admin'), updateDataset);

module.exports = router;
