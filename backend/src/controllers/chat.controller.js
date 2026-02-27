const { errorProfiles } = require('../config/db');
const { getGeminiClient } = require('../config/gemini');

const handleChat = async (req, res, next) => {
    try {
        const { message, context } = req.body;
        const profile = errorProfiles.get(req.user.id);
        const firstName = req.user.name.split(' ')[0];

        let weakTopics = 'Rotational Mechanics, Organic Chemistry, Electrostatics';
        if (profile && profile.topicWeaknessScores) {
            weakTopics = Object.keys(profile.topicWeaknessScores).slice(0, 4).join(', ');
        }

        let reply = '';
        const gemini = getGeminiClient();

        if (gemini) {
            try {
                const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });

                // Build a full context prompt including chat history
                const historyText = (context || []).slice(-6)
                    .map(m => `${m.role === 'assistant' ? 'NEXUS' : firstName}: ${m.text}`)
                    .join('\n');

                const fullPrompt = `You are NEXUS, a personalized AI exam coach for JEE/NEET students.
Student name: ${firstName}
Student's current weak topics: ${weakTopics}

Instructions:
- Be helpful, warm, and concise (max 200 words)
- Answer ANY question the student asks, not just about their weak topics
- For exam topics, use the Socratic method — guide with hints, not just answers
- Use **bold** for key terms
- Reference the student's name and weak topics when relevant
- NEVER say you cannot answer a question

${historyText ? `Recent conversation:\n${historyText}\n` : ''}
${firstName}: ${message}
NEXUS:`;

                const result = await model.generateContent(fullPrompt);
                reply = result.response.text().trim();

                if (!reply) throw new Error('Empty response from Gemini');

            } catch (geminiErr) {
                console.error('Gemini Error:', geminiErr.message);
                // Fallback below
            }
        }

        // ── Fallback if Gemini not available ────────────────────────────────────
        if (!reply) {
            await new Promise(r => setTimeout(r, 700));
            const m = message.toLowerCase().trim();

            if (m === 'hi' || m === 'hello' || m === 'hey') {
                reply = `Hello ${firstName}! 👋 I'm NEXUS. Your focus areas are **${weakTopics}**. What would you like to study today?`;
            } else if (m.includes('weak') || m.includes('focus') || m.includes('study')) {
                reply = `Your top weak areas are: **${weakTopics}**. 📊 Which one should we tackle first?`;
            } else if (m.includes('plan') || m.includes('schedule')) {
                reply = `Your 7-day plan focuses on **${weakTopics}**. Follow Day 1-2 for hardest topics and Day 5 for full mock. Are you on track?`;
            } else if (m.includes('thank')) {
                reply = `You're welcome, ${firstName}! 🌟 Keep pushing — what's next?`;
            } else {
                reply = `That's a great question, ${firstName}! I'm having trouble reaching my AI backend right now. Please try again in a moment, or ask me about **${weakTopics.split(',')[0].trim()}** — your current priority topic! 🎯`;
            }
        }

        res.json({
            success: true,
            data: { reply, timestamp: new Date().toISOString() }
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { handleChat };
