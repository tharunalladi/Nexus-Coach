import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Upload as UploadIcon, CheckCircle, ArrowRight, Plus, Trash2, AlertCircle } from 'lucide-react';

const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
const ERROR_TYPES = ['conceptual', 'calculation', 'silly', 'time_pressure'];

export default function Upload() {
    const navigate = useNavigate();
    const [stage, setStage] = useState('idle');
    const [form, setForm] = useState({
        examType: 'Full Mock',
        totalQuestions: 90,
        attempted: '',
        correct: '',
        timeTakenMins: '',
    });
    const [wrongTopics, setWrongTopics] = useState([
        { subject: 'Physics', topic: '', errorType: 'conceptual' }
    ]);
    const [error, setError] = useState('');

    const addRow = () => setWrongTopics(p => [...p, { subject: 'Physics', topic: '', errorType: 'conceptual' }]);
    const removeRow = (i) => setWrongTopics(p => p.filter((_, idx) => idx !== i));
    const updateRow = (i, key, val) => setWrongTopics(p => p.map((r, idx) => idx === i ? { ...r, [key]: val } : r));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const filledTopics = wrongTopics.filter(t => t.topic.trim());
        if (filledTopics.length === 0) {
            setError('Please enter at least one topic you got wrong.');
            return;
        }

        const answers = filledTopics.map((t, i) => ({
            questionNo: i + 1,
            subject: t.subject,
            topic: t.topic.trim(),
            isCorrect: false,
            errorType: t.errorType,
            timeSecs: 60
        }));

        const incorrect = answers.length;
        const correct = parseInt(form.correct) || (parseInt(form.attempted) - incorrect) || 0;

        setStage('uploading');
        try {
            const res = await api.post('/tests/upload', { ...form, incorrect, correct, answers });
            setStage('analyzing');
            await api.post('/analysis/run', { answers });
            setStage('done');
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed. Make sure you are logged in.');
            setStage('idle');
        }
    };

    if (stage === 'uploading' || stage === 'analyzing') {
        return (
            <div className="page-loading">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{stage === 'uploading' ? '📤' : '🧬'}</div>
                <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
                <h3>{stage === 'uploading' ? 'Uploading your test results...' : 'AI is building your Error DNA profile...'}</h3>
                <p className="text-muted text-sm">Analyzing your mistakes with 7-stage diagnostic engine</p>
            </div>
        );
    }

    if (stage === 'done') {
        return (
            <div className="page-loading">
                <CheckCircle size={64} color="var(--success)" />
                <h2>Analysis Complete!</h2>
                <p className="text-muted">Your personalized Error DNA profile has been updated based on your real performance data</p>
                <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                    <button className="btn btn-primary" onClick={() => navigate('/analysis')}><ArrowRight size={16} />View Error DNA</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/plan')}>Generate Plan</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 720 }}>
            <div className="page-header">
                <h1><UploadIcon size={28} style={{ display: 'inline', marginRight: 10, color: 'var(--brand-1)' }} />Upload Mock Test Results</h1>
                <p className="text-muted">Enter your actual performance data. Your Error DNA and revision plan will be built entirely from your real mistakes.</p>
            </div>

            {error && (
                <div className="auth-error" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Score Overview */}
                <div className="card">
                    <h3 style={{ marginBottom: 20 }}>📊 Test Overview</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { label: 'Exam Type', key: 'examType', type: 'select', options: ['Full Mock', 'Subject Mock', 'Chapter Test', 'Previous Year Paper'] },
                            { label: 'Total Questions', key: 'totalQuestions', type: 'number', placeholder: '90' },
                            { label: 'Attempted', key: 'attempted', type: 'number', placeholder: '0' },
                            { label: 'Correct', key: 'correct', type: 'number', placeholder: '0' },
                            { label: 'Time Taken (mins)', key: 'timeTakenMins', type: 'number', placeholder: '180' },
                        ].map(f => (
                            <div key={f.key} className="form-group">
                                <label>{f.label}</label>
                                {f.type === 'select' ? (
                                    <select className="input" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}>
                                        {f.options.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                ) : (
                                    <input className="input" type="number" placeholder={f.placeholder}
                                        value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wrong Topics */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ margin: 0 }}>❌ Topics I Got Wrong</h3>
                        <button type="button" className="btn btn-secondary" onClick={addRow} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px' }}>
                            <Plus size={14} /> Add Topic
                        </button>
                    </div>
                    <p className="text-muted text-sm" style={{ marginBottom: 16 }}>Enter each topic where you made a mistake. Be specific — this directly powers your Error DNA™ and revision plan.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {wrongTopics.map((row, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr auto', gap: 12, alignItems: 'center' }}>
                                <select className="input" value={row.subject} onChange={e => updateRow(i, 'subject', e.target.value)}>
                                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                                </select>
                                <input className="input" type="text" placeholder="Topic (e.g. Rotational Mechanics)"
                                    value={row.topic} onChange={e => updateRow(i, 'topic', e.target.value)} required />
                                <select className="input" value={row.errorType} onChange={e => updateRow(i, 'errorType', e.target.value)}>
                                    {ERROR_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                                </select>
                                <button type="button" onClick={() => removeRow(i)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px', fontSize: '1rem' }}>
                    <UploadIcon size={16} /> Analyze My Performance
                </button>
            </form>
        </div>
    );
}
