/**
 * In-memory data store for hackathon demo
 * Replace with PostgreSQL (Supabase) for production
 */

const bcrypt = require('bcryptjs');

const users = new Map();
const testSessions = new Map();
const errorProfiles = new Map();
const revisionPlans = new Map();
const progressSnapshots = new Map();
const otpStore = new Map(); // Store OTPs temporarily

// Seed demo user — password hashed at startup so it's always correct
const DEMO_PASSWORD_HASH = bcrypt.hashSync('demo123', 10);

const DEMO_USER = {
    id: 'demo-user-001',
    name: 'Riya Sharma',
    email: 'demo@nexuscoach.in',
    password: DEMO_PASSWORD_HASH,
    targetExam: 'JEE',
    targetYear: 2026,
    createdAt: new Date('2026-01-01').toISOString(),
};

// Index by both ID and email for fast lookups
users.set(DEMO_USER.id, DEMO_USER);
users.set(DEMO_USER.email, DEMO_USER);
users.set(DEMO_USER.email.toLowerCase(), DEMO_USER); // handle normalizeEmail

// Seed demo error profile
errorProfiles.set(DEMO_USER.id, {
    userId: DEMO_USER.id,
    topicWeaknessScores: {
        'Rotational Mechanics': 0.82,
        'Organic Chemistry - Amines': 0.74,
        'Electrostatics': 0.68,
        'Wave Optics': 0.61,
        'Thermodynamics': 0.55,
        'Kinematics': 0.34,
        'Coordinate Geometry': 0.28,
        'Calculus - Integration': 0.22,
    },
    errorTypeDistribution: {
        conceptual: 42,
        calculation: 33,
        silly: 25,
    },
    burnoutRiskScore: 0.31,
    cognitiveLoadScore: 0.58,
    timePressureFactor: 0.68,
    retentionHalfLifeDays: 4.2,
    studyStreak: 7,
    confidenceScore: 64,
    aiInsight: 'Your Error DNA shows a clear pattern of conceptual gaps in advanced Physics (Rotational + Electrostatics). Chemistry errors cluster around reaction mechanisms. Good news: your Math weakness is fixable quickly with targeted practice.',
    quickWins: [
        'Spend 30 min daily on Rotational Mechanics fundamentals',
        'Revise Organic reaction mechanisms using NCERT + Exemplar',
        'Solve 5 Electrostatics DPP questions before sleep',
    ],
    updatedAt: new Date().toISOString(),
});

console.log('✅ Demo user seeded — email: demo@nexuscoach.in | password: demo123');

module.exports = { users, testSessions, errorProfiles, revisionPlans, progressSnapshots, otpStore, DEMO_USER };
