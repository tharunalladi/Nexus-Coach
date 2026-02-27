import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Brain, Calendar, TrendingUp, Flame, Zap, AlertTriangle, Upload, ArrowRight } from 'lucide-react';
import PreferencesModal from '../components/PreferencesModal';
import './Dashboard.css';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [progress, setProgress] = useState(null);
    const [motivation, setMotivation] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/progress').then(r => setProgress(r.data.data)).catch(() => setProgress(null)),
            api.get('/ai/motivate').then(r => setMotivation(r.data.data.message)).catch(() => setMotivation(`${user?.name}, today's effort is tomorrow's rank. Let's go! 🔥`)),
        ]).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="page-loading"><div className="spinner" /><p>Loading your dashboard...</p></div>;

    const { overview, scoreHistory, subjectBreakdown, weakTopics } = progress || {};
    const hasData = !!progress;

    const radarData = subjectBreakdown?.map(s => ({ subject: s.subject, accuracy: s.accuracy, fullMark: 100 })) || [];

    const burnoutColor = (overview?.burnoutRisk || 0) > 0.6 ? 'var(--color-danger)' : (overview?.burnoutRisk || 0) > 0.35 ? 'var(--color-warning)' : 'var(--color-success)';

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="dashboard animate-fade-up">
            {/* Preferences Modal (Shows if onboarding incomplete) */}
            {!user?.weeklyStudyHours && <PreferencesModal />}

            {/* Header */}
            <div className="page-header dashboard-header">
                <div>
                    <h1>{getGreeting()}, {user?.name?.split(' ')[0]}! 👋</h1>
                    <p className="text-muted">Here's your personalized performance overview</p>
                </div>
                <div className="header-actions">
                    <Link to="/upload" className="btn btn-primary"><Upload size={16} /> Upload Test</Link>
                </div>
            </div>

            {/* Motivation Banner */}
            {motivation && (
                <div className="motivation-banner">
                    <span className="motivation-icon">💡</span>
                    <p>{motivation}</p>
                </div>
            )}

            {/* Start Practice Widget */}
            <div className="card" style={{ marginBottom: 24, background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(99,102,241,0.05) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Zap size={18} color="var(--brand-1)" /> Start Practice
                        </h3>
                        <p className="text-muted text-sm" style={{ margin: '4px 0 0' }}>Take a timed MCQ exam and auto-update your Error DNA</p>
                    </div>
                    <span style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--brand-1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 20, padding: '3px 12px', fontSize: '0.75rem', fontWeight: 600 }}>LIVE AI SCORING</span>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/practice?exam=JEE')} style={{ flex: 1, minWidth: 120 }}>
                        ⚡ Start JEE
                    </button>
                    <button className="btn" onClick={() => navigate('/practice?exam=NEET')} style={{ flex: 1, minWidth: 120, background: 'rgba(16,185,129,0.15)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        🧬 Start NEET
                    </button>
                    <button className="btn" onClick={() => navigate('/practice?exam=EAMCET')} style={{ flex: 1, minWidth: 120, background: 'rgba(245,158,11,0.15)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.3)' }}>
                        🎯 Start EAMCET
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(0,96,255,0.1)' }}><Flame size={22} color="var(--brand-1)" /></div>
                    <div><div className="stat-value text-gradient-warm">{overview?.studyStreak ?? 0}</div><div className="stat-label">Day Streak 🔥</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(0,96,255,0.1)' }}><Brain size={22} color="var(--brand-1)" /></div>
                    <div><div className="stat-value" style={{ color: 'var(--brand-1)' }}>{overview?.confidenceScore ?? '—'}%</div><div className="stat-label">Confidence Score</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)' }}><TrendingUp size={22} color="var(--success)" /></div>
                    <div><div className="stat-value" style={{ color: 'var(--success)' }}>{overview?.predictedScore ?? '—'}</div><div className="stat-label">Predicted Score</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: `${burnoutColor}22` }}><AlertTriangle size={22} color={burnoutColor} /></div>
                    <div><div className="stat-value" style={{ color: burnoutColor, fontSize: '1.1rem' }}>{!overview ? '—' : overview.burnoutRisk > 0.6 ? 'High' : overview.burnoutRisk > 0.35 ? 'Medium' : 'Low'}</div><div className="stat-label">Burnout Risk</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)' }}><Zap size={22} color="var(--warning)" /></div>
                    <div><div className="stat-value" style={{ color: 'var(--warning)' }}>{overview?.totalSessions ?? 0}</div><div className="stat-label">Tests Completed</div></div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                {/* Score History */}
                <div className="card chart-card">
                    <h3>📈 Score History</h3>
                    {scoreHistory?.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={scoreHistory}>
                                <defs>
                                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--brand-1)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--brand-1)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="date" tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '8px', color: '#0f172a', boxShadow: 'var(--shadow-sm)' }} />
                                <Area type="monotone" dataKey="rawScore" stroke="var(--brand-1)" fill="url(#sg)" strokeWidth={2} name="Score" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', flexDirection: 'column', gap: 8 }}>
                            <Calendar size={28} />
                            <span style={{ fontSize: '0.85rem' }}>No score history yet</span>
                        </div>
                    )}
                </div>

                {/* Subject Radar */}
                <div className="card chart-card">
                    <h3>🎯 Subject Accuracy</h3>
                    {radarData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="var(--border)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-3)', fontSize: 12 }} />
                                <Radar name="Accuracy" dataKey="accuracy" stroke="var(--brand-1)" fill="var(--brand-1)" fillOpacity={0.2} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', flexDirection: 'column', gap: 8 }}>
                            <Brain size={28} />
                            <span style={{ fontSize: '0.85rem' }}>Take a test to see subject accuracy</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Weak Topics + Quick Actions */}
            <div className="dna-row">
                {/* Weak Topics */}
                <div className="card">
                    <div className="card-header">
                        <h3>🧬 Error DNA — Top Weaknesses</h3>
                        <Link to="/analysis" className="btn btn-ghost text-sm">View All <ArrowRight size={14} /></Link>
                    </div>
                    <div className="weak-list">
                        {weakTopics?.slice(0, 5).map(({ topic, score, severity }, idx) => (
                            <div key={topic} className="weak-topic-row">
                                <div className="weak-topic-rank">#{idx + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{topic}</span>
                                        <span className={`badge badge-${severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : 'success'}`}>{severity}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${score}%`, background: severity === 'critical' ? 'var(--danger)' : severity === 'high' ? 'var(--warning)' : 'var(--success)' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h3>⚡ Quick Actions</h3>
                    <div className="quick-actions-row">
                        {[
                            { to: '/upload', icon: '📝', title: 'New Mock Test', desc: 'Upload your latest test' },
                            { to: '/plan', icon: '📅', title: 'Revision Plan', desc: 'See your 7-day plan' },
                            { to: '/analysis', icon: '🧠', title: 'Error DNA', desc: 'Deep dive analytics' },
                            { to: '/progress', icon: '📊', title: 'Progress Report', desc: 'Track your growth' },
                        ].map(a => (
                            <Link key={a.to} to={a.to} className="quick-action-card">
                                <div className="quick-action-icon" style={{ background: 'var(--bg-glass-2)', color: 'var(--brand-4)' }}>{a.icon}</div>
                                <div><div className="quick-action-title">{a.title}</div><div className="quick-action-desc">{a.desc}</div></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const getSeverity = (score) => score > 70 ? 'critical' : score > 50 ? 'high' : 'medium';
