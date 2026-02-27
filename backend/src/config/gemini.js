const { GoogleGenerativeAI } = require('@google/generative-ai');

let geminiClient = null;

const getGeminiClient = () => {
    if (!geminiClient) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.warn('⚠️  GEMINI_API_KEY not set — AI chat will use smart fallback responses');
            return null;
        }
        geminiClient = new GoogleGenerativeAI(apiKey);
        console.log('✅ Gemini AI client initialized');
    }
    return geminiClient;
};

module.exports = { getGeminiClient };
