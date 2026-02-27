import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Plan from './pages/Plan';
import AITutor from './pages/AITutor';
import Progress from './pages/Progress';
import Practice from './pages/Practice';
import Materials from './pages/Materials';

// Redirects unauthenticated users to /login, preserving the intended destination
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if (!isAuthenticated) {
        const redirect = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?redirect=${redirect}`} replace />;
    }
    return children;
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirectParam = params.get('redirect') || '/dashboard';

    return (
        <Routes>
            <Route path="/" element={<Landing />} />

            {/* If already logged in, go to redirect param or dashboard */}
            <Route path="/login" element={isAuthenticated ? <Navigate to={redirectParam} replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

            <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><AppLayout><Upload /></AppLayout></ProtectedRoute>} />
            <Route path="/analysis" element={<ProtectedRoute><AppLayout><Analysis /></AppLayout></ProtectedRoute>} />
            <Route path="/plan" element={<ProtectedRoute><AppLayout><Plan /></AppLayout></ProtectedRoute>} />
            <Route path="/tutor" element={<ProtectedRoute><AppLayout><AITutor /></AppLayout></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><AppLayout><Progress /></AppLayout></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><AppLayout><Practice /></AppLayout></ProtectedRoute>} />
            <Route path="/materials" element={<ProtectedRoute><AppLayout><Materials /></AppLayout></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const AppLayout = ({ children }) => (
    <div className="app-layout">
        <Sidebar />
        <main className="main-content">{children}</main>
    </div>
);

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}
