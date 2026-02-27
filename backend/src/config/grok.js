const OpenAI = require('openai');

let grokClient = null;

/**
 * Returns a configured Grok (xAI) client.
 * Grok uses an OpenAI-compatible API at https://api.x.ai/v1
 * Get your free API key at: https://console.x.ai/
 */
const getGrokClient = () => {
    if (!grokClient) {
        const apiKey = process.env.GROK_API_KEY;

        if (!apiKey || apiKey === 'your_grok_api_key_here') {
            console.warn('⚠️  GROK_API_KEY not set — AI features will use smart fallback responses');
            return null;
        }

        grokClient = new OpenAI({
            apiKey,
            baseURL: 'https://api.x.ai/v1',
        });

        console.log('✅ Grok AI client initialized (xAI / Grok-3)');
    }

    return grokClient;
};

module.exports = { getGrokClient };
