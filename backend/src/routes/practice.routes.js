const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { fetchQuestions, submitExam } = require('../controllers/practice.controller');

router.get('/questions', authenticate, fetchQuestions);
router.post('/submit', authenticate, submitExam);

module.exports = router;
