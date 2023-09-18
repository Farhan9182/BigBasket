const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Carts = require('../models/cart');

// Cart controller
const getCartData = async (req, res) => {
  try {
    const {id} = req?.user || 0;
    // Get all cart items of the user
    const cartData = await Carts.find({userId: id});
    res.status(200).json(cartData[0]?.items || []);
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const {id} = req.user;
    const {product} = req.body;
    // Add new item to user's cart
    const userCart = await Carts.findOne({ userId: id });
    if (!userCart) {
        const newCart = new Carts({
          userId,
          items: [{ ...product, quantity: 1 }], // Add the product with a quantity of 1
        });

        await newCart.save();
  
        return res.status(200).json({ message: 'Item added to cart' });
    }

    userCart.items.push({ ...product, quantity: 1 });
    // Save the updated cart back to the database
    await userCart.save();

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const {id} = req.user;
    const {productId} = req.body;
    // Remove an item from user's cart
    // Find the user's cart in the database by userId
    const userCart = await Carts.findOne({ userId: id });

    // If the user's cart doesn't exist, return an error
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item with the specified productId in the cart's items array
    const itemIndexToRemove = userCart.items.findIndex(
      (item) => item.id === productId
    );

    // If the item with the specified productId is not found, return an error
    if (itemIndexToRemove === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart's items array
    userCart.items.splice(itemIndexToRemove, 1);

    // Save the updated cart back to the database
    await userCart.save();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCartData, addToCart, removeFromCart };
