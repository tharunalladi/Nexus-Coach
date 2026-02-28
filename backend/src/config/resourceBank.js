// ─── Curated Study Resource Bank ─────────────────
// videoId = YouTube video ID for in-site embedding (optional)
// url = fallback external link

const resourceBank = {
    'Physics': {
        'Rotational Mechanics': [
            { type: 'youtube', title: 'Rotational Motion One Shot | JEE Mains', videoId: 'jndl061NUl4', url: 'https://www.youtube.com/live/jndl061NUl4', duration: '3h 15m' },
            { type: 'pdf', title: 'NCERT Ch 7 - System of Particles', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/physics/chapter-7/' },
        ],
        'Electrostatics': [
            { type: 'youtube', title: 'Electrostatics One Shot | JEE Mains', videoId: 'l3hw6Bk7Dkg', url: 'https://www.youtube.com/watch?v=l3hw6Bk7Dkg', duration: '2h 10m' },
            { type: 'pdf', title: 'NCERT Ch 1 - Electric Charges', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/physics/chapter-1/' },
        ],
        'Wave Optics': [
            { type: 'youtube', title: 'Wave Optics Full One Shot | JEE', videoId: 'p_Xm9UJi2t4', url: 'https://www.youtube.com/live/p_Xm9UJi2t4', duration: '3h 30m' },
            { type: 'pdf', title: 'NCERT Ch 10 - Wave Optics', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/physics/chapter-10/' },
        ],
        'Thermodynamics': [
            { type: 'youtube', title: 'Thermodynamics Laws | PW', videoId: 'Xb05CaG7TsQ', url: 'https://www.youtube.com/watch?v=Xb05CaG7TsQ', duration: '1h 45m' },
            { type: 'pdf', title: 'NCERT Ch 12 - Thermodynamics', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/physics/chapter-12/' },
        ],
        'Kinematics': [
            { type: 'youtube', title: 'Kinematics 1D | Physics Wallah', videoId: 'R2Jf0-Rl4WA', url: 'https://www.youtube.com/watch?v=R2Jf0-Rl4WA', duration: '1h 15m' },
            { type: 'pdf', title: 'NCERT Ch 3 - Motion in Straight Line', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/physics/chapter-3/' },
        ],
        'Current Electricity': [
            { type: 'youtube', title: 'Current Electricity | PW', videoId: '0UNNb5HkAOQ', url: 'https://www.youtube.com/watch?v=0UNNb5HkAOQ', duration: '2h 05m' },
            { type: 'pdf', title: 'NCERT Ch 3 - Current Electricity', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/physics/chapter-3/' },
        ],
        'Magnetism': [
            { type: 'youtube', title: 'Moving Charges | Vedantu', videoId: 'YmNkqEyFEtw', url: 'https://www.youtube.com/watch?v=YmNkqEyFEtw', duration: '1h 30m' },
            { type: 'pdf', title: 'NCERT Ch 4 - Moving Charges', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/physics/chapter-4/' },
        ],
    },
    'Chemistry': {
        'Organic - Amines': [
            { type: 'youtube', title: 'Amines JEE Full | PW', videoId: '4Vf7HFOHoOQ', url: 'https://www.youtube.com/watch?v=4Vf7HFOHoOQ', duration: '1h 40m' },
            { type: 'pdf', title: 'NCERT Ch 13 - Amines', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/chemistry/chapter-13/' },
        ],
        'Chemical Equilibrium': [
            { type: 'youtube', title: 'Chemical Equilibrium One Shot | JEE Mains', videoId: 'i0j0qqhkfDk', url: 'https://www.youtube.com/live/i0j0qqhkfDk', duration: '3h 30m' },
            { type: 'pdf', title: 'NCERT Ch 7 - Equilibrium', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/chemistry/chapter-7/' },
        ],
        'Atomic Structure': [
            { type: 'youtube', title: 'Atomic Structure One Shot | PW', videoId: 'qOQnReQ0i4o', url: 'https://www.youtube.com/live/qOQnReQ0i4o', duration: '3h 15m' },
            { type: 'pdf', title: 'NCERT Ch 2 - Structure of Atom', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/chemistry/chapter-2/' },
        ],
        'Electrochemistry': [
            { type: 'youtube', title: 'Electrochemistry One Shot | JEE Mains', videoId: 'cwux4cPB2qI', url: 'https://www.youtube.com/live/cwux4cPB2qI', duration: '4h 00m' },
            { type: 'pdf', title: 'NCERT Ch 3 - Electrochemistry', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/chemistry/chapter-3/' },
        ],
    },
    'Mathematics': {
        'Integration': [
            { type: 'youtube', title: 'Integration One Shot | JEE Maths', videoId: 'yY2oUKVAkdY', url: 'https://www.youtube.com/watch?v=yY2oUKVAkdY', duration: '4h 30m' },
            { type: 'pdf', title: 'NCERT Ch 7 - Integrals', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/maths/chapter-7/' },
        ],
        'Differentiation': [
            { type: 'youtube', title: 'Differentiation One Shot | JEE Maths', videoId: 'pkieEMk82Sk', url: 'https://www.youtube.com/live/pkieEMk82Sk', duration: '3h 45m' },
            { type: 'pdf', title: 'NCERT Ch 5 - Continuity', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/maths/chapter-5/' },
        ],
        'Probability': [
            { type: 'youtube', title: 'Probability | JEE Mains', videoId: 'uzkc-qNVoOk', url: 'https://www.youtube.com/watch?v=uzkc-qNVoOk', duration: '2h 00m' },
            { type: 'pdf', title: 'NCERT Ch 13 - Probability', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/maths/chapter-13/' },
        ],
    },
    'Biology': {
        'Cell Biology': [
            { type: 'youtube', title: 'Cell: Unit of Life | NEET PW', videoId: 'yWQMaI0_KXM', url: 'https://www.youtube.com/watch?v=yWQMaI0_KXM', duration: '1h 30m' },
            { type: 'pdf', title: 'NCERT Ch 8 - Cell Biology', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/biology/chapter-8/' },
        ],
        'Genetics': [
            { type: 'youtube', title: 'Genetics | NEET Biology', videoId: 'CBezq1fFUEA', url: 'https://www.youtube.com/watch?v=CBezq1fFUEA', duration: '2h 00m' },
            { type: 'pdf', title: 'NCERT Ch 5 - Genetics', url: 'https://www.tiwariacademy.com/ncert-solutions/class-12/biology/chapter-5/' },
        ],
        'Human Physiology': [
            { type: 'youtube', title: 'Human Physiology | NEET PW', videoId: 'H0K6Gzn0B4c', url: 'https://www.youtube.com/watch?v=H0K6Gzn0B4c', duration: '3h 00m' },
            { type: 'pdf', title: 'NCERT Ch 16 - Digestion', url: 'https://www.tiwariacademy.com/ncert-solutions/class-11/biology/chapter-16/' },
        ],
    }
};

const DEFAULT_RESOURCES = (topic) => [
    { type: 'youtube', title: `${topic} Full Chapter`, videoId: null, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' complete chapter')}`, duration: '~2 hr' },
    { type: 'pdf', title: `${topic} NCERT PDF Scan`, url: `https://duckduckgo.com/?q=${encodeURIComponent(topic + ' ncert pdf download')}` },
];

const getResourcesForTopics = (topics) =>
    topics.map(topic => {
        let subject = 'Other';
        let resources = DEFAULT_RESOURCES(topic);

        for (const [sub, bank] of Object.entries(resourceBank)) {
            if (bank[topic]) {
                subject = sub;
                resources = bank[topic];
                break;
            }
        }

        return { topic, subject, resources };
    });

module.exports = { resourceBank, getResourcesForTopics };
