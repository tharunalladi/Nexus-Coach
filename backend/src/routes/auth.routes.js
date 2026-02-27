const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, sendOtp, updatePreferences } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');

const router = express.Router();

// POST /api/v1/auth/send-otp
router.post(
    '/send-otp',
    [
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('name').trim().notEmpty().withMessage('Name is required'),
    ],
    validate,
    sendOtp
);

// POST /api/v1/auth/register
router.post(
    '/register',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('targetExam').notEmpty().withMessage('Target exam is required'),
        body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    ],
    validate,
    register
);

// POST /api/v1/auth/login
router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validate,
    login
);

// GET /api/v1/auth/me
router.get('/me', authenticate, getMe);

// PUT /api/v1/auth/preferences
router.put('/preferences', authenticate, updatePreferences);

module.exports = router;
