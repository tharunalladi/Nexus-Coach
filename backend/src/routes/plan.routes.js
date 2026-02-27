const express = require('express');
const { generatePlan, getActivePlan, completeTask, getMockPlan } = require('../controllers/plan.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// POST /api/v1/plan/generate
router.post('/generate', authenticate, generatePlan);

// GET /api/v1/plan/active
router.get('/active', authenticate, getActivePlan);

// GET /api/v1/plan/mock (For Presentation)
router.get('/mock', authenticate, getMockPlan);

// PATCH /api/v1/plan/task/:taskId/complete
router.patch('/task/:taskId/complete', authenticate, completeTask);

module.exports = router;
