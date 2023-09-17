const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  sub_subcategory: { type: String, required: false },
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
