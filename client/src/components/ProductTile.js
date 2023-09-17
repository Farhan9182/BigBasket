import React from 'react';
import { useAuth } from './AuthContext';
import '../styles.css';

function ProductTile({ product, onAddToCart, onRemoveFromCart, isInCart }) {
  const { isLoggedIn, login } = useAuth();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Show login overlay when user is not logged in
      login();
    } else {
      // Implement logic to add the product to the cart
      // Update cart count in header
    }
  };

  const handleSaveProduct = () => {
    if (!isLoggedIn) {
      // Show login overlay when user is not logged in
      login();
    } else {
      // Implement logic to save the product
      // Update saved items count in header
    }
  };
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* Product image */}
      <img src={`${product.image}`} alt={product.name} className="w-full h-40 object-cover mb-4" />
      {/* Product name */}
      <p className="text-lg font-semibold">{product.name}</p>
      {/* Quantity dropdown */}
      <select className="bg-gray-200 px-4 py-2 rounded mt-2">
        {/* Populate options dynamically */}
      </select>
      {/* Save button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleSaveProduct}
      >
        Save
      </button>
      {/* Add to cart button */}
      {isInCart ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => onRemoveFromCart(product)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductTile;
