# 🎯 NEXUS COACH — Personalized Entrance Exam Coach

> AI-powered platform that analyzes student mock test errors and generates adaptive 7-day revision plans.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![AI](https://img.shields.io/badge/AI-Grok%203%20(xAI)-orange)

---

## 📁 Project Structure

```
Exam Coach/
├── frontend/          # React + Vite + TypeScript
└── backend/           # Node.js + Express REST API
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```
Backend runs at: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, TypeScript, Recharts, Framer Motion |
| Backend | Node.js, Express, JWT Auth |
| AI | Google Gemini 1.5 Pro |
| Styling | CSS Variables + Custom Design System |

---

## 🎯 Key Features

- **Error DNA™ Analysis** — Unique student weakness fingerprint
- **7-Day Adaptive Revision Plan** — AI-generated personalized schedule
- **AI Doubt Tutor** — Powered by Gemini 1.5 Pro
- **Burnout Prediction** — Early intervention system
- **Performance Forecasting** — ML-predicted exam scores
- **Gamification** — XP, badges, streaks

---

*Built for 24-hour hackathon | NEXUS COACH © 2026*
