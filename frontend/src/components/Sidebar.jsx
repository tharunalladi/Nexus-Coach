import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, LayoutDashboard, Upload, Dna, CalendarDays, Bot, BarChart3, LogOut, Zap, Sparkles, BookOpen } from 'lucide-react';
import './Sidebar.css';

const NAV = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/practice', icon: Zap, label: 'Practice' },
    { to: '/materials', icon: BookOpen, label: 'Study Materials' },
    { to: '/upload', icon: Upload, label: 'Upload Test' },
    { to: '/analysis', icon: Dna, label: 'Error DNA™' },
    { to: '/plan', icon: CalendarDays, label: 'Revision Plan' },
    { to: '/tutor', icon: Bot, label: 'AI Tutor' },
    { to: '/progress', icon: BarChart3, label: 'Progress' },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';
    const xp = Math.floor(Math.random() * 1000) + 2000;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
            navigate('/');
        }
    };

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon"><Target size={16} color="white" /></div>
                <div>
                    <div className="sidebar-logo-name">NEXUS</div>
                    <div className="sidebar-logo-sub">COACH</div>
                </div>
            </div>

            {/* User */}
            <div className="sidebar-user">
                <div className="sidebar-avatar">{initial}</div>
                <div className="sidebar-user-info">
                    <div className="sidebar-user-name">{user?.name || 'Student'}</div>
                    <div className="sidebar-user-exam">{user?.targetExam || 'JEE'} · 2026</div>
                </div>
                <div className="sidebar-xp"><Zap size={9} />{xp} XP</div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {NAV.map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                        <Icon size={17} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* AI Status */}
            <div className="sidebar-footer">
                <div className="ai-status-card">
                    <div className="ai-status-header">
                        <Sparkles size={12} className="text-brand-1" />
                        <span>NEXUS ENGINE v3.0</span>
                    </div>
                    <div className="ai-status-dot">
                        <div className="dot"></div>
                        Live · Gemini Optimized
                    </div>
                </div>

                <button className="sidebar-logout" onClick={handleLogout}>
                    <LogOut size={15} /> Logout
                </button>
            </div>
        </aside>
    );
}
