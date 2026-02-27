/**
 * Calculates updated weakness scores for each topic
 * based on new errors blended with existing profile
 */
const calculateWeaknessScores = (existingProfile, newErrors) => {
    const existing = existingProfile?.topicWeaknessScores || {};
    const updated = { ...existing };

    const severityWeights = { conceptual: 1.0, calculation: 0.7, silly: 0.3 };
    const DECAY = 0.85; // decay factor for existing scores
    const NEW_WEIGHT = 0.4; // weight for new errors

    // Apply decay to existing scores
    for (const topic in updated) {
        updated[topic] = parseFloat((updated[topic] * DECAY).toFixed(3));
    }

    // Process new errors
    const errorsByTopic = {};
    for (const err of newErrors) {
        const topic = err.topic || 'Unknown';
        if (!errorsByTopic[topic]) errorsByTopic[topic] = [];
        errorsByTopic[topic].push(err);
    }

    for (const [topic, errors] of Object.entries(errorsByTopic)) {
        const avgSeverity =
            errors.reduce((sum, e) => sum + (severityWeights[e.errorType] || 0.5), 0) / errors.length;
        const errorRatio = Math.min(1, errors.length / 5); // normalize to 0-1
        const newScore = avgSeverity * errorRatio;

        updated[topic] = parseFloat(
            Math.min(1, (updated[topic] || 0) * (1 - NEW_WEIGHT) + newScore * NEW_WEIGHT).toFixed(3)
        );
    }

    // Sort by weakness descending
    return Object.fromEntries(Object.entries(updated).sort(([, a], [, b]) => b - a));
};

module.exports = { calculateWeaknessScores };
