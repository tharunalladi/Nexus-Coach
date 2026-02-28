const { getGrokClient } = require('../config/grok');
const { getGeminiClient } = require('../config/gemini');

// Models
const GROK_MODEL = 'grok-3';
const GEMINI_MODEL = 'gemini-1.5-flash';

/**
 * Helper: call Grok completions
 */
const grokChat = async (systemPrompt, userMessage, parseJSON = false) => {
    const client = getGrokClient();
    if (!client) throw new Error('Grok not configured');

    const response = await client.chat.completions.create({
        model: GROK_MODEL,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: parseJSON ? 2000 : 800,
    });

    const text = response.choices[0].message.content.trim();

    if (parseJSON) {
        const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(clean);
    }

    return text;
};

/**
 * Helper: call Gemini completions
 */
const geminiChat = async (systemPrompt, userMessage, history = []) => {
    const genAI = getGeminiClient();
    if (!genAI) throw new Error('Gemini not configured');

    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    // Format history for Gemini API
    const contents = [
        { role: 'user', parts: [{ text: `SYSTEM INSTRUCTION: ${systemPrompt}` }] },
        { role: 'model', parts: [{ text: 'Understood. I will act as the specified agent.' }] },
        ...history.map(h => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content || h.text || '' }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
    ];

    const result = await model.generateContent({
        contents,
        generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
        }
    });

    return result.response.text().trim();
};

// ─── 1. Analyze Test Errors ──────────────────────────────────────────────────

const analyzeTestErrors = async (answers, studentName) => {
    const wrongAnswers = answers.filter((a) => !a.isCorrect).slice(0, 25);

    const systemPrompt = `You are an expert JEE/NEET exam coach AI. Diagnose student mistakes precisely and provide actionable insights. Always respond with valid JSON only.`;

    const userMessage = `Analyze these ${wrongAnswers.length} mistakes made by ${studentName}:

${JSON.stringify(wrongAnswers, null, 2)}

Respond ONLY with this exact JSON structure:
{
  "errors": [{"subject": "...", "topic": "...", "subtopic": "...", "errorType": "conceptual|calculation|silly", "severity": "high|medium|low"}],
  "topWeakTopics": ["topic1", "topic2", "topic3"],
  "errorTypeDistribution": {"conceptual": 40, "calculation": 35, "silly": 25},
  "summary": "2-sentence clinical diagnosis of mistake pattern",
  "aiInsight": "Personalized 2-3 sentence insight for ${studentName} about their specific weakness pattern",
  "quickWins": ["actionable tip 1", "actionable tip 2", "actionable tip 3"]
}`;

    return await grokChat(systemPrompt, userMessage, true);
};

// ─── 2. Generate 7-Day Revision Plan ────────────────────────────────────────

const generateRevisionPlan = async (userDb, profile, sessions, studentName) => {
    let weakTopics = 'Rotational Mechanics, Organic Chemistry, Electrostatics';
    let performanceContext = '';

    if (profile && profile.topicWeaknessScores) {
        weakTopics = Object.entries(profile.topicWeaknessScores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([t, s]) => `${t} (weakness: ${Math.round(s * 100)}%)`)
            .join(', ');

        const dist = profile.errorTypeDistribution || {};
        performanceContext += `Mistake Patterns: ${dist.conceptual}% Conceptual, ${dist.calculation}% Calculation, ${dist.silly}% Silly. `;
    }

    if (sessions && sessions.length > 0) {
        const latest = sessions[0];
        performanceContext += `Recent Performance: Last score ${latest.rawScore}/${latest.totalQuestions} (${latest.percentile} percentile). `;
        if (sessions.length > 1) {
            const trend = latest.rawScore >= sessions[1].rawScore ? 'improving' : 'declining';
            performanceContext += `Trend: ${trend}. `;
        }
    }

    let studyHours = userDb && userDb.weeklyStudyHours ? Math.max(1, Math.round(userDb.weeklyStudyHours / 7)) : 6;

    const systemPrompt = `You are an expert JEE/NEET exam strategist. Create highly personalized, actionable 7-day revision plans based on performance data. Respond ONLY with valid JSON.`;

    const userMessage = `Create a 7-day JEE revision plan for ${studentName}.
    
    Data Profile:
    - Top Weak Areas: ${weakTopics}
    - Score Trends: ${performanceContext}
    - Availability: ~${studyHours} hours/day

    Return ONLY this JSON metadata structure:
    {
      "goal": "One sentence referencing their current score range and specific focus (e.g., 'Targeting score recovery by fixing conceptual gaps in Physics')",
      "days": [
        {
          "day": 1,
          "theme": "emoji + theme (e.g., 🔥 Concept Hardening)",
          "totalMins": ${studyHours * 60},
          "tasks": [
            {
              "id": "uuid",
              "topic": "topic name",
              "taskType": "study|practice|revision|mock",
              "estimatedMins": 90,
              "resources": [{"title": "resource name", "type": "video|pdf|problem_set|link", "url": "https://..."}],
              "isCompleted": false,
              "priority": "high|medium|low",
              "tip": "specific tip matching their error pattern (e.g. if silly errors high, suggest slower reading)"
            }
          ]
        }
      ],
      "studyTips": ["4 personalized tips based on their mistake pattern"]
    }

    Scoring Logic: 
    - If 'conceptual' errors > 40%, prioritize 'study' and 'video' tasks.
    - If 'calculation' or 'silly' errors > 30%, prioritize 'practice' and 'mock' with time limits.
    - Day 5 must be a full-subject mock.`;

    const plan = await grokChat(systemPrompt, userMessage, true);

    const { v4: uuidv4 } = require('uuid');
    plan.days?.forEach((day) => {
        day.tasks?.forEach((task) => {
            if (!task.id || task.id.length < 10) task.id = uuidv4();
        });
    });

    return plan;
};

// ─── 3. AI Tutor Chat ────────────────────────────────────────────────────────

const chatWithAITutor = async (message, history, studentName, weakTopics) => {
    const systemPrompt = `You are NEXUS, an AI exam tutor for JEE/NEET. You are tutoring ${studentName}.
 
Current weak areas: ${weakTopics}
 
Rules:
- Be concise but thorough (max 200 words)
- Use the Socratic method — guide reasoning, don't just give answers
- Use real-world analogies to explain difficult concepts
- Use emojis sparingly but effectively for engagement
- Reference student's specific weak topics when relevant`;

    try {
        // Try Gemini first (as per user preference for "excellent" feel)
        return await geminiChat(systemPrompt, message, history);
    } catch (err) {
        console.warn('Gemini error, falling back to Grok:', err.message);
        try {
            return await grokChat(systemPrompt, message); // basic fallback, loses history for brevity in error state
        } catch (grokErr) {
            throw new Error('All AI services currently unavailable.');
        }
    }
};

// ─── 4. Motivational Message ─────────────────────────────────────────────────

const generateMotivation = async (studentName, profile) => {
    const streak = profile?.studyStreak || 1;
    const topWeak = Object.keys(profile?.topicWeaknessScores || {})[0] || 'Physics';
    const burnout = (profile?.burnoutRiskScore || 0.3) > 0.5 ? 'high' : 'manageable';

    const systemPrompt = `You are a warm, motivating exam coach. Write short, powerful, personal messages that energize students. Be authentic — never generic.`;

    const userMessage = `Write a 2-sentence motivational message for ${studentName}.
Context: ${streak}-day study streak, working on ${topWeak}, stress level ${burnout}.
Include 1 emoji. Make it feel personal — like it's from their own coach.`;

    return await grokChat(systemPrompt, userMessage, false);
};

module.exports = {
    analyzeTestErrors,
    generateRevisionPlan,
    chatWithAITutor,
    generateMotivation,
};
