const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Products = require('../models/products');

// Categories controller
const getProducts = async (req, res) => {
  try {
    // Get all products
    const productsData = await Products.find();

    res.status(200).json(productsData);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProducts };
