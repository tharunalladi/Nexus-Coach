const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/mysql');
const { sendOTPEmail } = require('../services/email.service');

const generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

// ─── Send OTP ─────────────────────────────────────────────────────────────────
const sendOtp = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        const normalizedEmail = email.toLowerCase();

        // 1. Check if user exists in Database
        const [existingUsers] = await query('SELECT email FROM users WHERE email = ?', [normalizedEmail]);
        if (existingUsers && existingUsers.length > 0) {
            return res.status(409).json({ success: false, message: 'Email is already registered.' });
        }

        // 2. Generate 6 digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // 3. Store OTP in Database (Upsert: update if email already requested OTP)
        await query(`
            INSERT INTO otps (email, code, expiresAt) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE code = ?, expiresAt = ?
        `, [normalizedEmail, otpCode, expiresAt, otpCode, expiresAt]);

        // 4. Send Email
        await sendOTPEmail(email, otpCode, name || 'Student');

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully to your email.'
        });
    } catch (err) {
        next(err);
    }
};

// ─── Register ─────────────────────────────────────────────────────────────────
const register = async (req, res, next) => {
    try {
        const { name, email, password, targetExam, targetYear, otp } = req.body;
        const normalizedEmail = email.toLowerCase();

        // 1. Verify OTP from DB
        const [otpRecords] = await query('SELECT * FROM otps WHERE email = ?', [normalizedEmail]);

        if (!otpRecords || otpRecords.length === 0) {
            return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
        }

        const storedOtp = otpRecords[0];

        if (storedOtp.code !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP code. Please try again.' });
        }

        if (Date.now() > storedOtp.expiresAt) {
            await query('DELETE FROM otps WHERE email = ?', [normalizedEmail]);
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        // 2. Clear OTP
        await query('DELETE FROM otps WHERE email = ?', [normalizedEmail]);

        // 3. Hash Password & Create User
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const tYear = targetYear || new Date().getFullYear() + 1;

        await query(`
            INSERT INTO users (id, name, email, password, targetExam, targetYear)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, name, normalizedEmail, hashedPassword, targetExam, tYear]);

        const token = generateToken({ id: userId, email: normalizedEmail, name });

        res.status(201).json({
            success: true,
            message: 'Account verified and created successfully!',
            data: {
                token,
                user: { id: userId, name, email: normalizedEmail, targetExam },
            },
        });
    } catch (err) {
        // Handle race condition if someone registered the email at the exact same moment
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Email already registered.' });
        }
        next(err);
    }
};

// ─── Login ────────────────────────────────────────────────────────────────────
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        // 1. Fetch from Database
        const [users] = await query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);

        if (!users || users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const user = users[0];

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // 3. Issue Token
        const token = generateToken({ id: user.id, email: user.email, name: user.name });

        res.json({
            success: true,
            message: 'Login successful!',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    targetExam: user.targetExam,
                    weeklyStudyHours: user.weeklyStudyHours,
                    weakSubjects: user.weakSubjects ? (typeof user.weakSubjects === 'string' ? JSON.parse(user.weakSubjects) : user.weakSubjects) : null,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
    try {
        const [users] = await query('SELECT id, name, email, targetExam, weeklyStudyHours, weakSubjects, createdAt FROM users WHERE id = ?', [req.user.id]);

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = users[0];

        // Parse weakSubjects if it's a string (since it's a JSON column, some mysql versions return it as parsed, some as string)
        if (user.weakSubjects && typeof user.weakSubjects === 'string') {
            try { user.weakSubjects = JSON.parse(user.weakSubjects); } catch (e) { }
        }

        res.json({
            success: true,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

// ─── Update Preferences ───────────────────────────────────────────────────────
const updatePreferences = async (req, res, next) => {
    try {
        const { weeklyStudyHours, weakSubjects } = req.body;

        const weakSubjectsJson = JSON.stringify(weakSubjects || []);

        await query(
            'UPDATE users SET weeklyStudyHours = ?, weakSubjects = ? WHERE id = ?',
            [weeklyStudyHours, weakSubjectsJson, req.user.id]
        );

        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: {
                weeklyStudyHours,
                weakSubjects
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { sendOtp, register, login, getMe, updatePreferences };
