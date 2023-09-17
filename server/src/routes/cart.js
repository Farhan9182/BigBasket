// routes/cards.js
const express = require('express');
const router = express.Router();
const { getCartData, addToCart, removeFromCart } = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Get all cards arranged by card types
router.get('/cart', authenticateUser, getCartData);
router.post('/cart', authenticateUser, addToCart);
router.delete('/cart', authenticateUser, removeFromCart);

module.exports = router;
