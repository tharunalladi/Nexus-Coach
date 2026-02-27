import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Dna, Brain, Flame, Clock, Trophy, Target, Sparkles, AlertTriangle, Upload } from 'lucide-react';
import api from '../lib/api';
import './Analysis.css';

export default function Analysis() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDNA = async () => {
            try {
                const res = await api.get('/analysis/profile');
                setData(res.data.data); // data can be null if no profile exists
            } catch (err) {
                console.error("Failed to load DNA", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDNA();
    }, []);

    if (loading) {
        return (
            <div className="dna-loading">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    <Dna className="dna-spinner" size={48} />
                </motion.div>
                <p>Sequencing your Error DNA™...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="analysis-page center-content animate-fade-up">
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '4rem auto' }}>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-glass-2)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                        <Dna size={48} className="text-brand-3" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-1)' }}>No Error DNA Found</h2>
                    <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        To generate your hyper-personalized Error DNA profile, we need data. Upload your latest mock test results to get started.
                    </p>
                    <a href="/upload" className="btn btn-primary" style={{ display: 'inline-flex', padding: '1rem 2rem', borderRadius: '16px' }}>
                        <Upload size={20} style={{ marginRight: '8px' }} /> Upload Mock Test
                    </a>
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div className="analysis-page" initial="hidden" animate="visible" variants={containerVariants}>
            <header className="analysis-header">
                <div className="title-area">
                    <motion.div className="dna-icon-wrap" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                        <Dna size={28} color="var(--brand-4)" />
                    </motion.div>
                    <div>
                        <h1>Error DNA™ Profile</h1>
                        <p>AI-driven analysis of your cognitive learning patterns.</p>
                    </div>
                </div>
            </header>

            <div className="analysis-grid">
                {/* AI Insights Panel - The "Wow" Factor */}
                <motion.div className="card insight-card" variants={itemVariants}>
                    <div className="card-header border-b">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Sparkles size={18} className="text-brand-4" />
                            <h3 style={{ margin: 0 }}>AI Diagnostics</h3>
                        </div>
                        <span className="badge-live">Live</span>
                    </div>
                    <div className="card-body">
                        <p className="ai-text">{data.aiInsights}</p>

                        <h4 className="quick-wins-title"><Target size={14} /> Quick Wins</h4>
                        <ul className="quick-wins-list">
                            {data.quickWins.map((win, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}>
                                    <div className="win-bullet"></div>
                                    <span>{win}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Cognitive Distribution Radar */}
                <motion.div className="card chart-card" variants={itemVariants}>
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Brain size={18} className="text-brand-3" />
                            <h3 style={{ margin: 0 }}>Error Genesis</h3>
                        </div>
                    </div>
                    <div className="card-body chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.distribution}>
                                <PolarGrid stroke="var(--border)" />
                                <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Errors" dataKey="value" stroke="var(--brand-1)" fill="url(#colorUv)" fillOpacity={0.2} />
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--brand-3)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--brand-1)" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Topic Mastery Matrix */}
                <motion.div className="card matrix-card" variants={itemVariants}>
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AlertTriangle size={18} className="text-danger" />
                            <h3 style={{ margin: 0 }}>Weakness Matrix</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="topic-list">
                            {data.topics.map((topic, i) => (
                                <div key={i} className="topic-item">
                                    <div className="topic-info">
                                        <span className="topic-name">{topic.name}</span>
                                        <span className="topic-score">{topic.score}%</span>
                                    </div>
                                    <div className="topic-bar-bg">
                                        <motion.div
                                            className="topic-bar-fill"
                                            style={{ backgroundColor: topic.score > 75 ? 'var(--success)' : topic.score > 50 ? 'var(--warning)' : 'var(--danger)' }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${topic.score}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Behavioral Stats Cards */}
                <motion.div className="stats-container" variants={itemVariants}>
                    <div className="stat-card">
                        <Flame size={20} className="text-danger" />
                        <div className="stat-info">
                            <span className="stat-label">Burnout Risk</span>
                            <span className="stat-value">{data.stats.burnoutRisk}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Brain size={20} className="text-brand-3" />
                        <div className="stat-info">
                            <span className="stat-label">Cognitive Load</span>
                            <span className="stat-value">{data.stats.cognitiveLoad}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Clock size={20} className="text-brand-4" />
                        <div className="stat-info">
                            <span className="stat-label">Retention Half-Life</span>
                            <span className="stat-value">{data.stats.retentionHalfLife}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Trophy size={20} className="text-brand-5" />
                        <div className="stat-info">
                            <span className="stat-label">Study Streak</span>
                            <span className="stat-value">{data.stats.studyStreak}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
