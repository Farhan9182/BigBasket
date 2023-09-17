const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const existingUser = await Users.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and send a JWT token
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
        token,
        userDetails: existingUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify controller (Check if the user is authenticated)
const verify = (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ username: decodedData.username, id: decodedData.id });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { login, verify };
