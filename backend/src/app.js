const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const analysisRoutes = require('./routes/analysis.routes');
const planRoutes = require('./routes/plan.routes');
const aiRoutes = require('./routes/ai.routes');
const progressRoutes = require('./routes/progress.routes');
const chatRoutes = require('./routes/chat.routes');
const practiceRoutes = require('./routes/practice.routes');
const materialsRoutes = require('./routes/materials.routes');

const app = express();

// ─── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ─────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🎯 NEXUS COACH API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

app.get('/api/v1/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tests', testRoutes);
app.use('/api/v1/analysis', analysisRoutes);
app.use('/api/v1/plan', planRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/practice', practiceRoutes);
app.use('/api/v1/materials', materialsRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

module.exports = app;
