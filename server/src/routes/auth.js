// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/authController');

// Login route
router.post('/login', login);
router.get('/verify', verify);

module.exports = router;
