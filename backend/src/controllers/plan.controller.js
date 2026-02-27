const { v4: uuidv4 } = require('uuid');
const { errorProfiles, revisionPlans } = require('../config/db');
const { query } = require('../config/mysql');
const { generateRevisionPlan } = require('../services/ai.service');

// ─── Generate Plan ────────────────────────────────────────────────────────────
const generatePlan = async (req, res, next) => {
    try {
        const profile = errorProfiles.get(req.user.id);

        let userDb = null;
        try {
            const [users] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
            if (users && users.length > 0) {
                userDb = users[0];
                if (userDb.weakSubjects && typeof userDb.weakSubjects === 'string') {
                    try { userDb.weakSubjects = JSON.parse(userDb.weakSubjects); } catch (e) { }
                }
            }
        } catch (e) {
            console.error('Error fetching user for plan:', e);
        }

        let planData;
        try {
            planData = await generateRevisionPlan(userDb, profile, req.user.name);
        } catch (aiErr) {
            console.warn('Grok AI unavailable, using algorithmic plan');
            planData = buildAlgorithmicPlan(userDb, profile);
        }

        const plan = {
            id: uuidv4(),
            userId: req.user.id,
            generatedAt: new Date().toISOString(),
            isActive: true,
            planData,
        };

        revisionPlans.set(req.user.id, plan);

        res.json({
            success: true,
            message: '7-day revision plan generated!',
            data: { plan },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Get Active Plan ──────────────────────────────────────────────────────────
const getActivePlan = (req, res) => {
    const plan = revisionPlans.get(req.user.id);
    if (!plan) {
        return res.json({ success: true, data: { plan: null } });
    }
    res.json({ success: true, data: { plan } });
};

// ─── Complete Task ────────────────────────────────────────────────────────────
const completeTask = (req, res) => {
    const plan = revisionPlans.get(req.user.id);
    if (!plan) return res.status(404).json({ success: false, message: 'No active plan found.' });

    const { taskId } = req.params;
    for (const day of plan.planData.days) {
        const task = day.tasks.find((t) => t.id === taskId);
        if (task) {
            task.isCompleted = true;
            task.completedAt = new Date().toISOString();
            revisionPlans.set(req.user.id, plan);
            return res.json({ success: true, message: 'Task marked complete!', data: { task } });
        }
    }

    res.status(404).json({ success: false, message: 'Task not found.' });
};

// ─── Get Mock Plan (For Presentation Demonstration) ──────────────────────
const getMockPlan = (req, res) => {
    const mockTopics = ['Rotational Mechanics', 'Organic Chem', 'Electrostatics', 'Wave Optics', 'Thermodynamics', 'Kinematics'];

    // Use the algorithmic builder with our mock topics to ensure it matches the Error DNA
    const planData = buildAlgorithmicPlanMock(mockTopics);

    res.json({
        success: true,
        data: {
            plan: {
                id: 'mock-plan-123',
                userId: req.user.id,
                generatedAt: new Date().toISOString(),
                isActive: true,
                planData
            }
        }
    });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildAlgorithmicPlan = (userDb, profile) => {
    let weakTopics = [];
    if (profile && profile.topicWeaknessScores) {
        weakTopics = Object.entries(profile.topicWeaknessScores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([topic]) => topic);
    } else if (userDb && userDb.weakSubjects && userDb.weakSubjects.length > 0) {
        weakTopics = userDb.weakSubjects;
    } else {
        weakTopics = ['Rotational Mechanics', 'Organic Chemistry', 'Electrostatics', 'Wave Optics', 'Thermodynamics', 'Integration'];
    }

    const taskTypes = ['study', 'practice', 'revision', 'mock'];
    const resources = [
        { title: 'HC Verma Chapter', type: 'pdf' },
        { title: 'Khan Academy Video', type: 'video' },
        { title: 'DPP Practice Set', type: 'problem_set' },
        { title: 'NCERT Exemplar', type: 'pdf' },
    ];

    let dailyMins = 360; // default 6 hrs
    if (userDb && userDb.weeklyStudyHours) {
        dailyMins = Math.max(60, Math.round((userDb.weeklyStudyHours * 60) / 7)); // min 1 hr/day
    }

    const days = Array.from({ length: 7 }, (_, dayIdx) => ({
        day: dayIdx + 1,
        date: new Date(Date.now() + dayIdx * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        theme: getDayTheme(dayIdx),
        totalMins: dayIdx === 6 ? Math.round(dailyMins * 0.6) : dailyMins,
        tasks: Array.from({ length: dayIdx === 4 ? 2 : 3 }, (_, taskIdx) => {
            const topicIdx = (dayIdx * 3 + taskIdx) % weakTopics.length;
            const taskPortion = dayIdx === 4 ? 0.5 : [0.4, 0.35, 0.25][taskIdx];
            return {
                id: uuidv4(),
                topic: weakTopics[topicIdx],
                taskType: dayIdx === 4 ? 'mock' : taskTypes[taskIdx % taskTypes.length],
                estimatedMins: Math.round(dailyMins * taskPortion),
                resources: [{
                    title: `Review: ${weakTopics[topicIdx]}`,
                    type: dayIdx % 2 === 0 ? 'video' : 'problem_set',
                    url: `https://www.youtube.com/results?search_query=JEE+Advanced+${encodeURIComponent(weakTopics[topicIdx])}`
                }],
                isCompleted: false,
                priority: topicIdx < 2 ? 'high' : topicIdx < 4 ? 'medium' : 'low',
            };
        }),
    }));

    return {
        goal: `7-Day JEE Revision Plan — Focus on your top weak areas`,
        days,
        studyTips: [
            'Start each day with a 10-min warm-up problem',
            'Take a 10-min break after every 50 minutes',
            'Review mistakes before sleeping for better retention',
            'Drink water frequently — hydration improves focus by 20%',
        ],
    };
};

const getDayTheme = (dayIdx) => {
    const themes = [
        '🔥 Heavy Focus — Hardest Topics',
        '🧠 Deep Dive — Conceptual Clarity',
        '📐 Formula Mastery',
        '🔄 Cross-topic Integration',
        '📝 Full-Subject Mini Mock',
        '🔍 Error Review & Consolidation',
        '🚀 Light Revision + Confidence Boost',
    ];
    return themes[dayIdx];
};

const getDefaultPlan = (userId) => ({
    id: 'default-plan',
    userId,
    generatedAt: new Date().toISOString(),
    isActive: true,
    planData: buildAlgorithmicPlan(null, null),
});

const buildAlgorithmicPlanMock = (weakTopics) => {
    const taskTypes = ['study', 'practice', 'revision', 'mock'];
    const resources = [
        { title: 'HC Verma Chapter', type: 'pdf' },
        { title: 'Khan Academy Video', type: 'video' },
        { title: 'DPP Practice Set', type: 'problem_set' },
        { title: 'NCERT Exemplar', type: 'pdf' },
    ];

    const days = Array.from({ length: 7 }, (_, dayIdx) => ({
        day: dayIdx + 1,
        date: new Date(Date.now() + dayIdx * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        theme: getDayTheme(dayIdx),
        totalMins: dayIdx === 6 ? 240 : 360,
        tasks: Array.from({ length: dayIdx === 4 ? 2 : 3 }, (_, taskIdx) => {
            const topicIdx = (dayIdx * 3 + taskIdx) % weakTopics.length;
            return {
                id: `mock-task-${dayIdx}-${taskIdx}`,
                topic: weakTopics[topicIdx],
                taskType: dayIdx === 4 ? 'mock' : taskTypes[taskIdx % taskTypes.length],
                estimatedMins: dayIdx === 4 ? 120 : [90, 75, 60][taskIdx],
                resources: [{
                    title: `Mastery: ${weakTopics[topicIdx]}`,
                    type: 'video',
                    url: `https://www.youtube.com/results?search_query=JEE+Advanced+One+Shot+${encodeURIComponent(weakTopics[topicIdx])}`
                }],
                isCompleted: dayIdx === 0 && taskIdx === 0,
                priority: topicIdx < 2 ? 'high' : topicIdx < 4 ? 'medium' : 'low',
            };
        }),
    }));

    return {
        goal: `7-Day JEE Revision Plan — Focus on your top weak areas`,
        days,
        studyTips: [
            'Start each day with a 10-min warm-up problem',
            'Take a 10-min break after every 50 minutes',
            'Review mistakes before sleeping for better retention',
            'Drink water frequently — hydration improves focus by 20%',
        ],
    };
};

module.exports = { generatePlan, getActivePlan, completeTask, getMockPlan };
