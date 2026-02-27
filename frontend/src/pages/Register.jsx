import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, CheckCircle2 } from 'lucide-react';
import './Auth.css';

const EXAMS = ['JEE', 'NEET', 'EAMCET', 'CUET', 'GATE', 'Other'];

export default function Register() {
    const { register, sendOtp } = useAuth();
    const navigate = useNavigate();

    // 1 = Details, 2 = OTP Verification
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({ name: '', email: '', password: '', targetExam: 'JEE', otp: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    // Step 1: Send OTP
    const handleSendOtp = async e => {
        e.preventDefault();
        if (form.password.length < 6) return setError('Password must be at least 6 characters');

        setError(''); setLoading(true);
        try {
            const res = await sendOtp(form.name, form.email);
            if (res.success) {
                setStep(2); // Move to OTP verification
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('Failed to send verification email. Please try again.');
        } finally { setLoading(false); }
    };

    // Step 2: Verify OTP & Register
    const handleVerifyOtp = async e => {
        e.preventDefault();
        if (form.otp.length !== 6) return setError('OTP must be exactly 6 digits');

        setError(''); setLoading(true);
        try {
            const res = await register(form.name, form.email, form.password, form.targetExam, form.otp);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-split-wrapper">
            {/* ── LEFT SIDE (Blue Product Value) ── */}
            <div className="auth-left text-white">
                <nav className="auth-nav">
                    <Target size={20} color="white" />
                    <span>NEXUS COACH</span>
                </nav>

                <div className="auth-left-content">
                    <h1>Join NEXUS COACH</h1>
                    <p>Start your journey to academic success. Practice unlimited questions and uncover your Error DNA against fellow candidates.</p>

                    <ul className="auth-feature-list">
                        <li><CheckCircle2 size={18} /> Real Past Questions</li>
                        <li><CheckCircle2 size={18} /> Instant AI Error Corrections</li>
                        <li><CheckCircle2 size={18} /> Performance Tracking</li>
                        <li><CheckCircle2 size={18} /> 7-Day Revision Plans</li>
                    </ul>
                </div>
            </div>

            {/* ── RIGHT SIDE (Clean White Form) ── */}
            <div className="auth-right flex flex-col justify-center items-center">
                <div className="auth-form-container">
                    <div className="text-center mb-8">
                        <Target size={32} color="#0060ff" className="mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                        <p className="text-gray-500 text-sm">It takes less than a minute</p>
                    </div>

                    {error && <div className="auth-error-box mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">⚠️ {error}</div>}

                    {step === 1 ? (
                        <form className="clean-form" onSubmit={handleSendOtp}>
                            <div className="form-group-clean">
                                <label>Full Name</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group-clean">
                                <label>Email Address</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                            </div>

                            <div className="form-row-clean">
                                <div className="form-group-clean w-full">
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
                                </div>
                                <div className="form-group-clean w-full">
                                    <label>Target Exam</label>
                                    <select name="targetExam" value={form.targetExam} onChange={handleChange}>
                                        {EXAMS.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-terms mt-4 mb-6 text-xs text-gray-500 flex items-start gap-2">
                                <input type="checkbox" required className="mt-1" />
                                <span>I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</span>
                            </div>

                            <button type="submit" className="btn-solid-blue-large w-full" disabled={loading}>
                                {loading ? 'Sending Verification...' : 'Create Account'}
                            </button>
                        </form>
                    ) : (
                        <form className="clean-form" onSubmit={handleVerifyOtp}>
                            <p className="text-sm text-gray-600 mb-6 text-center">
                                We've sent a 6-digit code to <strong>{form.email}</strong>.
                            </p>
                            <div className="form-group-clean text-center">
                                <label>Verification Code</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={form.otp}
                                    onChange={e => setForm(f => ({ ...f, otp: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) }))}
                                    placeholder="000000"
                                    className="text-center text-2xl tracking-widest"
                                    required
                                    maxLength={6}
                                />
                            </div>

                            <button type="submit" className="btn-solid-blue-large w-full mt-6" disabled={loading || form.otp.length !== 6}>
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button type="button" className="text-sm text-blue-600 w-full mt-4 text-center hover:underline" onClick={() => setStep(1)}>
                                Edit Details
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-6 text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
