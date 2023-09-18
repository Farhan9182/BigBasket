const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  items: { type: Array, required: true },
});

const Carts = mongoose.model('Carts', cartSchema);

module.exports = Carts;
