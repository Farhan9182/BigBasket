const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: { type: Array, required: true },
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
