require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 NEXUS COACH Backend running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n✅ Ready to receive requests\n`);
});
