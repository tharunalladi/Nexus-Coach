// ─── Curated Study Resource Bank ─────────────────
// videoId = YouTube video ID for in-site embedding (optional)
// url = fallback external link

const resourceBank = {
    // ── PHYSICS ───────────────────────────────────────────────────────────────
    'Rotational Mechanics': [
        { type: 'youtube', title: 'Rotational Motion Complete | Physics Wallah', videoId: 'Z4QbGFimVLs', url: 'https://www.youtube.com/watch?v=Z4QbGFimVLs', duration: '1h 20m' },
        { type: 'pdf', title: 'NCERT Ch 7 - System of Particles', url: 'https://ncert.nic.in/textbook/pdf/keph107.pdf' },
    ],
    'Electrostatics': [
        { type: 'youtube', title: 'Electrostatics Full Chapter | Physics Wallah', videoId: 'l3hw6Bk7Dkg', url: 'https://www.youtube.com/watch?v=l3hw6Bk7Dkg', duration: '2h 10m' },
        { type: 'pdf', title: 'NCERT Ch 1 - Electric Charges', url: 'https://ncert.nic.in/textbook/pdf/leph101.pdf' },
    ],
    'Wave Optics': [
        { type: 'youtube', title: 'Wave Optics Full Chapter | JEE', videoId: 'ryP7oER49e8', url: 'https://www.youtube.com/watch?v=ryP7oER49e8', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Ch 10 - Wave Optics', url: 'https://ncert.nic.in/textbook/pdf/leph110.pdf' },
    ],
    'Thermodynamics': [
        { type: 'youtube', title: 'Thermodynamics Laws | PW', videoId: 'Xb05CaG7TsQ', url: 'https://www.youtube.com/watch?v=Xb05CaG7TsQ', duration: '1h 45m' },
        { type: 'pdf', title: 'NCERT Ch 12 - Thermodynamics', url: 'https://ncert.nic.in/textbook/pdf/keph112.pdf' },
    ],
    'Kinematics': [
        { type: 'youtube', title: 'Kinematics 1D | Physics Wallah', videoId: 'R2Jf0-Rl4WA', url: 'https://www.youtube.com/watch?v=R2Jf0-Rl4WA', duration: '1h 15m' },
        { type: 'pdf', title: 'NCERT Ch 3 - Motion in Straight Line', url: 'https://ncert.nic.in/textbook/pdf/keph103.pdf' },
    ],
    'Current Electricity': [
        { type: 'youtube', title: 'Current Electricity | PW', videoId: '0UNNb5HkAOQ', url: 'https://www.youtube.com/watch?v=0UNNb5HkAOQ', duration: '2h 05m' },
        { type: 'pdf', title: 'NCERT Ch 3 - Current Electricity', url: 'https://ncert.nic.in/textbook/pdf/leph103.pdf' },
    ],
    'Magnetism': [
        { type: 'youtube', title: 'Moving Charges | Vedantu', videoId: 'YmNkqEyFEtw', url: 'https://www.youtube.com/watch?v=YmNkqEyFEtw', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Ch 4 - Moving Charges', url: 'https://ncert.nic.in/textbook/pdf/leph104.pdf' },
    ],

    // ── CHEMISTRY ─────────────────────────────────────────────────────────────
    'Organic - Amines': [
        { type: 'youtube', title: 'Amines JEE Full | PW', videoId: '4Vf7HFOHoOQ', url: 'https://www.youtube.com/watch?v=4Vf7HFOHoOQ', duration: '1h 40m' },
        { type: 'pdf', title: 'NCERT Ch 13 - Amines', url: 'https://ncert.nic.in/textbook/pdf/lech113.pdf' },
    ],
    'Chemical Equilibrium': [
        { type: 'youtube', title: 'Chemical Equilibrium | Vedantu', videoId: 'baPVFVOmPJo', url: 'https://www.youtube.com/watch?v=baPVFVOmPJo', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Ch 7 - Equilibrium', url: 'https://ncert.nic.in/textbook/pdf/kech107.pdf' },
    ],
    'Atomic Structure': [
        { type: 'youtube', title: 'Atomic Structure | PW', videoId: 'GuFQEOzFOgA', url: 'https://www.youtube.com/watch?v=GuFQEOzFOgA', duration: '1h 50m' },
        { type: 'pdf', title: 'NCERT Ch 2 - Structure of Atom', url: 'https://ncert.nic.in/textbook/pdf/kech102.pdf' },
    ],
    'Electrochemistry': [
        { type: 'youtube', title: 'Electrochemistry | JEE Mains', videoId: 'lQ6FchqEuHc', url: 'https://www.youtube.com/watch?v=lQ6FchqEuHc', duration: '2h 20m' },
        { type: 'pdf', title: 'NCERT Ch 3 - Electrochemistry', url: 'https://ncert.nic.in/textbook/pdf/lech103.pdf' },
    ],

    // ── MATHEMATICS ───────────────────────────────────────────────────────────
    'Integration': [
        { type: 'youtube', title: 'Integration JEE | Complete', videoId: 'rfG8ce4nNh0', url: 'https://www.youtube.com/watch?v=rfG8ce4nNh0', duration: '2h 30m' },
        { type: 'pdf', title: 'NCERT Ch 7 - Integrals', url: 'https://ncert.nic.in/textbook/pdf/lemh107.pdf' },
    ],
    'Differentiation': [
        { type: 'youtube', title: 'Differentiation | JEE Maths', videoId: 'N2PpRnFqnqY', url: 'https://www.youtube.com/watch?v=N2PpRnFqnqY', duration: '1h 45m' },
        { type: 'pdf', title: 'NCERT Ch 5 - Continuity', url: 'https://ncert.nic.in/textbook/pdf/lemh105.pdf' },
    ],
    'Probability': [
        { type: 'youtube', title: 'Probability | JEE Mains', videoId: 'uzkc-qNVoOk', url: 'https://www.youtube.com/watch?v=uzkc-qNVoOk', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Ch 13 - Probability', url: 'https://ncert.nic.in/textbook/pdf/lemh113.pdf' },
    ],

    // ── BIOLOGY ───────────────────────────────────────────────────────────────
    'Cell Biology': [
        { type: 'youtube', title: 'Cell: Unit of Life | NEET PW', videoId: 'yWQMaI0_KXM', url: 'https://www.youtube.com/watch?v=yWQMaI0_KXM', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Ch 8 - Cell Biology', url: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf' },
    ],
    'Genetics': [
        { type: 'youtube', title: 'Genetics | NEET Biology', videoId: 'CBezq1fFUEA', url: 'https://www.youtube.com/watch?v=CBezq1fFUEA', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Ch 5 - Genetics', url: 'https://ncert.nic.in/textbook/pdf/lebo105.pdf' },
    ],
    'Human Physiology': [
        { type: 'youtube', title: 'Human Physiology | NEET PW', videoId: 'H0K6Gzn0B4c', url: 'https://www.youtube.com/watch?v=H0K6Gzn0B4c', duration: '3h 00m' },
        { type: 'pdf', title: 'NCERT Ch 16 - Digestion', url: 'https://ncert.nic.in/textbook/pdf/kebo116.pdf' },
    ],
};

const DEFAULT_RESOURCES = (topic) => [
    { type: 'youtube', title: `${topic} Full Chapter`, videoId: null, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' complete chapter')}`, duration: '~2 hr' },
    { type: 'pdf', title: `${topic} NCERT PDF Scan`, url: `https://duckduckgo.com/?q=${encodeURIComponent(topic + ' ncert pdf download')}` },
];

const getResourcesForTopics = (topics) =>
    topics.map(topic => ({
        topic,
        resources: resourceBank[topic] || DEFAULT_RESOURCES(topic),
    }));

module.exports = { resourceBank, getResourcesForTopics };
