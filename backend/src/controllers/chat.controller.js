const { errorProfiles } = require('../config/db');
const { chatWithAITutor } = require('../services/ai.service');

/**
 * Handle AI Tutor messages by delegating to the AI Service
 * This ensures consistency across different AI entry points
 */
const handleChat = async (req, res, next) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const profile = errorProfiles.get(req.user.id);
        const firstName = req.user.name.split(' ')[0];

        // Prepare context for the AI
        let weakTopics = 'Physics, Chemistry, Mathematics';
        if (profile && profile.topicWeaknessScores) {
            weakTopics = Object.keys(profile.topicWeaknessScores).slice(0, 3).join(', ');
        }

        // Format history for the service (ensuring compatibility)
        const history = (context || []).map(m => ({
            role: m.role,
            content: m.text || m.content
        }));

        // Execute chat via service (Gemini primary, Grok fallback)
        const reply = await chatWithAITutor(message, history, firstName, weakTopics);

        res.json({
            success: true,
            data: {
                reply,
                timestamp: new Date().toISOString()
            }
        });

    } catch (err) {
        console.error('Chat controller error:', err.message);
        // Final ultimate fallback in case both services fail in the service layer
        const fallbackReply = `I'm deeply sorry, ${req.user.name.split(' ')[0]}, but my neural links are temporarily saturated. Please try your question again in 30 seconds — I'm eager to help you master these concepts!`;

        res.json({
            success: true,
            data: {
                reply: fallbackReply,
                timestamp: new Date().toISOString()
            }
        });
    }
};

module.exports = { handleChat };
