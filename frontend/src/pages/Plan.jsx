import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Circle, PlayCircle, BookOpen, PenTool, LayoutTemplate, Sparkles, ChevronRight, Award, Youtube, FileText, ExternalLink } from 'lucide-react';
import api from '../lib/api';
import './Plan.css';

export default function Plan() {
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(1);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await api.get('/plan/active');
                setPlan(res.data.data.plan?.planData || null);
            } catch (err) {
                console.error("Failed to fetch active plan:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, []);

    const generatePlan = async () => {
        setLoading(true);
        try {
            const res = await api.post('/plan/generate');
            setPlan(res.data.data.plan.planData);
        } catch (err) {
            console.error("Failed to generate plan:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleTask = (dayIdx, taskId) => {
        const newPlan = { ...plan };
        const day = newPlan.days[dayIdx];
        const task = day.tasks.find(t => t.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            setPlan(newPlan);
            // We would sync this to the backend in a real implementation
        }
    };

    if (loading) {
        return (
            <div className="plan-loading">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    <Calendar size={48} className="text-brand-4" />
                </motion.div>
                <p>Generating personalized 7-day revision strategy...</p>
            </div>
        );
    }

    if (!plan) return (
        <div className="plan-page center-content animate-fade-up">
            <div className="empty-state-card card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '4rem auto' }}>
                <div className="empty-icon-wrapper" style={{ display: 'inline-flex', background: 'var(--bg-glass-2)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                    <Sparkles size={48} className="text-brand-4" />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-1)' }}>Your Setup is Complete</h2>
                <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    We're ready to synthesize your error profile and personal preferences into a bespoke 7-day revision strategy.
                </p>
                <button
                    onClick={generatePlan}
                    className="btn btn-primary"
                    style={{ fontSize: '1.15rem', padding: '1rem 2rem', width: '100%', maxWidth: '300px', borderRadius: '16px', boxShadow: '0 10px 20px -5px rgba(0, 96, 255, 0.4)', transition: 'transform 0.2s', display: 'inline-flex', justifyContent: 'center', gap: '0.75rem' }}
                >
                    <Sparkles size={20} /> Generate My Plan
                </button>
            </div>
        </div>
    );

    const progress = Math.round(
        (plan.days.flatMap(d => d.tasks).filter(t => t.isCompleted).length /
            plan.days.flatMap(d => d.tasks).length) * 100
    );

    const getTaskIcon = (type) => {
        switch (type) {
            case 'study': return <BookOpen size={16} className="text-brand-4" />;
            case 'practice': return <PenTool size={16} className="text-brand-3" />;
            case 'revision': return <LayoutTemplate size={16} className="text-success" />;
            case 'mock': return <Award size={16} className="text-danger" />;
            default: return <Circle size={16} />;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    const activeDayData = plan.days.find(d => d.day === activeDay);

    return (
        <motion.div className="plan-page" initial="hidden" animate="visible" variants={containerVariants}>
            <header className="plan-header">
                <div className="title-area">
                    <div className="icon-wrap">
                        <Calendar size={28} className="text-brand-4" />
                    </div>
                    <div>
                        <h1>Hyper-Personalized Schedule</h1>
                        <p>{plan.goal}</p>
                    </div>
                </div>
                <div className="progress-area">
                    <div className="progress-text">
                        <span>Overall Progress</span>
                        <span className="font-bold text-brand-4">{progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </header>

            <div className="plan-layout">
                {/* Timeline Sidebar */}
                <motion.div className="timeline-sidebar" variants={itemVariants}>
                    <h3 className="section-title"><Sparkles size={16} /> The 7-Day Protocol</h3>
                    <div className="day-list">
                        {plan.days.map((day) => {
                            const isPast = progress > (day.day * 14);
                            const isActive = day.day === activeDay;
                            return (
                                <div
                                    key={day.day}
                                    className={`day-item ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                                    onClick={() => setActiveDay(day.day)}
                                >
                                    <div className="day-bullet">
                                        {isPast ? <CheckCircle size={14} /> : <div className="bullet-dot" />}
                                    </div>
                                    <div className="day-info">
                                        <span className="day-name">Day {day.day}</span>
                                        <span className="day-date">{day.date}</span>
                                    </div>
                                    {isActive && <motion.div layoutId="activeDayIndicator" className="active-indicator" />}
                                </div>
                            );
                        })}
                    </div>

                    <div className="study-tips card">
                        <h4><Brain size={16} /> Science-Backed Tips</h4>
                        <ul>
                            {plan.studyTips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </motion.div>

                {/* Main Task Area */}
                <motion.div className="daily-agenda" variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="agenda-content"
                        >
                            <div className="agenda-header">
                                <h2>Day {activeDayData.day} &mdash; {activeDayData.theme}</h2>
                                <div className="agenda-meta">
                                    <Clock size={14} /> {activeDayData.totalMins / 60} Total Hours
                                </div>
                            </div>

                            <div className="task-list">
                                {activeDayData.tasks.map((task, idx) => (
                                    <motion.div
                                        key={task.id}
                                        className={`task-card ${task.isCompleted ? 'completed' : ''}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <button
                                            className="task-toggle"
                                            onClick={() => toggleTask(activeDay - 1, task.id)}
                                        >
                                            {task.isCompleted ?
                                                <CheckCircle size={24} className="text-brand-4" /> :
                                                <Circle size={24} className="text-muted" />
                                            }
                                        </button>

                                        <div className="task-details">
                                            <div className="task-top">
                                                <span className={`task-badge type-${task.taskType}`}>
                                                    {getTaskIcon(task.taskType)}
                                                    {task.taskType.toUpperCase()}
                                                </span>
                                                <span className={`priority-badge prio-${task.priority}`}>
                                                    {task.priority} Priority
                                                </span>
                                                <span className="time-badge">
                                                    <Clock size={12} /> {task.estimatedMins}m
                                                </span>
                                            </div>

                                            <h3 className="task-title">Master: {task.topic}</h3>

                                            <div className="task-resources">
                                                {task.resources.map((res, rIdx) => (
                                                    <a
                                                        key={rIdx}
                                                        href={res.url || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resource-btn"
                                                        onClick={(e) => {
                                                            if (!res.url || res.url === '#') {
                                                                e.preventDefault();
                                                                alert('Study material link generation is still processing.');
                                                            }
                                                        }}
                                                    >
                                                        {res.type === 'video' ? <Youtube size={14} className="text-danger" /> :
                                                            res.type === 'pdf' ? <FileText size={14} className="text-brand-4" /> :
                                                                <ExternalLink size={14} className="text-brand-3" />}
                                                        <span>{res.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Minimal missing icons for above
function Brain(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /></svg> }
function Clock(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
