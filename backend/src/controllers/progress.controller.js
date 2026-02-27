const { errorProfiles, testSessions, DEMO_USER } = require('../config/db');

// GET /api/v1/progress
const getProgress = (req, res) => {
    let profile = errorProfiles.get(req.user.id);
    let sessions = testSessions.get(req.user.id) || [];

    // Presentation Demo Fallback: If no real data, use seeded demo data
    if (sessions.length === 0 && !profile) {
        profile = errorProfiles.get(DEMO_USER.id);
        sessions = testSessions.get(DEMO_USER.id) || [];
    }

    const scores = sessions.map((s) => ({
        date: new Date(s.takenAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        rawScore: s.rawScore,
        percentile: s.percentile,
        correct: s.correct,
        total: s.totalQuestions,
    }));

    const latestScore = sessions[0]?.rawScore || 0;
    const firstScore = sessions[sessions.length - 1]?.rawScore || 0;
    const improvement = latestScore - firstScore;
    const predictedScore = latestScore > 0 ? Math.min(360, Math.round(latestScore * 1.12 + 10)) : null;

    // Build subject accuracy from real error profile
    const topicWeaknessScores = profile?.topicWeaknessScores || {};
    const subjectAccuracy = buildSubjectAccuracy(topicWeaknessScores);

    // Weak topics from real profile
    const weakTopics = Object.entries(topicWeaknessScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([topic, score]) => ({
            topic,
            score: Math.round(score * 100),
            severity: score > 0.7 ? 'critical' : score > 0.5 ? 'high' : score > 0.3 ? 'medium' : 'low',
        }));

    res.json({
        success: true,
        data: {
            overview: {
                studyStreak: profile?.studyStreak || 0,
                confidenceScore: profile?.confidenceScore || 0,
                burnoutRisk: profile?.burnoutRiskScore || 0,
                predictedScore,
                predictedPercentile: predictedScore ? Math.min(99, (predictedScore / 360) * 100 + 18) : null,
                improvement,
                totalSessions: sessions.length,
            },
            scoreHistory: scores,
            subjectBreakdown: subjectAccuracy,
            weakTopics,
        },
    });
};

// Build real subject accuracy from the error profile topic scores
const buildSubjectAccuracy = (topicWeaknessScores) => {
    const subjectGroups = { Physics: [], Chemistry: [], Mathematics: [], Biology: [] };
    const topicToSubject = {
        'Rotational Mechanics': 'Physics', 'Electrostatics': 'Physics', 'Wave Optics': 'Physics',
        'Thermodynamics': 'Physics', 'Kinematics': 'Physics', 'Current Electricity': 'Physics',
        'Magnetism': 'Physics', 'Modern Physics': 'Physics', 'Gravitation': 'Physics',
        'Organic - Amines': 'Chemistry', 'Chemical Equilibrium': 'Chemistry', 'Atomic Structure': 'Chemistry',
        'Electrochemistry': 'Chemistry', 'Organic Reactions': 'Chemistry', 'Coordination Chemistry': 'Chemistry',
        'Thermodynamics (Chemistry)': 'Chemistry', 'Polymers': 'Chemistry',
        'Integration': 'Mathematics', 'Differentiation': 'Mathematics', 'Probability': 'Mathematics',
        'Matrices': 'Mathematics', 'Complex Numbers': 'Mathematics', 'Trigonometry': 'Mathematics',
        'Vectors': 'Mathematics', 'Sequences & Series': 'Mathematics', 'Limits': 'Mathematics',
        'Cell Biology': 'Biology', 'Genetics': 'Biology', 'Plant Biology': 'Biology',
        'Human Physiology': 'Biology', 'Ecology': 'Biology', 'Biotechnology': 'Biology',
    };

    for (const [topic, score] of Object.entries(topicWeaknessScores)) {
        const subj = topicToSubject[topic];
        if (subj) subjectGroups[subj].push(score);
    }

    return Object.entries(subjectGroups)
        .filter(([, scores]) => scores.length > 0)
        .map(([subject, scores]) => {
            const avgWeakness = scores.reduce((a, b) => a + b, 0) / scores.length;
            const accuracy = Math.round(Math.max(20, Math.min(95, (1 - avgWeakness) * 100)));
            return { subject, accuracy, topicsTracked: scores.length };
        });
};

module.exports = { getProgress };
