const { v4: uuidv4 } = require('uuid');
const { testSessions } = require('../config/db');

// ─── Upload Test ──────────────────────────────────────────────────────────────
const uploadTest = async (req, res, next) => {
    try {
        const { examType, totalQuestions, attempted, correct, incorrect, timeTakenMins, answers } = req.body;

        const session = {
            id: uuidv4(),
            userId: req.user.id,
            examType: examType || 'Full Mock',
            totalQuestions: totalQuestions || 90,
            attempted: attempted || 0,
            correct: correct || 0,
            incorrect: incorrect || 0,
            timeTakenMins: timeTakenMins || 180,
            rawScore: (correct || 0) * 4 - (incorrect || 0) * 1,
            percentile: calculatePercentile(correct || 0, totalQuestions || 90),
            answers: answers || [],
            takenAt: new Date().toISOString(),
        };

        const userSessions = testSessions.get(req.user.id) || [];
        userSessions.push(session);
        testSessions.set(req.user.id, userSessions);

        res.status(201).json({
            success: true,
            message: 'Test uploaded successfully!',
            data: { session },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Get Test History ─────────────────────────────────────────────────────────
const getTestHistory = (req, res) => {
    const sessions = testSessions.get(req.user.id) || getDemoHistory(req.user.id);
    res.json({ success: true, data: { sessions } });
};

// ─── Get Single Session ───────────────────────────────────────────────────────
const getTestSession = (req, res) => {
    const sessions = testSessions.get(req.user.id) || [];
    const session = sessions.find((s) => s.id === req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found.' });
    res.json({ success: true, data: { session } });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calculatePercentile = (correct, total) => {
    const pct = (correct / total) * 100;
    if (pct >= 80) return Math.round(97 + Math.random() * 2);
    if (pct >= 70) return Math.round(90 + Math.random() * 7);
    if (pct >= 60) return Math.round(78 + Math.random() * 12);
    if (pct >= 50) return Math.round(60 + Math.random() * 18);
    return Math.round(30 + Math.random() * 30);
};

const getDemoHistory = (userId) => [
    { id: 'demo-s1', userId, examType: 'Full Mock', totalQuestions: 90, attempted: 82, correct: 51, incorrect: 31, rawScore: 173, percentile: 72, takenAt: new Date(Date.now() - 7 * 86400000).toISOString() },
    { id: 'demo-s2', userId, examType: 'Full Mock', totalQuestions: 90, attempted: 78, correct: 48, incorrect: 30, rawScore: 162, percentile: 68, takenAt: new Date(Date.now() - 14 * 86400000).toISOString() },
    { id: 'demo-s3', userId, examType: 'Full Mock', totalQuestions: 90, attempted: 75, correct: 44, incorrect: 31, rawScore: 145, percentile: 63, takenAt: new Date(Date.now() - 21 * 86400000).toISOString() },
];

module.exports = { uploadTest, getTestHistory, getTestSession };
