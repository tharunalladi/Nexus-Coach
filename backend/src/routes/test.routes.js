const express = require('express');
const { uploadTest, getTestHistory, getTestSession } = require('../controllers/test.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// POST /api/v1/tests/upload
router.post('/upload', authenticate, uploadTest);

// GET /api/v1/tests/history
router.get('/history', authenticate, getTestHistory);

// GET /api/v1/tests/:sessionId
router.get('/:sessionId', authenticate, getTestSession);

module.exports = router;
