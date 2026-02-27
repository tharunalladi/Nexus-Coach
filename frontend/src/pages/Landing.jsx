import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, CheckCircle2 } from 'lucide-react';
import './Landing.css';

export default function Landing() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const startExam = (examType) => {
        if (isAuthenticated) {
            navigate(`/practice?exam=${examType}`);
        } else {
            navigate(`/login?redirect=${encodeURIComponent(`/practice?exam=${examType}`)}`);
        }
    };
    return (
        <div className="landing-light">
            {/* ── NAVBAR ── */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">
                        <Target size={24} color="#0060ff" />
                        <span>NEXUS COACH</span>
                    </div>
                    <div className="nav-links">
                        <a href="#exams">Start Practice</a>
                        <a href="#features">Features</a>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="login-link">Log in</Link>
                        <Link to="/register" className="btn-solid-blue">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO SECTION ── */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">🚀 #1 AI Exam Prep Platform</div>
                        <h1 className="hero-title">Your Mistakes are Your Roadmap</h1>
                        <p className="hero-desc">
                            Access thousands of personalized mock questions for JEE, NEET, and EAMCET.
                            Master the CBT interface and find your exact Error DNA™ before the real exam day.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/register" className="btn-solid-white">Get Started Free</Link>
                            <Link to="/login" className="btn-outline-white">Login</Link>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        {/* Placeholder for the laptop hero image specified in the screenshot */}
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Student studying on laptop"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            {/* ── EXAM SELECTION ── */}
            <section className="exams-section" id="exams">
                <div className="section-header center">
                    <h2>Choose Your Exam</h2>
                    <p>Select an exam category to begin your personalized practice session.</p>
                </div>

                <div className="exam-cards-wrapper">
                    {/* JEE Card */}
                    <div className="exam-card">
                        <div className="exam-icon green-icon"></div>
                        <h3>JEE MAINS & ADV</h3>
                        <p className="exam-desc">Master the CBT environment. Physics, Chemistry, Math, Full Mock Analysis.</p>
                        <ul className="exam-features">
                            <li>Real Past Questions</li>
                            <li>Instant AI Scoring</li>
                            <li>Timer Simulation</li>
                        </ul>
                        <button onClick={() => startExam('JEE')} className="btn-outline-green">Start JEE Practice</button>
                    </div>

                    {/* NEET Card */}
                    <div className="exam-card">
                        <div className="exam-icon blue-icon"></div>
                        <h3>NEET UG</h3>
                        <p className="exam-desc">Comprehensive coverage for Medical Entrance. Biology, Physics, Chemistry.</p>
                        <ul className="exam-features">
                            <li>NCERT Based Qs</li>
                            <li>Detailed Solutions</li>
                            <li>All Subjects</li>
                        </ul>
                        <button onClick={() => startExam('NEET')} className="btn-outline-blue">Start NEET Practice</button>
                    </div>

                    {/* EAMCET Card */}
                    <div className="exam-card">
                        <div className="exam-icon yellow-icon"></div>
                        <h3>EAMCET / STATE</h3>
                        <p className="exam-desc">Prepare effectively for State Engineering and Agriculture Entrance Exams.</p>
                        <ul className="exam-features">
                            <li>Recent Papers</li>
                            <li>Performance Track</li>
                            <li>Mobile Friendly</li>
                        </ul>
                        <button onClick={() => startExam('EAMCET')} className="btn-outline-yellow">Start EAMCET Practice</button>
                    </div>
                </div>
            </section>

            {/* ── FEATURES SECTION ── */}
            <section className="features-wrapper" id="features">
                <div className="features-container">
                    <div className="features-text">
                        <h2>Why Students Trust NEXUS COACH?</h2>
                        <p>We don't just give you questions; we provide an AI-driven platform that mimics actual exam conditions, fingerprints your weaknesses, and actively boosts your confidence.</p>
                        <Link to="/register" className="btn-solid-blue" style={{ marginTop: '20px', display: 'inline-block' }}>Create Free Account</Link>
                    </div>
                    <div className="features-grid-2x2">
                        <div className="f-card">
                            <h4>Instant Results & Analysis</h4>
                            <p>Get your score and Error DNA™ immediately after submission with AI corrections.</p>
                        </div>
                        <div className="f-card">
                            <h4>Study Anywhere</h4>
                            <p>Optimized for Mobile, Tablet, and Desktop devices with seamless sync.</p>
                        </div>
                        <div className="f-card">
                            <h4>Track Progress</h4>
                            <p>See how you improve over time with our beautiful analytics dashboard.</p>
                        </div>
                        <div className="f-card">
                            <h4>Adaptive 7-Day Plans</h4>
                            <p>Our algorithm instantly generates a revision schedule based on your weak topics.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-banner-wrapper">
                <div className="cta-box">
                    <h2>Ready to get admission this year?</h2>
                    <p>Join thousands of students securing their future with NEXUS COACH.</p>
                    <Link to="/register" className="btn-solid-blue-large">Join Now - It's Free</Link>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer-dark">
                <div className="footer-container">
                    <div className="footer-brand">
                        <div className="f-logo"><Target size={18} /> NEXUS COACH</div>
                        <p>Your all-in-one AI companion for JEE, NEET, and EAMCET. Practice with real past questions, uncover your Error DNA, and track your progress daily.</p>
                        <div className="social-icons">
                            <div className="s-icon">f</div>
                            <div className="s-icon">X</div>
                            <div className="s-icon">in</div>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/register">Start Practice</Link>
                        <Link to="/">Latest News</Link>
                    </div>
                    <div className="footer-links">
                        <h4>Support & Legal</h4>
                        <Link to="/">Help Center / FAQ</Link>
                        <Link to="/">Contact Support</Link>
                        <Link to="/">Privacy Policy</Link>
                    </div>
                    <div className="footer-contact">
                        <h4>Developer Contact</h4>
                        <p><strong>NEXUS EdTech Solutions</strong></p>
                        <p>📞 +91 98765 43210</p>
                        <p>✉️ support@nexuscoach.in</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 NEXUS COACH. All rights reserved.</p>
                    <p>Powered by NEXUS Team</p>
                </div>
            </footer>
        </div>
    );
}
