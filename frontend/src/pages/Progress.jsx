import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Flame, Zap, BookOpen, Upload } from 'lucide-react';
import './Progress.css';

export default function Progress() {
    const [data, setData] = useState(undefined); // undefined = loading, null = no data
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/progress')
            .then(r => setData(r.data.data))
            .catch(() => setData(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="page-loading">
            <div className="spinner" />
            <p>Loading your progress...</p>
        </div>
    );

    // ── Empty State ─────────────────────────────────────────────────────────────
    if (!data) {
        return (
            <div style={{ maxWidth: 700 }}>
                <div className="page-header">
                    <h1>📊 Progress Report</h1>
                    <p className="text-muted">Track your improvement journey and forecast your performance</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '56px 40px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 16 }}>📭</div>
                    <h2 style={{ marginBottom: 10 }}>No Data Yet</h2>
                    <p className="text-muted" style={{ maxWidth: 420, margin: '0 auto 28px' }}>
                        Your Progress Report is built entirely from your real test performance.
                        Take a practice exam or upload a mock test to see your score trend, subject accuracy, and AI forecast.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/practice')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Zap size={16} /> Start Practice Test
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/upload')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Upload size={16} /> Upload Mock Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const d = data;
    const ov = d.overview;

    return (
        <div style={{ maxWidth: 1100 }}>
            <div className="page-header">
                <h1>📊 Progress Report</h1>
                <p className="text-muted">Track your improvement journey and forecast your exam performance</p>
            </div>

            {/* Overview Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
                {[
                    { icon: TrendingUp, label: 'Predicted Score', value: ov.predictedScore ? `${ov.predictedScore}` : '—', sub: '/360 marks', color: 'var(--success)' },
                    { icon: Target, label: 'Predicted %ile', value: ov.predictedPercentile ? `${ov.predictedPercentile?.toFixed(1)}%` : '—', sub: 'on exam day', color: 'var(--brand-1)' },
                    { icon: Flame, label: 'Study Streak', value: ov.studyStreak ? `${ov.studyStreak}d` : '0d', sub: 'consecutive days', color: 'var(--warning)' },
                    { icon: Zap, label: 'Score Improvement', value: ov.improvement > 0 ? `+${ov.improvement}` : ov.improvement < 0 ? `${ov.improvement}` : '—', sub: `across ${ov.totalSessions} sessions`, color: 'var(--info, var(--brand-2))' },
                ].map(item => (
                    <div key={item.label} className="stat-card">
                        <div className="stat-icon" style={{ background: `${item.color}22` }}><item.icon size={20} color={item.color} /></div>
                        <div>
                            <div className="stat-value" style={{ color: item.color }}>{item.value}</div>
                            <div className="stat-label">{item.label}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 2 }}>{item.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Score Trend Chart */}
            {d.scoreHistory?.length > 0 ? (
                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>📈 Score Trend</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={d.scoreHistory}>
                            <defs>
                                <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="date" tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 360]} />
                            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-1)' }} />
                            <Area type="monotone" dataKey="rawScore" stroke="var(--success)" fill="url(#sg2)" strokeWidth={2.5} name="Score" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="card" style={{ marginBottom: 24, textAlign: 'center', padding: 32 }}>
                    <p className="text-muted">📈 Score trend will appear after you complete 2+ tests</p>
                </div>
            )}

            {/* Subject Accuracy */}
            <div className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ marginBottom: 18 }}>📚 Subject Accuracy</h3>
                {d.subjectBreakdown?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {d.subjectBreakdown.map(s => (
                            <div key={s.subject}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.88rem' }}>
                                    <span style={{ fontWeight: 600 }}>{s.subject}</span>
                                    <span style={{ color: s.accuracy >= 70 ? 'var(--success)' : s.accuracy >= 55 ? 'var(--warning)' : 'var(--danger)', fontWeight: 700 }}>
                                        {s.accuracy}% <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: '0.75rem' }}>({s.topicsTracked} topics tracked)</span>
                                    </span>
                                </div>
                                <div className="progress-bar" style={{ height: 10 }}>
                                    <div className="progress-fill" style={{ width: `${s.accuracy}%`, background: s.accuracy >= 70 ? 'var(--success)' : s.accuracy >= 55 ? 'var(--warning)' : 'var(--danger)' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)' }}>
                        <BookOpen size={32} style={{ marginBottom: 10 }} />
                        <p>Subject accuracy will be calculated after you complete a test</p>
                    </div>
                )}
            </div>

            {/* Weak Topics */}
            {d.weakTopics?.length > 0 && (
                <div className="card">
                    <h3 style={{ marginBottom: 16 }}>🎯 Your Weak Topics (from real performance)</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {d.weakTopics.map(t => (
                            <div key={t.topic} style={{
                                padding: '6px 14px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600,
                                background: t.severity === 'critical' ? 'rgba(239,68,68,0.12)' : t.severity === 'high' ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)',
                                color: t.severity === 'critical' ? 'var(--danger)' : t.severity === 'high' ? 'var(--warning)' : 'var(--brand-1)',
                                border: `1px solid ${t.severity === 'critical' ? 'rgba(239,68,68,0.3)' : t.severity === 'high' ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)'}`,
                            }}>
                                {t.topic} · {t.score}%
                            </div>
                        ))}
                    </div>

                    {/* AI Performance Forecast (only if we have real score data) */}
                    {ov.predictedScore && (
                        <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-glass-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>🔮 AI Performance Forecast</div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-1)' }}>
                                At your current trajectory → <span style={{ color: 'var(--success)' }}>{ov.predictedScore - 5}–{ov.predictedScore + 12} marks</span> projected on exam day
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginTop: 6 }}>
                                Target your weak topics from the list above to push the forecast higher 🚀
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
