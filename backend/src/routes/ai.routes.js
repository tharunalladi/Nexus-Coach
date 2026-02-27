const express = require('express');
const { chat, getMotivation } = require('../controllers/ai.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// POST /api/v1/ai/chat
router.post('/chat', authenticate, chat);

// GET /api/v1/ai/motivate
router.get('/motivate', authenticate, getMotivation);

module.exports = router;
