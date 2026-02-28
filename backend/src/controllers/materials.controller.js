const { errorProfiles } = require('../config/db');
const { getResourcesForTopics } = require('../config/resourceBank');
const { getGeminiClient } = require('../config/gemini');

const getMaterials = async (req, res, next) => {
    try {
        const profile = errorProfiles.get(req.user.id);

        // Get weak topics from error profile, or use defaults
        let weakTopics = [
            'Rotational Mechanics', 'Electrostatics', 'Wave Optics', // Physics
            'Chemical Equilibrium', 'Atomic Structure', 'Electrochemistry', // Chemistry
            'Integration', 'Differentiation', 'Probability', // Maths
            'Cell Biology', 'Genetics' // Biology
        ];
        if (profile && profile.topicWeaknessScores) {
            const sorted = Object.entries(profile.topicWeaknessScores)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 12)
                .map(([topic]) => topic);
            if (sorted.length > 0) weakTopics = sorted;
        }

        // Get curated resources for each weak topic
        const recommendations = getResourcesForTopics(weakTopics);

        // Try to get an AI tip for the top weak topic
        let aiTip = null;
        const gemini = getGeminiClient();
        if (gemini) {
            try {
                const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
                const result = await model.generateContent(
                    `Give a 1-sentence study tip for a JEE/NEET student struggling with "${weakTopics[0]}". Be specific and actionable. Max 25 words.`
                );
                aiTip = result.response.text().trim();
            } catch (e) {
                // AI tip is optional, silently skip
            }
        }

        res.json({
            success: true,
            data: {
                weakTopics,
                recommendations,
                aiTip,
                updatedAt: new Date().toISOString(),
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getMaterials };
