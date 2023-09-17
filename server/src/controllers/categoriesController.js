const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Categories = require('../models/categories');

// Categories controller
const getCategories = async (req, res) => {
  try {
    // Get all categories, subcategories and sub_subcategories
    const categoriesData = await Categories.find();

    res.status(200).json(categoriesData);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCategories };
