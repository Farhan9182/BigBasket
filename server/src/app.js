const express = require('express');
const cors = require('cors'); // CORS middleware if needed
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // CORS for cross-origin requests if needed
// app.use(cookieParser()); // Parse cookies if needed
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "JobRobo"
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');

app.use('/auth', authRoutes); // Authentication routes
app.use('/cart', cartRoutes); // Cart routes
app.use('/categories', categoriesRoutes); // Categories routes
app.use('/products', productsRoutes); // Products routes
/** Error handling */
app.use((req, res) => {
    const error = new Error('route not found');
    return res.status(404).json({
      code: '00004',
      message: "Route not found",
    });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
