import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nexus_user')); } catch { return null; }
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data.data;
            localStorage.setItem('nexus_token', token);
            localStorage.setItem('nexus_user', JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const sendOtp = async (name, email) => {
        setLoading(true);
        try {
            await api.post('/auth/send-otp', { name, email });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Failed to send OTP' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, targetExam, otp) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password, targetExam, otp });
            const { token, user } = res.data.data;
            localStorage.setItem('nexus_token', token);
            localStorage.setItem('nexus_user', JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        setUser(null);
    };

    const updatePreferences = async (preferencesData) => {
        setLoading(true);
        try {
            const res = await api.put('/auth/preferences', preferencesData);
            const updatedUser = { ...user, ...res.data.data };
            localStorage.setItem('nexus_user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Failed to update preferences' };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, sendOtp, register, logout, updatePreferences, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
