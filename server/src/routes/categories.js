// routes/cards.js
const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoriesController');

// Get all cards arranged by card types
router.get('/categories', getCategories);

module.exports = router;
