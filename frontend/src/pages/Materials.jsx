import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, FileText, ExternalLink, BookOpen, Sparkles, RefreshCw, AlertCircle, Play } from 'lucide-react';
import api from '../lib/api';
import VideoPlayerModal from '../components/VideoPlayerModal';
import './Materials.css';

const TYPE_META = {
    youtube: { icon: Youtube, label: 'YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.08)' },
    pdf: { icon: FileText, label: 'PDF', color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    article: { icon: ExternalLink, label: 'Link', color: '#6366F1', bg: 'rgba(99,102,241,0.08)' },
};

export default function Materials() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeVideo, setActiveVideo] = useState(null); // resource to play in modal

    const load = async () => {
        setLoading(true); setError('');
        try {
            const res = await api.get('/materials');
            setData(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load recommendations. Please take a practice test first to generate your Error DNA.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    if (loading) return (
        <div className="page-loading">
            <Sparkles size={40} color="var(--brand-1)" />
            <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, marginTop: 12 }} />
            <h3>AI is curating your study materials...</h3>
            <p className="text-muted text-sm">Based on your Error DNA profile</p>
        </div>
    );

    return (
        <div className="materials-page">
            {/* Video Player Modal */}
            {activeVideo && (
                <VideoPlayerModal resource={activeVideo} onClose={() => setActiveVideo(null)} />
            )}
            <div className="page-header">
                <div>
                    <h1><BookOpen size={26} style={{ display: 'inline', marginRight: 10, color: 'var(--brand-1)' }} />Study Materials</h1>
                    <p className="text-muted">Curated resources for your top weak topics, personalized from your Error DNA™</p>
                </div>
                <button className="btn btn-secondary" onClick={load} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RefreshCw size={15} /> Refresh
                </button>
            </div>

            {error && (
                <div className="auth-error" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AlertCircle size={18} /> {error}
                </div>
            )}

            {/* AI Tip Banner */}
            {data?.aiTip && (
                <div className="ai-tip-banner">
                    <Sparkles size={18} color="var(--brand-1)" />
                    <p><strong>AI Tip:</strong> {data.aiTip}</p>
                </div>
            )}

            {/* Weak Topics Summary */}
            {data?.weakTopics && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-3)', alignSelf: 'center' }}>Your focus areas:</span>
                    {data.weakTopics.map(t => (
                        <span key={t} className="material-topic-badge">{t}</span>
                    ))}
                </div>
            )}

            {/* Resource Grid */}
            {data?.recommendations?.length > 0 ? (
                <div className="materials-grid">
                    {data.recommendations.map((rec, i) => (
                        <motion.div key={rec.topic} className="topic-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}>

                            <div className="topic-card-header">
                                <h3 className="topic-name">{rec.topic}</h3>
                                <span className="resource-count">{rec.resources.length} resources</span>
                            </div>

                            <div className="resource-list">
                                {rec.resources.map((r, j) => {
                                    const meta = TYPE_META[r.type] || TYPE_META.article;
                                    const Icon = meta.icon;
                                    const isYoutube = r.type === 'youtube';
                                    return isYoutube ? (
                                        // YouTube → open in-site modal
                                        <button key={j} className="resource-item" onClick={() => setActiveVideo(r)}>
                                            <div className="resource-icon" style={{ background: meta.bg, color: meta.color }}>
                                                <Play size={16} />
                                            </div>
                                            <div className="resource-info">
                                                <span className="resource-title">{r.title}</span>
                                                {r.duration && <span className="resource-duration">⏱ {r.duration}</span>}
                                            </div>
                                            <span className="resource-type-badge" style={{ color: meta.color, background: meta.bg }}>PLAY</span>
                                        </button>
                                    ) : (
                                        // PDF/Article → open new tab
                                        <a key={j} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-item">
                                            <div className="resource-icon" style={{ background: meta.bg, color: meta.color }}>
                                                <Icon size={16} />
                                            </div>
                                            <div className="resource-info">
                                                <span className="resource-title">{r.title}</span>
                                                {r.duration && <span className="resource-duration">⏱ {r.duration}</span>}
                                            </div>
                                            <span className="resource-type-badge" style={{ color: meta.color, background: meta.bg }}>{meta.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                !error && (
                    <div className="empty-state">
                        <BookOpen size={48} color="var(--text-3)" />
                        <h3>No recommendations yet</h3>
                        <p>Take a practice test or upload a mock test to generate your Error DNA and get personalized materials.</p>
                        <a href="/practice" className="btn btn-primary" style={{ marginTop: 16, textDecoration: 'none' }}>⚡ Start Practice Test</a>
                    </div>
                )
            )}
        </div>
    );
}
