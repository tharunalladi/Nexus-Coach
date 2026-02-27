const { v4: uuidv4 } = require('uuid');
const { getQuestions } = require('../config/questionBank');
const { errorProfiles } = require('../config/db');
const { calculateWeaknessScores } = require('../services/analysis.service');

// ─── GET Questions ──────────────────────────────────────────────────────────────
const fetchQuestions = (req, res) => {
    const { examType = 'JEE', subjects = 'Physics,Chemistry,Mathematics', perSubject = '5' } = req.query;
    const subjectList = subjects.split(',').map(s => s.trim());
    const questions = getQuestions(examType, subjectList, parseInt(perSubject));

    if (questions.length === 0) {
        return res.status(400).json({ success: false, message: `No questions found for ${examType} — ${subjects}` });
    }

    // Strip the answer before sending to frontend
    const sanitized = questions.map(({ answer, explanation, ...rest }) => ({ ...rest, _answer: undefined }));

    res.json({ success: true, data: { questions: sanitized, total: sanitized.length } });
};

// ─── Submit and Auto-Analyze ────────────────────────────────────────────────────
const submitExam = async (req, res, next) => {
    try {
        const { examType = 'JEE', subjects = 'Physics,Chemistry,Mathematics', perSubject = 5, userAnswers = {} } = req.body;

        const subjectList = subjects.split ? subjects.split(',').map(s => s.trim()) : subjects;
        const questions = getQuestions(examType, subjectList, parseInt(perSubject));

        let correct = 0, incorrect = 0;
        const wrongAnswers = [];

        for (const q of questions) {
            const userChoice = userAnswers[q.id];
            if (userChoice === q.answer) {
                correct++;
            } else {
                incorrect++;
                wrongAnswers.push({
                    questionNo: q.id,
                    subject: q.subject,
                    topic: q.topic,
                    isCorrect: false,
                    errorType: 'conceptual', // default; can be inferred later
                    timeSecs: 60,
                    userAnswer: userChoice || 'not_answered',
                    correctAnswer: q.answer,
                    question: q.question
                });
            }
        }

        const score = Math.round((correct / questions.length) * 100);

        // Auto-run analysis with the wrong answers to update Error DNA
        if (wrongAnswers.length > 0) {
            const existingProfile = errorProfiles.get(req.user.id) || {
                userId: req.user.id,
                topicWeaknessScores: {},
                errorTypeDistribution: { conceptual: 0, calculation: 0, silly: 0 },
                studyStreak: 0,
                burnoutRiskScore: 0.2,
                totalSessions: 0,
            };

            const updatedWeaknesses = calculateWeaknessScores(existingProfile, wrongAnswers);
            const updatedProfile = {
                ...existingProfile,
                topicWeaknessScores: updatedWeaknesses,
            };
            updatedProfile.totalSessions = (updatedProfile.totalSessions || 0) + 1;
            updatedProfile.lastSession = new Date().toISOString();
            errorProfiles.set(req.user.id, updatedProfile);
        }

        res.json({
            success: true,
            data: {
                score,
                correct,
                incorrect,
                total: questions.length,
                wrongTopics: [...new Set(wrongAnswers.map(a => a.topic))],
                examType,
                completedAt: new Date().toISOString()
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { fetchQuestions, submitExam };
