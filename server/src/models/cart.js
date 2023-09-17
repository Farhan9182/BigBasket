const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  items: { type: Array, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
