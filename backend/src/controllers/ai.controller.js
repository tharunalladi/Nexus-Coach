const { errorProfiles } = require('../config/db');
const { chatWithAITutor, generateMotivation } = require('../services/ai.service');

// ─── AI Tutor Chat ────────────────────────────────────────────────────────────
const chat = async (req, res, next) => {
    try {
        const { message, conversationHistory } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const profile = errorProfiles.get(req.user.id);
        const weakTopics = profile
            ? Object.entries(profile.topicWeaknessScores || {})
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([t]) => t)
                .join(', ')
            : 'Physics, Chemistry, Mathematics';

        let reply;
        try {
            reply = await chatWithAITutor(message, conversationHistory || [], req.user.name, weakTopics);
        } catch (aiErr) {
            reply = getFallbackReply(message);
        }

        res.json({
            success: true,
            data: { reply, timestamp: new Date().toISOString() },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Get Motivational Message ─────────────────────────────────────────────────
const getMotivation = async (req, res, next) => {
    try {
        const profile = errorProfiles.get(req.user.id);

        let message;
        try {
            message = await generateMotivation(req.user.name, profile);
        } catch (aiErr) {
            message = getFallbackMotivation(req.user.name, profile);
        }

        res.json({ success: true, data: { message } });
    } catch (err) {
        next(err);
    }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getFallbackReply = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('newton') || lower.includes('law')) {
        return "Newton's Laws form the foundation of classical mechanics. The 1st law states an object stays at rest or in uniform motion unless acted upon by an external force. Would you like me to explain with a specific example?";
    }
    if (lower.includes('organic') || lower.includes('carbon')) {
        return "Organic Chemistry is all about carbon compounds! The key is understanding reaction mechanisms. IUPAC naming, functional groups, and named reactions (like Grignard, Aldol) are high-priority for JEE. Which topic are you struggling with?";
    }
    return "That's a great question! For JEE/NEET preparation, it's important to understand concepts from first principles, not just memorize formulas. Try explaining the concept in your own words — it helps retention significantly. What specific topic would you like to explore?";
};

const getFallbackMotivation = (name, profile) => {
    const streak = profile?.studyStreak || 1;
    const messages = [
        `${name}, you've maintained a ${streak}-day study streak! Every hour you invest now is a rank jump on exam day. Keep pushing! 🔥`,
        `${name}, remember — JEE toppers didn't start as toppers. They started exactly where you are and refused to give up. Today's effort = tomorrow's rank. 💪`,
        `${name}, your weak topics today are your scoring topics tomorrow. Trust the process! 🎯`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};

module.exports = { chat, getMotivation };
