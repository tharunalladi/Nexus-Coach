import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Book, AlertCircle, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './PreferencesModal.css';

const SUBJECTS = [
    { id: 'physics_mechanics', label: 'Mechanics (Physics)', color: 'var(--brand-3)' },
    { id: 'physics_electro', label: 'Electrostatics', color: 'var(--brand-3)' },
    { id: 'physics_optics', label: 'Wave Optics', color: 'var(--brand-3)' },
    { id: 'physics_thermo', label: 'Thermodynamics', color: 'var(--brand-3)' },
    { id: 'chem_organic', label: 'Organic Chemistry', color: 'var(--success)' },
    { id: 'chem_inorganic', label: 'Inorganic Chemistry', color: 'var(--success)' },
    { id: 'chem_physical', label: 'Physical Chemistry', color: 'var(--success)' },
    { id: 'math_calculus', label: 'Calculus (Math)', color: 'var(--brand-4)' },
    { id: 'math_algebra', label: 'Algebra', color: 'var(--brand-4)' },
    { id: 'math_coord', label: 'Coordinate Geometry', color: 'var(--brand-4)' },
];

export default function PreferencesModal() {
    const { updatePreferences } = useAuth();
    const [hours, setHours] = useState(20);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(
        localStorage.getItem('pref_modal_dismissed') !== 'true'
    );

    const handleSkip = () => {
        localStorage.setItem('pref_modal_dismissed', 'true');
        setIsOpen(false);
    };

    const toggleSubject = (label) => {
        if (selectedSubjects.includes(label)) {
            setSelectedSubjects(selectedSubjects.filter(s => s !== label));
        } else {
            if (selectedSubjects.length >= 6) return; // Max 6
            setSelectedSubjects([...selectedSubjects, label]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (selectedSubjects.length === 0) {
            setError('Please select at least one weak subject to focus on.');
            return;
        }

        setLoading(true);
        const res = await updatePreferences({
            weeklyStudyHours: hours,
            weakSubjects: selectedSubjects,
        });

        setLoading(false);
        if (res.success) {
            localStorage.setItem('pref_modal_dismissed', 'true');
            setIsOpen(false);
        } else {
            setError(res.message || 'Something went wrong.');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="pref-modal-backdrop">
                <motion.div
                    className="pref-modal-content"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="pref-modal-header">
                        <div className="pref-icon-wrapper">
                            <Sparkles className="text-brand-4" size={24} />
                        </div>
                        <h2>Personalize Your Coach</h2>
                        <p>Tell us about your goals and weaknesses to generate your custom 7-day AI revision plan.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="pref-form">
                        {error && (
                            <div className="pref-error">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        {/* Study Hours Slider */}
                        <div className="pref-section">
                            <div className="pref-section-header">
                                <h3><Clock size={18} /> How much time can you commit this week?</h3>
                                <span className="pref-value-badge">{hours} hrs</span>
                            </div>
                            <div className="pref-slider-container">
                                <span className="slider-label">5h</span>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="1"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    className="pref-slider"
                                />
                                <span className="slider-label">50h</span>
                            </div>
                            <p className="pref-subtext">Around {Math.round(hours / 7 * 10) / 10} hours per day.</p>
                        </div>

                        {/* Weak Subjects Select */}
                        <div className="pref-section">
                            <div className="pref-section-header">
                                <h3><Book size={18} /> Select your weakest topics (Max 6)</h3>
                                <span className="pref-counter">{selectedSubjects.length}/6</span>
                            </div>

                            <div className="pref-grid">
                                {SUBJECTS.map((sub) => {
                                    const isSelected = selectedSubjects.includes(sub.label);
                                    return (
                                        <button
                                            key={sub.id}
                                            type="button"
                                            className={`pref-pill ${isSelected ? 'selected' : ''}`}
                                            onClick={() => toggleSubject(sub.label)}
                                            style={{
                                                '--category-color': sub.color,
                                                borderColor: isSelected ? sub.color : 'var(--border)'
                                            }}
                                        >
                                            <div className="pref-pill-dot" style={{ background: sub.color }} />
                                            {sub.label}
                                            {isSelected && <Check size={14} className="pref-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pref-actions">
                            <button type="submit" className="btn btn-primary pref-submit-btn" disabled={loading}>
                                {loading ? 'Saving Parameters...' : (
                                    <>Start Setup <ChevronRight size={18} /></>
                                )}
                            </button>
                            <button type="button" onClick={handleSkip} style={{ width: '100%', marginTop: 10, background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer', fontSize: '0.85rem', padding: '8px' }}>
                                Skip for now →
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
