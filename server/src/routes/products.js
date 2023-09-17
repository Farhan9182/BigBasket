// routes/cards.js
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productsController');

// Get all cards arranged by card types
router.get('/products', getProducts);

module.exports = router;
