const express = require('express');
const { getProgress } = require('../controllers/progress.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// GET /api/v1/progress
router.get('/', authenticate, getProgress);

module.exports = router;
