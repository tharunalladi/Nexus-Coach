import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, XCircle, BarChart2, Zap } from 'lucide-react';
import api from '../lib/api';
import './Practice.css';

const EXAM_SUBJECTS = {
    JEE: { subjects: ['Physics', 'Chemistry', 'Mathematics'], color: '#4F46E5', emoji: '⚡' },
    NEET: { subjects: ['Physics', 'Chemistry', 'Biology'], color: '#10B981', emoji: '🧬' },
    EAMCET: { subjects: ['Physics', 'Chemistry', 'Mathematics'], color: '#F59E0B', emoji: '🎯' },
};

const MINUTES_PER_QUESTION = 1.5; // 90 seconds per question

export default function Practice() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const examType = searchParams.get('exam') || 'JEE';
    const examConfig = EXAM_SUBJECTS[examType] || EXAM_SUBJECTS.JEE;

    // ── Setup State ──────────────────────────────────────────────────────────────
    const [screen, setScreen] = useState('setup'); // setup | exam | results
    const [selectedSubjects, setSelectedSubjects] = useState(examConfig.subjects);
    const [perSubject, setPerSubject] = useState(5);

    // ── Exam State ───────────────────────────────────────────────────────────────
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [revealed, setRevealed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ── Results State ────────────────────────────────────────────────────────────
    const [results, setResults] = useState(null);

    // ── Timer ────────────────────────────────────────────────────────────────────
    const submitExam = useCallback(async (answers) => {
        try {
            const res = await api.post('/practice/submit', {
                examType,
                subjects: selectedSubjects.join(','),
                perSubject,
                userAnswers: answers,
            });
            setResults(res.data.data);
            setScreen('results');
        } catch (err) {
            setError('Failed to submit. Please try again.');
        }
    }, [examType, selectedSubjects, perSubject]);

    useEffect(() => {
        if (screen !== 'exam' || timeLeft <= 0) return;
        if (timeLeft === 0) { submitExam(userAnswers); return; }
        const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft, screen, submitExam, userAnswers]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // ── Subject Toggle ───────────────────────────────────────────────────────────
    const toggleSubject = (s) => {
        setSelectedSubjects(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        );
    };

    // ── Start Exam ──────────────────────────────────────────────────────────────
    const startExam = async () => {
        if (selectedSubjects.length === 0) { setError('Select at least one subject.'); return; }
        setLoading(true); setError('');
        try {
            const res = await api.get('/practice/questions', {
                params: { examType, subjects: selectedSubjects.join(','), perSubject }
            });
            const qs = res.data.data.questions;
            setQuestions(qs);
            setCurrentIdx(0);
            setUserAnswers({});
            setTimeLeft(Math.round(qs.length * MINUTES_PER_QUESTION * 60));
            setRevealed(false);
            setScreen('exam');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load questions.');
        } finally {
            setLoading(false);
        }
    };

    // ── Answer Logic ────────────────────────────────────────────────────────────
    const selectAnswer = (option) => {
        if (revealed) return;
        setUserAnswers(p => ({ ...p, [questions[currentIdx].id]: option }));
    };

    const q = questions[currentIdx];

    // ═══════════════════════════════════════════════════════════════════════════
    // SETUP SCREEN
    // ═══════════════════════════════════════════════════════════════════════════
    if (screen === 'setup') {
        return (
            <div className="practice-page">
                <div className="page-header">
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: '2rem' }}>{examConfig.emoji}</span> Start {examType} Practice
                    </h1>
                    <p className="text-muted">Configure your practice session. Your results will automatically update your Error DNA.</p>
                </div>

                <div className="exam-setup-card">
                    <div>
                        <span className="exam-type-badge" style={{ color: examConfig.color }}>
                            <Zap size={14} /> {examType} Mode
                        </span>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <div>
                        <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Select Subjects</h3>
                        <div className="subject-grid">
                            {examConfig.subjects.map(s => (
                                <label key={s} className={`subject-toggle ${selectedSubjects.includes(s) ? 'active' : ''}`} onClick={() => toggleSubject(s)}>
                                    <span className="subject-icon">{s === 'Physics' ? '⚛️' : s === 'Chemistry' ? '🧪' : s === 'Mathematics' ? '📐' : '🌿'}</span>
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ marginBottom: 10, fontSize: '1rem' }}>Questions per Subject: <strong>{perSubject}</strong></h3>
                        <input type="range" min={3} max={10} value={perSubject}
                            onChange={e => setPerSubject(+e.target.value)}
                            style={{ width: '100%', accentColor: examConfig.color }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-3)' }}>
                            <span>3 (Quick)</span><span>10 (Full)</span>
                        </div>
                    </div>

                    <div style={{ background: 'var(--bg-glass-2)', borderRadius: 10, padding: '14px 18px', fontSize: '0.88rem', color: 'var(--text-2)' }}>
                        📊 <strong>{selectedSubjects.length * perSubject}</strong> questions · ⏱ ~{Math.round(selectedSubjects.length * perSubject * MINUTES_PER_QUESTION)} minutes
                    </div>

                    <button className="btn btn-primary" onClick={startExam} disabled={loading} style={{ padding: '14px 32px', fontSize: '1rem' }}>
                        {loading ? 'Loading Questions...' : `Start ${examType} Exam ➜`}
                    </button>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RESULTS SCREEN
    // ═══════════════════════════════════════════════════════════════════════════
    if (screen === 'results' && results) {
        const pct = results.score;
        const color = pct >= 75 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
        return (
            <div className="practice-page">
                <motion.div className="results-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="score-circle" style={{ borderColor: color }}>
                        <span className="score-pct" style={{ color }}>{pct}%</span>
                        <span className="score-label">SCORE</span>
                    </div>
                    <h2 style={{ marginBottom: 6 }}>{pct >= 75 ? '🎉 Excellent!' : pct >= 50 ? '📈 Good Effort!' : '💪 Keep Practicing!'}</h2>
                    <p className="text-muted" style={{ marginBottom: 20 }}>Your Error DNA has been updated based on your actual mistakes.</p>

                    <div className="results-stats">
                        <div className="stat-chip"><div className="stat-val" style={{ color: 'var(--success)' }}>{results.correct}</div><div className="stat-lbl">CORRECT</div></div>
                        <div className="stat-chip"><div className="stat-val" style={{ color: 'var(--danger)' }}>{results.incorrect}</div><div className="stat-lbl">WRONG</div></div>
                        <div className="stat-chip"><div className="stat-val">{results.total}</div><div className="stat-lbl">TOTAL</div></div>
                    </div>

                    {results.wrongTopics?.length > 0 && (
                        <div style={{ background: 'var(--bg-glass-2)', borderRadius: 10, padding: '12px 18px', marginBottom: 24, textAlign: 'left' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 8 }}>TOPICS ADDED TO YOUR ERROR DNA</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {results.wrongTopics.map(t => (
                                    <span key={t} style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20, padding: '3px 12px', fontSize: '0.82rem' }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/analysis')}><BarChart2 size={16} /> View Error DNA</button>
                        <button className="btn btn-secondary" onClick={() => navigate('/plan')}>Generate Plan</button>
                        <button className="btn btn-secondary" onClick={() => { setScreen('setup'); setResults(null); }}>Try Again</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EXAM SCREEN
    // ═══════════════════════════════════════════════════════════════════════════
    const isLast = currentIdx === questions.length - 1;
    const progress = ((currentIdx + 1) / questions.length) * 100;
    const isTimeDanger = timeLeft < 60;
    const currentAnswer = userAnswers[q?.id];

    const handleNext = () => {
        setRevealed(false);
        if (isLast) {
            submitExam(userAnswers);
        } else {
            setCurrentIdx(p => p + 1);
        }
    };

    return (
        <div className="practice-page">
            <div className="exam-wrapper">
                {/* Topbar */}
                <div className="exam-topbar">
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-3)' }}>
                        {examType} · Q {currentIdx + 1}/{questions.length}
                    </span>
                    <div className={`exam-timer ${isTimeDanger ? 'danger' : ''}`}>
                        <Clock size={18} /> {formatTime(timeLeft)}
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                        onClick={() => submitExam(userAnswers)}>
                        Submit
                    </button>
                </div>

                {/* Progress bar */}
                <div className="exam-progress-bar">
                    <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div key={currentIdx} className="question-card"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

                        <div className="question-meta">
                            <span className="question-subject-badge">{q?.subject}</span>
                            <span className="question-subject-badge" style={{ color: 'var(--brand-1)' }}>{q?.topic}</span>
                            <span className="question-number">Q{currentIdx + 1}</span>
                        </div>

                        <div className="question-text">{q?.question}</div>

                        <div className="options-grid">
                            {q?.options.map((opt, i) => {
                                const letter = ['A', 'B', 'C', 'D'][i];
                                let cls = 'option-btn';
                                if (currentAnswer === letter) cls += ' selected';
                                return (
                                    <button key={letter} className={cls} onClick={() => selectAnswer(letter)}>
                                        <span className="option-label">{letter}</span>
                                        <span>{opt}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="exam-nav">
                    <button className="btn btn-secondary" onClick={() => setCurrentIdx(p => p - 1)} disabled={currentIdx === 0}>
                        <ChevronLeft size={16} /> Previous
                    </button>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
                        {Object.keys(userAnswers).length} / {questions.length} answered
                    </span>
                    <button className="btn btn-primary" onClick={handleNext}>
                        {isLast ? 'Submit Exam' : 'Next'} <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
