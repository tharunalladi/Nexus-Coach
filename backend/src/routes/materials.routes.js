const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { getMaterials } = require('../controllers/materials.controller');

router.get('/', authenticate, getMaterials);

module.exports = router;
