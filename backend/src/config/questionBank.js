// ─── Question Bank ────────────────────────────────────────────────────────────
// Each question: { id, subject, topic, question, options: [A,B,C,D], answer: 'A'|'B'|'C'|'D', explanation }

const questionBank = {
    JEE: {
        Physics: [
            { id: 'jee-phy-1', subject: 'Physics', topic: 'Kinematics', question: 'A ball is thrown vertically upward with a velocity of 20 m/s. The maximum height reached is (g = 10 m/s²):', options: ['10 m', '20 m', '40 m', '5 m'], answer: 'B', explanation: 'h = v²/2g = 400/20 = 20 m' },
            { id: 'jee-phy-2', subject: 'Physics', topic: 'Rotational Mechanics', question: 'The moment of inertia of a solid sphere about its diameter is:', options: ['(2/3)MR²', '(2/5)MR²', 'MR²', '(1/2)MR²'], answer: 'B', explanation: 'For solid sphere about diameter: I = (2/5)MR²' },
            { id: 'jee-phy-3', subject: 'Physics', topic: 'Electrostatics', question: 'The electric field inside a hollow conducting sphere is:', options: ['Maximum at center', 'Zero everywhere', 'Same as outside', 'Depends on charge'], answer: 'B', explanation: 'Gauss law: E = 0 inside a conductor' },
            { id: 'jee-phy-4', subject: 'Physics', topic: 'Wave Optics', question: 'In Young\'s double slit experiment, when the slit separation is doubled the fringe width:', options: ['Doubles', 'Halves', 'Remains same', 'Quadruples'], answer: 'B', explanation: 'β = λD/d, so if d doubles, β halves' },
            { id: 'jee-phy-5', subject: 'Physics', topic: 'Thermodynamics', question: 'For an adiabatic process, which of the following is zero?', options: ['Work done', 'Change in internal energy', 'Heat exchange', 'Change in temperature'], answer: 'C', explanation: 'In adiabatic process, Q = 0' },
            { id: 'jee-phy-6', subject: 'Physics', topic: 'Current Electricity', question: 'Three resistors of 1Ω, 2Ω, 3Ω are connected in parallel. The equivalent resistance is:', options: ['6Ω', '1Ω', '6/11 Ω', '11/6 Ω'], answer: 'C', explanation: '1/R = 1+1/2+1/3 = 11/6, so R = 6/11 Ω' },
            { id: 'jee-phy-7', subject: 'Physics', topic: 'Gravitation', question: 'At what height from surface of earth is g equal to g/4? (R = radius of earth):', options: ['R', '2R', 'R/2', '4R'], answer: 'A', explanation: 'g at height h = g(R/(R+h))². For g/4: R+h = 2R, h = R' },
            { id: 'jee-phy-8', subject: 'Physics', topic: 'Magnetism', question: 'A proton moves with velocity v perpendicular to a magnetic field B. The radius of circular path is:', options: ['mv/qB', 'qB/mv', 'qv/mB', 'mB/qv'], answer: 'A', explanation: 'Lorentz force = centripetal force: qvB = mv²/r, r = mv/qB' },
            { id: 'jee-phy-9', subject: 'Physics', topic: 'Modern Physics', question: 'The de Broglie wavelength of a particle is inversely proportional to its:', options: ['Mass', 'Velocity', 'Momentum', 'Energy'], answer: 'C', explanation: 'λ = h/p where p is momentum' },
            { id: 'jee-phy-10', subject: 'Physics', topic: 'Optics', question: 'A lens has focal length +20cm. Its power is:', options: ['+5D', '-5D', '+0.05D', '-0.05D'], answer: 'A', explanation: 'P = 1/f(meters) = 1/0.2 = +5D' },
        ],
        Chemistry: [
            { id: 'jee-chem-1', subject: 'Chemistry', topic: 'Organic - Amines', question: 'The correct order of basic strength in aqueous solution for methyl amines is:', options: ['NH3 > MeNH2 > Me2NH > Me3N', 'Me2NH > MeNH2 > Me3N > NH3', 'Me3N > Me2NH > MeNH2 > NH3', 'Me2NH > Me3N > MeNH2 > NH3'], answer: 'B', explanation: 'In aq solution: 2° > 1° > 3° > NH3 due to hydration effects' },
            { id: 'jee-chem-2', subject: 'Chemistry', topic: 'Atomic Structure', question: 'The number of radial nodes for a 3p orbital is:', options: ['0', '1', '2', '3'], answer: 'B', explanation: 'Radial nodes = n - l - 1 = 3 - 1 - 1 = 1' },
            { id: 'jee-chem-3', subject: 'Chemistry', topic: 'Chemical Equilibrium', question: 'If Kp > Kc for a reaction, then:', options: ['Δn > 0', 'Δn < 0', 'Δn = 0', 'Cannot determine'], answer: 'A', explanation: 'Kp = Kc(RT)^Δn; Kp > Kc means (RT)^Δn > 1, so Δn > 0' },
            { id: 'jee-chem-4', subject: 'Chemistry', topic: 'Electrochemistry', question: 'Standard EMF of a cell is 0.34V. ΔG° is (1F = 96500 C/mol):', options: ['−65,620 J/mol', '+65,620 J/mol', '−32,810 J/mol', '+32,810 J/mol'], answer: 'A', explanation: 'ΔG° = −nFE° = −2×96500×0.34 = −65,620 J/mol' },
            { id: 'jee-chem-5', subject: 'Chemistry', topic: 'Coordination Chemistry', question: 'The IUPAC name of [Pt(NH3)2Cl2] is:', options: ['Platinum diammine dichloride', 'Diamminedichloroplatinum(II)', 'Dichlorodiammineplatinum', 'Platinous ammine chloride'], answer: 'B', explanation: 'Ligands listed alphabetically: ammine, chloro; then metal with oxidation state' },
            { id: 'jee-chem-6', subject: 'Chemistry', topic: 'Thermodynamics', question: 'For a spontaneous process at constant T and P:', options: ['ΔG > 0', 'ΔG < 0', 'ΔG = 0', 'ΔH < 0'], answer: 'B', explanation: 'Spontaneous: ΔG = ΔH − TΔS < 0' },
            { id: 'jee-chem-7', subject: 'Chemistry', topic: 'Organic Reactions', question: 'In SN2 reaction, the rate depends on:', options: ['Only substrate', 'Only nucleophile', 'Both substrate and nucleophile', 'Neither'], answer: 'C', explanation: 'SN2 is bimolecular: rate = k[substrate][nucleophile]' },
            { id: 'jee-chem-8', subject: 'Chemistry', topic: 'p-Block Elements', question: 'Which of the following is the strongest oxidizing acid?', options: ['HClO', 'HClO2', 'HClO3', 'HClO4'], answer: 'A', explanation: 'Oxidizing power decreases with increasing oxidation state of Cl' },
            { id: 'jee-chem-9', subject: 'Chemistry', topic: 'Surface Chemistry', question: 'Adsorption of a gas on solid surface is generally:', options: ['Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic'], answer: 'B', explanation: 'Adsorption releases energy — it is exothermic (negative ΔH)' },
            { id: 'jee-chem-10', subject: 'Chemistry', topic: 'Polymers', question: 'Nylon-6,6 is formed by the condensation of:', options: ['Adipic acid + hexamethylenediamine', 'Caprolactam only', 'Acrylic acid + styrene', 'Ethylene only'], answer: 'A', explanation: 'Nylon-6,6 = adipic acid (6C) + hexamethylenediamine (6C) condensation' },
        ],
        Mathematics: [
            { id: 'jee-math-1', subject: 'Mathematics', topic: 'Integration', question: '∫ sin(x)cos(x) dx equals:', options: ['sin²(x)/2 + C', 'cos²(x)/2 + C', '−cos(2x)/4 + C', 'sin(2x)/4 + C'], answer: 'D', explanation: 'sin(x)cos(x) = sin(2x)/2, so ∫ = −cos(2x)/4 + C, or sin²(x)/2 + C (both are equal)' },
            { id: 'jee-math-2', subject: 'Mathematics', topic: 'Differentiation', question: 'If f(x) = x^x, then f\'(x) is:', options: ['x^x', 'x^x ln(x)', 'x^x (1 + ln x)', 'x^(x-1)'], answer: 'C', explanation: 'Taking ln both sides: ln f = x ln x; f\'/f = ln x + 1; f\' = x^x(1 + ln x)' },
            { id: 'jee-math-3', subject: 'Mathematics', topic: 'Limits', question: 'lim(x→0) sin(x)/x equals:', options: ['0', '1', '∞', 'Undefined'], answer: 'B', explanation: 'Standard limit: lim(x→0) sin(x)/x = 1' },
            { id: 'jee-math-4', subject: 'Mathematics', topic: 'Matrices', question: 'For a 3×3 matrix A, if det(A) = 5, then det(3A) equals:', options: ['15', '45', '135', '5'], answer: 'C', explanation: 'det(kA) = k^n det(A) for n×n matrix. det(3A) = 3³ × 5 = 135' },
            { id: 'jee-math-5', subject: 'Mathematics', topic: 'Probability', question: 'P(A∪B) = P(A) + P(B) − P(A∩B). If P(A)=0.4, P(B)=0.5, P(A∩B)=0.2, then P(A∪B) is:', options: ['0.3', '0.7', '0.9', '1.1'], answer: 'B', explanation: 'P(A∪B) = 0.4 + 0.5 − 0.2 = 0.7' },
            { id: 'jee-math-6', subject: 'Mathematics', topic: 'Coordinate Geometry', question: 'The distance between parallel lines 3x + 4y = 5 and 3x + 4y = 10 is:', options: ['1', '5', '2', '3'], answer: 'A', explanation: 'd = |c1-c2|/√(a²+b²) = |5-10|/√(9+16) = 5/5 = 1' },
            { id: 'jee-math-7', subject: 'Mathematics', topic: 'Complex Numbers', question: 'If z = 3 + 4i, then |z| is:', options: ['7', '5', '25', '1'], answer: 'B', explanation: '|z| = √(3² + 4²) = √(9+16) = √25 = 5' },
            { id: 'jee-math-8', subject: 'Mathematics', topic: 'Sequences & Series', question: 'Sum of first n terms of AP: a + (a+d) + (a+2d) + ... is:', options: ['n/2(2a + (n-1)d)', 'n(a + l)/2', 'Both A and B', 'na + nd'], answer: 'C', explanation: 'Both formulas are equivalent: Sn = n/2(2a+(n-1)d) = n(a+l)/2 where l is last term' },
            { id: 'jee-math-9', subject: 'Mathematics', topic: 'Trigonometry', question: 'sin(75°) equals:', options: ['(√6+√2)/4', '(√6-√2)/4', '(√3+1)/2√2', 'Both A and C'], answer: 'D', explanation: 'sin(75°) = sin(45°+30°) = (√6+√2)/4 = (√3+1)/2√2' },
            { id: 'jee-math-10', subject: 'Mathematics', topic: 'Vectors', question: 'If a⃗ = i+2j+3k and b⃗ = 2i+j+k, then a⃗·b⃗ is:', options: ['0', '7', '14', '6'], answer: 'B', explanation: 'a⃗·b⃗ = (1)(2)+(2)(1)+(3)(1) = 2+2+3 = 7' },
        ],
        Biology: [],
    },
    NEET: {
        Physics: [
            { id: 'neet-phy-1', subject: 'Physics', topic: 'Laws of Motion', question: 'A body of mass 5 kg is acted upon by a net force of 20 N. Its acceleration is:', options: ['2 m/s²', '4 m/s²', '100 m/s²', '0.25 m/s²'], answer: 'B', explanation: 'F = ma; a = F/m = 20/5 = 4 m/s²' },
            { id: 'neet-phy-2', subject: 'Physics', topic: 'Work & Energy', question: 'A moving body has kinetic energy 50J. It takes 5s to stop. Average power dissipated is:', options: ['10 W', '250 W', '0 W', '5 W'], answer: 'A', explanation: 'P = Energy/time = 50/5 = 10 W' },
            { id: 'neet-phy-3', subject: 'Physics', topic: 'Fluid Mechanics', question: 'According to Bernoulli\'s principle, as fluid velocity increases:', options: ['Pressure increases', 'Pressure decreases', 'Pressure stays same', 'Temperature drops'], answer: 'B', explanation: 'P + ½ρv² + ρgh = constant. Higher v → lower P' },
            { id: 'neet-phy-4', subject: 'Physics', topic: 'Heat Transfer', question: 'Stefan-Boltzmann law states that power radiated is proportional to:', options: ['T', 'T²', 'T³', 'T⁴'], answer: 'D', explanation: 'P = σT⁴, Stefan-Boltzmann law' },
            { id: 'neet-phy-5', subject: 'Physics', topic: 'Waves', question: 'The speed of sound in a medium depends on:', options: ['Frequency', 'Amplitude', 'Wavelength', 'Elastic properties of medium'], answer: 'D', explanation: 'v = √(E/ρ), depends on elasticity and density' },
            { id: 'neet-phy-6', subject: 'Physics', topic: 'Optics', question: 'A concave mirror has focal length 15 cm. An object at 30 cm gives image at:', options: ['30 cm (real)', '60 cm (real)', '∞', '15 cm (virtual)'], answer: 'A', explanation: '1/v + 1/u = 1/f; 1/v = 1/(-15) - 1/(-30) = -1/30; v = -30 cm' },
            { id: 'neet-phy-7', subject: 'Physics', topic: 'Nuclear Physics', question: 'The half-life of a radioactive element is 10 days. After 30 days, fraction remaining is:', options: ['1/2', '1/4', '1/8', '1/16'], answer: 'C', explanation: '30 days = 3 half-lives. Remaining = (1/2)³ = 1/8' },
            { id: 'neet-phy-8', subject: 'Physics', topic: 'Semiconductors', question: 'In a p-n junction diode, forward bias means:', options: ['p-side connected to negative terminal', 'n-side connected to positive terminal', 'p-side connected to positive terminal', 'No connection'], answer: 'C', explanation: 'Forward bias: p-side → +ve terminal, n-side → -ve terminal' },
            { id: 'neet-phy-9', subject: 'Physics', topic: 'Electrostatics', question: 'Capacitance of a parallel plate capacitor is doubled when:', options: ['Plate area is halved', 'Distance is doubled', 'Distance is halved', 'Voltage is doubled'], answer: 'C', explanation: 'C = ε₀A/d. If d halves, C doubles' },
            { id: 'neet-phy-10', subject: 'Physics', topic: 'Circular Motion', question: 'For uniform circular motion, which quantity is constant?', options: ['Velocity', 'Acceleration', 'Speed', 'Displacement'], answer: 'C', explanation: 'Speed is constant; velocity (direction) and acceleration change' },
        ],
        Chemistry: [
            { id: 'neet-chem-1', subject: 'Chemistry', topic: 'Mole Concept', question: 'Number of atoms in 1 mole of O₂:', options: ['6.022×10²³', '1.204×10²⁴', '3.011×10²³', '2×6.022×10²³'], answer: 'B', explanation: '1 mol O₂ = 2 mol O atoms = 2 × 6.022×10²³ = 1.204×10²⁴' },
            { id: 'neet-chem-2', subject: 'Chemistry', topic: 'Chemical Bonding', question: 'The hybridization of carbon in CO₂ is:', options: ['sp', 'sp²', 'sp³', 'dsp²'], answer: 'A', explanation: 'CO₂ is linear: O=C=O, C has sp hybridization with 2 pi bonds' },
            { id: 'neet-chem-3', subject: 'Chemistry', topic: 'Redox Reactions', question: 'Oxidation state of Cr in K₂Cr₂O₇ is:', options: ['+3', '+6', '+7', '+2'], answer: 'B', explanation: '2(+1) + 2x + 7(-2) = 0; 2x = 12; x = +6' },
            { id: 'neet-chem-4', subject: 'Chemistry', topic: 'Organic - Alcohols', question: 'Which of the following is a primary alcohol?', options: ['(CH₃)₃COH', 'CH₃CH(OH)CH₃', 'CH₃CH₂OH', '(CH₃)₂CHOH'], answer: 'C', explanation: 'Ethanol CH₃CH₂OH: OH attached to carbon bonded to only one other C = primary' },
            { id: 'neet-chem-5', subject: 'Chemistry', topic: 'Biomolecules', question: 'The monomer unit of starch is:', options: ['Fructose', 'Glucose', 'Galactose', 'Sucrose'], answer: 'B', explanation: 'Starch is a polysaccharide of α-D-glucose units' },
            { id: 'neet-chem-6', subject: 'Chemistry', topic: 'Solutions', question: 'Osmotic pressure π = CRT refers to:', options: ['Dalton\'s law', 'Raoult\'s law', 'Van\'t Hoff law', 'Henry\'s law'], answer: 'C', explanation: 'π = iCRT is the Van\'t Hoff equation for osmotic pressure' },
            { id: 'neet-chem-7', subject: 'Chemistry', topic: 'Periodic Table', question: 'Which element has the highest electronegativity?', options: ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'], answer: 'C', explanation: 'Fluorine has the highest electronegativity (3.98 on Pauling scale)' },
            { id: 'neet-chem-8', subject: 'Chemistry', topic: 'Acid-Base', question: 'Buffer solution resists change in:', options: ['Temperature', 'pH', 'Concentration', 'Density'], answer: 'B', explanation: 'Buffer solutions resist change in pH upon addition of small amounts of acid/base' },
            { id: 'neet-chem-9', subject: 'Chemistry', topic: 'Organic - Benzene', question: 'The reaction of benzene with Cl₂ in presence of FeCl₃ is:', options: ['Addition', 'Nucleophilic substitution', 'Electrophilic substitution', 'Elimination'], answer: 'C', explanation: 'Benzene undergoes electrophilic aromatic substitution (EAS)' },
            { id: 'neet-chem-10', subject: 'Chemistry', topic: 'Environmental Chemistry', question: 'Which gas is primarily responsible for ozone layer depletion?', options: ['CO₂', 'CO', 'CFCs', 'SO₂'], answer: 'C', explanation: 'Chlorofluorocarbons (CFCs) release Cl radicals that catalyze ozone depletion' },
        ],
        Biology: [
            { id: 'neet-bio-1', subject: 'Biology', topic: 'Cell Biology', question: 'The powerhouse of the cell is:', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], answer: 'B', explanation: 'Mitochondria produce ATP via cellular respiration — hence "powerhouse"' },
            { id: 'neet-bio-2', subject: 'Biology', topic: 'Genetics', question: 'Mendel\'s law of segregation states:', options: ['Linked genes separate', 'Alleles separate during gamete formation', 'All traits blend', 'Dominant traits appear always'], answer: 'B', explanation: 'During meiosis, paired alleles segregate into separate gametes' },
            { id: 'neet-bio-3', subject: 'Biology', topic: 'Plant Biology', question: 'Which pigment is responsible for photosynthesis?', options: ['Haemoglobin', 'Chlorophyll', 'Carotene', 'Melanin'], answer: 'B', explanation: 'Chlorophyll absorbs light energy and drives photosynthesis' },
            { id: 'neet-bio-4', subject: 'Biology', topic: 'Human Physiology', question: 'Which blood group is the universal donor?', options: ['A', 'B', 'AB', 'O'], answer: 'D', explanation: 'Blood group O has no A or B antigens, so it can be donated to all groups' },
            { id: 'neet-bio-5', subject: 'Biology', topic: 'Ecology', question: 'Pyramid of energy is always:', options: ['Inverted', 'Upright', 'Spindle-shaped', 'Can be any shape'], answer: 'B', explanation: 'Energy decreases at each trophic level — always upright pyramid' },
            { id: 'neet-bio-6', subject: 'Biology', topic: 'Reproduction', question: 'Self-pollination is a feature of which plant?', options: ['Maize', 'Wheat', 'Papaya', 'Cucumber'], answer: 'B', explanation: 'Wheat is a classic example of self-pollinating (autogamous) plant' },
            { id: 'neet-bio-7', subject: 'Biology', topic: 'Biotechnology', question: 'Restriction enzymes cut DNA at:', options: ['Random sites', 'Specific palindromic sequences', 'Coding regions only', 'Promoter regions'], answer: 'B', explanation: 'Restriction enzymes (endonucleases) recognize and cut specific palindromic DNA sequences' },
            { id: 'neet-bio-8', subject: 'Biology', topic: 'Nervous System', question: 'The functional unit of the nervous system is:', options: ['Nephron', 'Neuron', 'Synapse', 'Node of Ranvier'], answer: 'B', explanation: 'Neuron is the structural and functional unit of the nervous system' },
            { id: 'neet-bio-9', subject: 'Biology', topic: 'Evolution', question: 'Natural selection was proposed by:', options: ['Mendel', 'Darwin', 'Lamarck', 'Watson'], answer: 'B', explanation: 'Charles Darwin proposed natural selection in "On the Origin of Species" (1859)' },
            { id: 'neet-bio-10', subject: 'Biology', topic: 'Digestion', question: 'Pepsin enzyme works best in:', options: ['Alkaline medium', 'Neutral medium', 'Acidic medium', 'Any medium'], answer: 'C', explanation: 'Pepsin (protease in stomach) functions at pH 1.5-2.5 (acidic)' },
        ],
        Mathematics: [],
    },
    EAMCET: {
        Physics: [
            { id: 'eam-phy-1', subject: 'Physics', topic: 'Units & Dimensions', question: 'Dimensional formula for pressure is:', options: ['[MLT⁻²]', '[ML⁻¹T⁻²]', '[ML²T⁻²]', '[M⁰L⁰T⁰]'], answer: 'B', explanation: 'Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]' },
            { id: 'eam-phy-2', subject: 'Physics', topic: 'Kinematics', question: 'A projectile has maximum range when angle of projection is:', options: ['30°', '45°', '60°', '90°'], answer: 'B', explanation: 'Maximum range R = v²sin(2θ)/g is max when 2θ = 90°, θ = 45°' },
            { id: 'eam-phy-3', subject: 'Physics', topic: 'Work & Energy', question: 'If velocity is doubled, kinetic energy becomes:', options: ['Double', 'Four times', 'Half', 'Same'], answer: 'B', explanation: 'KE = ½mv². If v → 2v, KE → ½m(2v)² = 4 × ½mv²' },
            { id: 'eam-phy-4', subject: 'Physics', topic: 'Current Electricity', question: 'Ohm\'s law states V = IR. If R is doubled and V is constant, current:', options: ['Doubles', 'Halves', 'Remains same', 'Quadruples'], answer: 'B', explanation: 'I = V/R. If R doubles, I = V/2R = half' },
            { id: 'eam-phy-5', subject: 'Physics', topic: 'Magnetism', question: 'The SI unit of magnetic flux is:', options: ['Tesla', 'Weber', 'Henry', 'Gauss'], answer: 'B', explanation: 'Magnetic flux Φ = B·A, unit = Weber (Wb) = Tesla·m²' },
            { id: 'eam-phy-6', subject: 'Physics', topic: 'Optics', question: 'Lens maker\'s formula relates focal length to:', options: ['Only radius of curvature', 'Refractive index and radii of curvature', 'Only refractive index', 'Material density'], answer: 'B', explanation: '1/f = (n-1)(1/R₁ - 1/R₂) involves both refractive index and radii' },
            { id: 'eam-phy-7', subject: 'Physics', topic: 'Heat & Thermodynamics', question: 'CP − CV for an ideal gas equals:', options: ['R', '2R', 'R/2', '0'], answer: 'A', explanation: 'Meyer\'s relation: CP − CV = R (universal gas constant)' },
            { id: 'eam-phy-8', subject: 'Physics', topic: 'Simple Harmonic Motion', question: 'In SHM, at mean position, the velocity is:', options: ['Zero', 'Maximum', 'Minimum', 'Half of maximum'], answer: 'B', explanation: 'In SHM, KE (velocity) is max at mean position, PE (acceleration) is max at extreme' },
            { id: 'eam-phy-9', subject: 'Physics', topic: 'Gravitation', question: 'Escape velocity from Earth\'s surface is approximately:', options: ['7.9 km/s', '11.2 km/s', '3.5 km/s', '9.8 km/s'], answer: 'B', explanation: 'Escape velocity = √(2gR) ≈ 11.2 km/s from Earth\'s surface' },
            { id: 'eam-phy-10', subject: 'Physics', topic: 'Wave Motion', question: 'Speed of sound at 0°C in air is approximately:', options: ['343 m/s', '332 m/s', '300 m/s', '310 m/s'], answer: 'B', explanation: 'Speed of sound in air at 0°C ≈ 332 m/s; at 25°C ≈ 343 m/s' },
        ],
        Chemistry: [
            { id: 'eam-chem-1', subject: 'Chemistry', topic: 'Periodic Properties', question: 'Ionization energy generally ______ across a period:', options: ['Decreases', 'Increases', 'Remains constant', 'First increases then decreases'], answer: 'B', explanation: 'IE increases across period due to increasing nuclear charge' },
            { id: 'eam-chem-2', subject: 'Chemistry', topic: 'States of Matter', question: 'Ideal gas equation is:', options: ['PV = nRT', 'PV = RT', 'P = nRT/V', 'Both A and C'], answer: 'D', explanation: 'PV = nRT (A) and rearranging gives P = nRT/V (C) - equivalent forms' },
            { id: 'eam-chem-3', subject: 'Chemistry', topic: 'Organic Chemistry', question: 'IUPAC name of CH₃-CH₂-CHO is:', options: ['Ethanal', 'Propanal', 'Propanone', 'Ethanone'], answer: 'B', explanation: 'CH₃CH₂CHO = 3 carbons + aldehyde = propanal' },
            { id: 'eam-chem-4', subject: 'Chemistry', topic: 'Equilibrium', question: 'Le Chatelier\'s principle applies to:', options: ['Only thermal equilibrium', 'Chemical equilibrium', 'Phase equilibrium', 'Both B and C'], answer: 'D', explanation: 'Le Chatelier\'s principle applies to both chemical and phase equilibria' },
            { id: 'eam-chem-5', subject: 'Chemistry', topic: 'Electrochemistry', question: 'During electrolysis of water, H₂ is produced at:', options: ['Anode', 'Cathode', 'Both electrodes', 'Neither'], answer: 'B', explanation: 'Reduction occurs at cathode: 2H⁺ + 2e⁻ → H₂' },
            { id: 'eam-chem-6', subject: 'Chemistry', topic: 'Nuclear Chemistry', question: 'In alpha decay, mass number changes by:', options: ['+4', '−4', '−2', '0'], answer: 'B', explanation: 'Alpha particle (⁴He) has mass number 4, so alpha decay decreases mass by 4' },
            { id: 'eam-chem-7', subject: 'Chemistry', topic: 'Chemical Kinetics', question: 'Half-life of first order reaction is:', options: ['Dependent on initial concentration', '0.693/k', 'k/0.693', 'Varies with time'], answer: 'B', explanation: 'For first order: t½ = 0.693/k (independent of concentration)' },
            { id: 'eam-chem-8', subject: 'Chemistry', topic: 'Coordination Chemistry', question: 'The color of transition metal compounds is due to:', options: ['s-d transitions', 'd-d transitions', 'p-d transitions', 'f-f transitions'], answer: 'B', explanation: 'Colour in transition metal compounds arises from d-d electron transitions' },
            { id: 'eam-chem-9', subject: 'Chemistry', topic: 'Polymers', question: 'Bakelite is an example of:', options: ['Addition polymer', 'Condensation polymer', 'Natural polymer', 'Copolymer'], answer: 'B', explanation: 'Bakelite (phenol-formaldehyde) forms by condensation polymerization' },
            { id: 'eam-chem-10', subject: 'Chemistry', topic: 'Biomolecules', question: 'DNA contains which sugar?', options: ['Ribose', 'Deoxyribose', 'Fructose', 'Glucose'], answer: 'B', explanation: 'DNA = DeoxyriboNucleic Acid — contains deoxyribose sugar' },
        ],
        Mathematics: [
            { id: 'eam-math-1', subject: 'Mathematics', topic: 'Algebra', question: 'If log₂(8) = x, then x is:', options: ['2', '3', '4', '1'], answer: 'B', explanation: '2³ = 8, so log₂(8) = 3' },
            { id: 'eam-math-2', subject: 'Mathematics', topic: 'Trigonometry', question: 'cos(2x) = 1 − 2sin²(x). This is called:', options: ['Double angle formula', 'Half angle formula', 'Product formula', 'Sum formula'], answer: 'A', explanation: 'cos(2x) = 1 − 2sin²(x) is the double angle formula for cosine' },
            { id: 'eam-math-3', subject: 'Mathematics', topic: 'Calculus', question: 'd/dx (e^x) is:', options: ['xe^(x-1)', 'e^x', 'ln(x)', '0'], answer: 'B', explanation: 'The derivative of e^x is e^x (it is its own derivative)' },
            { id: 'eam-math-4', subject: 'Mathematics', topic: 'Coordinate Geometry', question: 'Equation of circle with center (0,0) and radius 5 is:', options: ['x+y=5', 'x²+y²=5', 'x²+y²=25', 'x²+y²=10'], answer: 'C', explanation: 'Standard circle: x²+y²=r². For r=5: x²+y²=25' },
            { id: 'eam-math-5', subject: 'Mathematics', topic: 'Probability', question: 'Probability of getting 2 heads in 3 coin tosses:', options: ['1/8', '3/8', '1/2', '3/4'], answer: 'B', explanation: 'P = C(3,2)(1/2)²(1/2)¹ = 3 × 1/8 = 3/8' },
            { id: 'eam-math-6', subject: 'Mathematics', topic: 'Vectors', question: 'Two perpendicular vectors have dot product:', options: ['1', '−1', '0', 'Maximum value'], answer: 'C', explanation: 'a⃗·b⃗ = |a||b|cos(90°) = 0 for perpendicular vectors' },
            { id: 'eam-math-7', subject: 'Mathematics', topic: 'Matrices', question: 'The inverse of matrix A exists only when:', options: ['det(A) = 0', 'det(A) ≠ 0', 'A is symmetric', 'A is square'], answer: 'B', explanation: 'A matrix is invertible (non-singular) if and only if its determinant ≠ 0' },
            { id: 'eam-math-8', subject: 'Mathematics', topic: 'Statistics', question: 'Arithmetic mean of 2, 4, 6, 8, 10 is:', options: ['4', '5', '6', '7'], answer: 'C', explanation: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6' },
            { id: 'eam-math-9', subject: 'Mathematics', topic: 'Binomial Theorem', question: 'The number of terms in expansion of (a+b)^n is:', options: ['n', 'n−1', 'n+1', '2n'], answer: 'C', explanation: 'Expansion of (a+b)^n has n+1 terms: from k=0 to k=n' },
            { id: 'eam-math-10', subject: 'Mathematics', topic: 'Differential Equations', question: 'Order of differential equation d²y/dx² + (dy/dx)³ + y = 0 is:', options: ['1', '2', '3', '4'], answer: 'B', explanation: 'Order = highest derivative = 2 (d²y/dx²). Degree = power of that highest derivative = 1' },
        ],
        Biology: [],
    }
};

/**
 * Get random questions from the bank
 * @param {string} examType - 'JEE' | 'NEET' | 'EAMCET'
 * @param {string[]} subjects - Array of subjects
 * @param {number} perSubject - Questions per subject
 */
const getQuestions = (examType, subjects, perSubject = 5) => {
    const bank = questionBank[examType] || questionBank.JEE;
    let allQuestions = [];

    for (const subject of subjects) {
        const subjectQuestions = (bank[subject] || []).slice(0, perSubject);
        allQuestions = allQuestions.concat(subjectQuestions);
    }

    // Shuffle
    return allQuestions.sort(() => Math.random() - 0.5);
};

module.exports = { questionBank, getQuestions };
