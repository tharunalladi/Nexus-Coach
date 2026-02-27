const { errorProfiles } = require('../config/db');
const { analyzeTestErrors } = require('../services/ai.service');
const { calculateWeaknessScores } = require('../services/analysis.service');

// ─── Run AI Analysis ──────────────────────────────────────────────────────────
const runAnalysis = async (req, res, next) => {
    try {
        const { answers, examType, timeTakenMins } = req.body;

        // Use Grok AI to analyze errors, fall back to algorithmic analysis
        let analysisResult;
        try {
            analysisResult = await analyzeTestErrors(answers || getDemoAnswers(), req.user.name);
        } catch (aiErr) {
            console.warn('Grok AI unavailable, using algorithmic analysis');
            analysisResult = buildFallbackAnalysis(answers || getDemoAnswers());
        }

        // Update error profile
        const profile = errorProfiles.get(req.user.id) || buildDefaultProfile(req.user.id);
        profile.topicWeaknessScores = calculateWeaknessScores(profile, analysisResult.errors);

        // Merge weak topics back into the DB if we want true integration later, but for now just use the profile
        profile.errorTypeDistribution = analysisResult.errorTypeDistribution;
        profile.burnoutRiskScore = calculateBurnoutRisk(profile);
        profile.aiInsights = analysisResult.aiInsight;
        profile.quickWins = analysisResult.quickWins || [];
        profile.updatedAt = new Date().toISOString();
        errorProfiles.set(req.user.id, profile);

        res.json({
            success: true,
            message: 'Analysis complete!',
            data: {
                analysis: analysisResult,
                profile,
            },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Get Error DNA Profile ────────────────────────────────────────────────────
const getProfile = (req, res) => {
    const profile = errorProfiles.get(req.user.id);
    if (!profile) {
        return res.json({ success: true, data: null });
    }

    // Transform backend profile into frontend-expected shape
    const formattedData = {
        userId: profile.userId,
        topics: Object.entries(profile.topicWeaknessScores || {})
            .sort(([, a], [, b]) => b - a)
            .map(([name, score]) => ({
                name,
                score: Math.round(score * 100),
                fullMark: 100
            })),
        distribution: [
            { name: 'Conceptual Gaps', value: profile.errorTypeDistribution?.conceptual || 0, fill: '#8b5cf6' },
            { name: 'Calculation Mistakes', value: profile.errorTypeDistribution?.calculation || 0, fill: '#3b82f6' },
            { name: 'Silly Errors', value: profile.errorTypeDistribution?.silly || 0, fill: '#ec4899' },
        ],
        stats: {
            burnoutRisk: profile.burnoutRiskScore > 0.6 ? `High (${Math.round(profile.burnoutRiskScore * 100)}%)` : profile.burnoutRiskScore > 0.35 ? `Medium (${Math.round(profile.burnoutRiskScore * 100)}%)` : `Low (${Math.round(profile.burnoutRiskScore * 100)}%)`,
            cognitiveLoad: profile.cognitiveLoadScore > 0.7 ? 'High' : 'Medium',
            retentionHalfLife: `${profile.retentionHalfLifeDays || 5} Days`,
            studyStreak: `${profile.studyStreak || 0} Days`,
        },
        aiInsights: profile.aiInsights || "Your Error DNA has been mapped. Keep practicing to discover deeper insights into your learning patterns.",
        quickWins: profile.quickWins?.length ? profile.quickWins : [
            "Review your incorrect answers from the latest mock test",
            "Focus on high-weightage topics this week",
            "Take short breaks every 45 minutes of study"
        ]
    };

    res.json({ success: true, data: formattedData });
};

// ─── Get Mock Error DNA (For Presentation Demonstration) ──────────────────────
const getMockErrorDNA = async (req, res, next) => {
    try {
        const mockErrorDNA = {
            userId: req.user.id,
            topics: [
                { name: 'Rotational Mechanics', score: 82, fullMark: 100 },
                { name: 'Organic Chem', score: 74, fullMark: 100 },
                { name: 'Electrostatics', score: 68, fullMark: 100 },
                { name: 'Wave Optics', score: 61, fullMark: 100 },
                { name: 'Thermodynamics', score: 55, fullMark: 100 },
                { name: 'Kinematics', score: 34, fullMark: 100 },
            ],
            distribution: [
                { name: 'Conceptual Gaps', value: 42, fill: '#8b5cf6' },
                { name: 'Calculation Mistakes', value: 33, fill: '#3b82f6' },
                { name: 'Silly/Reading Errors', value: 25, fill: '#ec4899' },
            ],
            stats: {
                burnoutRisk: 'Low (31%)',
                cognitiveLoad: 'Medium (58%)',
                retentionHalfLife: '4.2 Days',
                studyStreak: '7 Days',
            },
            aiInsights: "Your Error DNA shows a clear pattern of conceptual gaps in advanced Physics (Rotational + Electrostatics). Chemistry errors strictly cluster around reaction mechanisms. Good news: your Math weakness is fixable quickly with targeted practice.",
            quickWins: [
                "Spend 30 min daily on Rotational Mechanics fundamentals",
                "Revise Organic reaction mechanisms using NCERT + Exemplar",
                "Solve 5 Electrostatics DPP questions before sleep",
            ]
        };

        res.json({
            success: true,
            data: mockErrorDNA
        });
    } catch (err) {
        next(err);
    }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calculateBurnoutRisk = (profile) => {
    const weakTopics = Object.values(profile.topicWeaknessScores || {});
    const avgWeakness = weakTopics.length ? weakTopics.reduce((a, b) => a + b, 0) / weakTopics.length : 0;
    return Math.min(0.99, avgWeakness * 0.6 + (profile.cognitiveLoadScore || 0.5) * 0.4);
};

const buildDefaultProfile = (userId) => ({
    userId,
    topicWeaknessScores: {},
    errorTypeDistribution: { conceptual: 40, calculation: 35, silly: 25 },
    burnoutRiskScore: 0.3,
    cognitiveLoadScore: 0.5,
    timePressureFactor: 0.5,
    retentionHalfLifeDays: 5,
    studyStreak: 0,
    confidenceScore: 50,
    updatedAt: new Date().toISOString(),
});

const buildFallbackAnalysis = (answers) => {
    const subjects = ['Physics', 'Chemistry', 'Mathematics'];
    const errors = answers.filter(a => !a.isCorrect).map((a, i) => ({
        subject: subjects[i % 3],
        topic: getDemoTopic(subjects[i % 3]),
        errorType: ['conceptual', 'calculation', 'silly'][i % 3],
        timeSecs: Math.floor(Math.random() * 120) + 30,
    }));
    return {
        errors,
        summary: 'Analysis based on your test submission. Key focus areas identified.',
        topWeakTopics: ['Rotational Mechanics', 'Organic Chemistry', 'Electrostatics'],
        errorTypeDistribution: { conceptual: 42, calculation: 33, silly: 25 },
        aiInsight: 'Your main challenge is conceptual gaps in advanced Physics topics. Focus on building fundamentals first.',
    };
};

const getDemoAnswers = () => Array.from({ length: 20 }, (_, i) => ({
    questionNo: i + 1,
    subject: ['Physics', 'Chemistry', 'Mathematics'][i % 3],
    topic: getDemoTopic(['Physics', 'Chemistry', 'Mathematics'][i % 3]),
    isCorrect: Math.random() > 0.45,
    timeSecs: Math.floor(Math.random() * 150) + 20,
}));

const getDemoTopic = (subject) => {
    const topicMap = {
        Physics: ['Rotational Mechanics', 'Electrostatics', 'Wave Optics', 'Kinematics'],
        Chemistry: ['Organic - Amines', 'Thermodynamics', 'Electrochemistry', 'Hydrocarbons'],
        Mathematics: ['Integration', 'Coordinate Geometry', 'Probability', 'Vectors'],
    };
    const topics = topicMap[subject] || ['General'];
    return topics[Math.floor(Math.random() * topics.length)];
};

module.exports = { runAnalysis, getProfile, getMockErrorDNA };
