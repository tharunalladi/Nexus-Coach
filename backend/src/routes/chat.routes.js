const express = require('express');
const { handleChat } = require('../controllers/chat.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// POST /api/v1/chat
router.post('/', authenticate, handleChat);

module.exports = router;
