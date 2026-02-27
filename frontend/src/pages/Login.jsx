import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, CheckCircle2 } from 'lucide-react';
import './Auth.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard';
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const res = await login(form.email, form.password);
            if (res.success) {
                navigate(redirectTo, { replace: true });
            } else {
                setError(res.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
                    <h1>Welcome Back</h1>
                    <p>Continue your journey. Master the CBT interface, review your Error DNA, and boost your predicted score.</p>

                    <ul className="auth-feature-list">
                        <li><CheckCircle2 size={18} /> Resume exactly where you left off</li>
                        <li><CheckCircle2 size={18} /> Fresh 7-Day Revision Plans</li>
                        <li><CheckCircle2 size={18} /> Unlimited AI Doubt Solving</li>
                    </ul>
                </div>
            </div>

            {/* ── RIGHT SIDE (Clean White Form) ── */}
            <div className="auth-right flex flex-col justify-center items-center">
                <div className="auth-form-container">
                    <div className="text-center mb-8">
                        <Target size={32} color="#0060ff" className="mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Log In</h2>
                        <p className="text-gray-500 text-sm">Enter your credentials to access your dashboard.</p>
                    </div>

                    {error && <div className="auth-error-box mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">⚠️ {error}</div>}

                    <form className="clean-form" onSubmit={handleSubmit}>
                        <div className="form-group-clean w-full">
                            <label>Email Address</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                        </div>

                        <div className="form-group-clean w-full">
                            <div className="flex" style={{ justifyContent: 'space-between' }}>
                                <label>Password</label>
                                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
                        </div>

                        <button type="submit" className="btn-solid-blue-large w-full mt-4" disabled={loading}>
                            {loading ? 'Signing In...' : 'Log In'}
                        </button>
                    </form>

                    <div className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create one free</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
