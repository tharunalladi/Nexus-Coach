// ─── Curated Study Resource Bank with Real YouTube Video IDs ─────────────────
// videoId = YouTube video ID for in-site embedding
// url = fallback external link

const resourceBank = {
    // ── PHYSICS ───────────────────────────────────────────────────────────────
    'Rotational Mechanics': [
        { type: 'youtube', title: 'Rotational Motion - Complete Chapter | Physics Wallah', videoId: 'Z4QbGFimVLs', url: 'https://www.youtube.com/watch?v=Z4QbGFimVLs', duration: '1h 20m' },
        { type: 'youtube', title: 'Moment of Inertia Explained | Unacademy JEE', videoId: '6_6kqeViqek', url: 'https://www.youtube.com/watch?v=6_6kqeViqek', duration: '45 min' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 7 - System of Particles', url: 'https://ncert.nic.in/ncerts/l/keph107.pdf' },
    ],
    'Electrostatics': [
        { type: 'youtube', title: 'Electrostatics Full Chapter | Physics Wallah', videoId: 'l3hw6Bk7Dkg', url: 'https://www.youtube.com/watch?v=l3hw6Bk7Dkg', duration: '2h 10m' },
        { type: 'youtube', title: 'Gauss Law & Electric Field | Vedantu JEE', videoId: 'NiHoFAbsZ_Q', url: 'https://www.youtube.com/watch?v=NiHoFAbsZ_Q', duration: '55 min' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 1 - Electric Charges & Fields', url: 'https://ncert.nic.in/ncerts/l/leph101.pdf' },
    ],
    'Wave Optics': [
        { type: 'youtube', title: 'Wave Optics Full Chapter | JEE Mains', videoId: 'ryP7oER49e8', url: 'https://www.youtube.com/watch?v=ryP7oER49e8', duration: '1h 30m' },
        { type: 'youtube', title: "Young's Double Slit Experiment | Vedantu", videoId: 'Iuv6hY6zsd0', url: 'https://www.youtube.com/watch?v=Iuv6hY6zsd0', duration: '35 min' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 10 - Wave Optics', url: 'https://ncert.nic.in/ncerts/l/leph110.pdf' },
    ],
    'Thermodynamics': [
        { type: 'youtube', title: 'Thermodynamics - Laws & Processes | Physics Wallah', videoId: 'Xb05CaG7TsQ', url: 'https://www.youtube.com/watch?v=Xb05CaG7TsQ', duration: '1h 45m' },
        { type: 'youtube', title: 'First & Second Law of Thermodynamics | Khan Academy', videoId: '4i1MUWJoI0U', url: 'https://www.youtube.com/watch?v=4i1MUWJoI0U', duration: '20 min' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 12 - Thermodynamics', url: 'https://ncert.nic.in/ncerts/l/keph112.pdf' },
    ],
    'Kinematics': [
        { type: 'youtube', title: 'Kinematics 1D Full Chapter | Physics Wallah', videoId: 'R2Jf0-Rl4WA', url: 'https://www.youtube.com/watch?v=R2Jf0-Rl4WA', duration: '1h 15m' },
        { type: 'youtube', title: 'Projectile Motion | Khan Academy', videoId: 'aY8z2qO44WA', url: 'https://www.youtube.com/watch?v=aY8z2qO44WA', duration: '25 min' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 3 - Motion in Straight Line', url: 'https://ncert.nic.in/ncerts/l/keph103.pdf' },
    ],
    'Current Electricity': [
        { type: 'youtube', title: 'Current Electricity | Physics Wallah JEE', videoId: '0UNNb5HkAOQ', url: 'https://www.youtube.com/watch?v=0UNNb5HkAOQ', duration: '2h 05m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 3 - Current Electricity', url: 'https://ncert.nic.in/ncerts/l/leph103.pdf' },
    ],
    'Magnetism': [
        { type: 'youtube', title: 'Moving Charges & Magnetism | Vedantu JEE', videoId: 'YmNkqEyFEtw', url: 'https://www.youtube.com/watch?v=YmNkqEyFEtw', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 4 - Moving Charges & Magnetism', url: 'https://ncert.nic.in/ncerts/l/leph104.pdf' },
    ],
    'Modern Physics': [
        { type: 'youtube', title: 'Modern Physics - Atoms & Nuclei | Physics Wallah', videoId: 'CZFBjxLO9SI', url: 'https://www.youtube.com/watch?v=CZFBjxLO9SI', duration: '1h 20m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 12 - Atoms', url: 'https://ncert.nic.in/ncerts/l/leph112.pdf' },
    ],
    'Gravitation': [
        { type: 'youtube', title: "Gravitation - Newton's Law & Kepler's Laws | PW", videoId: 'IXgiq_Vwv94', url: 'https://www.youtube.com/watch?v=IXgiq_Vwv94', duration: '1h 10m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 8 - Gravitation', url: 'https://ncert.nic.in/ncerts/l/keph108.pdf' },
    ],

    // ── CHEMISTRY ─────────────────────────────────────────────────────────────
    'Organic - Amines': [
        { type: 'youtube', title: 'Amines Full Chapter JEE | Chemistry by PW', videoId: '4Vf7HFOHoOQ', url: 'https://www.youtube.com/watch?v=4Vf7HFOHoOQ', duration: '1h 40m' },
        { type: 'youtube', title: 'Basic Strength of Amines | Conceptual', videoId: 'XDfPKfDQ5aA', url: 'https://www.youtube.com/watch?v=XDfPKfDQ5aA', duration: '30 min' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 13 - Amines', url: 'https://ncert.nic.in/ncerts/l/lech113.pdf' },
    ],
    'Chemical Equilibrium': [
        { type: 'youtube', title: 'Chemical Equilibrium Full Chapter | Vedantu JEE', videoId: 'baPVFVOmPJo', url: 'https://www.youtube.com/watch?v=baPVFVOmPJo', duration: '2h 00m' },
        { type: 'youtube', title: "Le Chatelier's Principle | Khan Academy", videoId: 'PHRBC0sKMrA', url: 'https://www.youtube.com/watch?v=PHRBC0sKMrA', duration: '15 min' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 7 - Equilibrium', url: 'https://ncert.nic.in/ncerts/l/kech107.pdf' },
    ],
    'Atomic Structure': [
        { type: 'youtube', title: "Atomic Structure - Bohr's Model | Physics Wallah", videoId: 'GuFQEOzFOgA', url: 'https://www.youtube.com/watch?v=GuFQEOzFOgA', duration: '1h 50m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 2 - Structure of Atom', url: 'https://ncert.nic.in/ncerts/l/kech102.pdf' },
    ],
    'Electrochemistry': [
        { type: 'youtube', title: 'Electrochemistry Full Chapter | JEE Mains 2024', videoId: 'lQ6FchqEuHc', url: 'https://www.youtube.com/watch?v=lQ6FchqEuHc', duration: '2h 20m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 3 - Electrochemistry', url: 'https://ncert.nic.in/ncerts/l/lech103.pdf' },
    ],
    'Organic Reactions': [
        { type: 'youtube', title: 'Named Reactions Organic Chemistry | PW JEE', videoId: '5K3HEdQBIQ8', url: 'https://www.youtube.com/watch?v=5K3HEdQBIQ8', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 12 - Aldehydes & Ketones', url: 'https://ncert.nic.in/ncerts/l/lech112.pdf' },
    ],
    'Coordination Chemistry': [
        { type: 'youtube', title: 'Coordination Compounds | Vedantu JEE Chemistry', videoId: 'a7v8a-Bce4U', url: 'https://www.youtube.com/watch?v=a7v8a-Bce4U', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 9 - Coordination Compounds', url: 'https://ncert.nic.in/ncerts/l/lech109.pdf' },
    ],

    // ── MATHEMATICS ───────────────────────────────────────────────────────────
    'Integration': [
        { type: 'youtube', title: 'Integration Techniques | JEE Maths Complete', videoId: 'rfG8ce4nNh0', url: 'https://www.youtube.com/watch?v=rfG8ce4nNh0', duration: '2h 30m' },
        { type: 'youtube', title: 'Definite Integrals - All Properties | Vedantu', videoId: '0RdI3-8G4Fs', url: 'https://www.youtube.com/watch?v=0RdI3-8G4Fs', duration: '1h 00m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 7 - Integrals', url: 'https://ncert.nic.in/ncerts/l/lemh107.pdf' },
    ],
    'Differentiation': [
        { type: 'youtube', title: 'Differentiation Full Chapter | JEE Maths', videoId: 'N2PpRnFqnqY', url: 'https://www.youtube.com/watch?v=N2PpRnFqnqY', duration: '1h 45m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 5 - Continuity & Differentiability', url: 'https://ncert.nic.in/ncerts/l/lemh105.pdf' },
    ],
    'Probability': [
        { type: 'youtube', title: 'Probability Complete Chapter | JEE Mains', videoId: 'uzkc-qNVoOk', url: 'https://www.youtube.com/watch?v=uzkc-qNVoOk', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 13 - Probability', url: 'https://ncert.nic.in/ncerts/l/lemh113.pdf' },
    ],
    'Matrices': [
        { type: 'youtube', title: 'Matrices & Determinants | JEE Mains Complete', videoId: 'OMbSb_04xdg', url: 'https://www.youtube.com/watch?v=OMbSb_04xdg', duration: '2h 15m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 3 - Matrices', url: 'https://ncert.nic.in/ncerts/l/lemh103.pdf' },
    ],
    'Complex Numbers': [
        { type: 'youtube', title: 'Complex Numbers Full Chapter | JEE Maths PW', videoId: 'T647CGsuOVU', url: 'https://www.youtube.com/watch?v=T647CGsuOVU', duration: '1h 50m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 5 - Complex Numbers', url: 'https://ncert.nic.in/ncerts/l/kemh105.pdf' },
    ],
    'Trigonometry': [
        { type: 'youtube', title: 'Trigonometric Functions JEE | Complete', videoId: 'bXVDnMa3KcE', url: 'https://www.youtube.com/watch?v=bXVDnMa3KcE', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 3 - Trigonometric Functions', url: 'https://ncert.nic.in/ncerts/l/kemh103.pdf' },
    ],
    'Vectors': [
        { type: 'youtube', title: 'Vectors & 3D Geometry | JEE Maths Complete', videoId: 'ml4NSzCQobk', url: 'https://www.youtube.com/watch?v=ml4NSzCQobk', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 10 - Vector Algebra', url: 'https://ncert.nic.in/ncerts/l/lemh110.pdf' },
    ],

    // ── BIOLOGY ───────────────────────────────────────────────────────────────
    'Cell Biology': [
        { type: 'youtube', title: 'Cell: The Unit of Life | NEET Biology PW', videoId: 'yWQMaI0_KXM', url: 'https://www.youtube.com/watch?v=yWQMaI0_KXM', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 8 - Cell: The Unit of Life', url: 'https://ncert.nic.in/ncerts/l/kebo108.pdf' },
    ],
    'Genetics': [
        { type: 'youtube', title: 'Principles of Inheritance | NEET Biology', videoId: 'CBezq1fFUEA', url: 'https://www.youtube.com/watch?v=CBezq1fFUEA', duration: '2h 00m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 5 - Principles of Inheritance', url: 'https://ncert.nic.in/ncerts/l/lebo105.pdf' },
    ],
    'Plant Biology': [
        { type: 'youtube', title: 'Photosynthesis & Plant Physiology | NEET', videoId: 'xfmL6GjqEAk', url: 'https://www.youtube.com/watch?v=xfmL6GjqEAk', duration: '1h 40m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 13 - Photosynthesis', url: 'https://ncert.nic.in/ncerts/l/kebo113.pdf' },
    ],
    'Human Physiology': [
        { type: 'youtube', title: 'Human Physiology All Systems | NEET PW', videoId: 'H0K6Gzn0B4c', url: 'https://www.youtube.com/watch?v=H0K6Gzn0B4c', duration: '3h 00m' },
        { type: 'pdf', title: 'NCERT Class 11 Ch 16 - Digestion & Absorption', url: 'https://ncert.nic.in/ncerts/l/kebo116.pdf' },
    ],
    'Ecology': [
        { type: 'youtube', title: 'Ecology & Environment | NEET Biology Complete', videoId: 'R09gVjNTepU', url: 'https://www.youtube.com/watch?v=R09gVjNTepU', duration: '1h 30m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 13 - Organisms & Populations', url: 'https://ncert.nic.in/ncerts/l/lebo113.pdf' },
    ],
    'Biotechnology': [
        { type: 'youtube', title: 'Biotechnology Principles & Processes | NEET', videoId: 'HQpfwwyhAEs', url: 'https://www.youtube.com/watch?v=HQpfwwyhAEs', duration: '1h 45m' },
        { type: 'pdf', title: 'NCERT Class 12 Ch 11 - Biotechnology Principles', url: 'https://ncert.nic.in/ncerts/l/lebo111.pdf' },
    ],
};

// Dynamic fallback for topics not in bank
const DEFAULT_RESOURCES = (topic) => [
    { type: 'youtube', title: `${topic} - Full Chapter (JEE/NEET)`, videoId: null, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' JEE NEET complete chapter')}`, duration: '~2 hr' },
    { type: 'youtube', title: `${topic} - Quick Revision`, videoId: null, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' JEE NEET revision formulas')}`, duration: '~20 min' },
];

const getResourcesForTopics = (topics) =>
    topics.map(topic => ({
        topic,
        resources: resourceBank[topic] || DEFAULT_RESOURCES(topic),
    }));

module.exports = { resourceBank, getResourcesForTopics };
