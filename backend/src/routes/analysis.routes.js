const express = require('express');
const { runAnalysis, getProfile, getMockErrorDNA } = require('../controllers/analysis.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// POST /api/v1/analysis/run
router.post('/run', authenticate, runAnalysis);

// GET /api/v1/analysis/profile
router.get('/profile', authenticate, getProfile);

// GET /api/v1/analysis/mock (For Presentation)
router.get('/mock', authenticate, getMockErrorDNA);

module.exports = router;
