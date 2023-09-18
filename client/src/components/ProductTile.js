import React from 'react';
import { useAuth } from './AuthContext';
import '../styles.css';

function ProductTile({ product, onAddToCart, onRemoveFromCart, isInCart }) {
  const { isLoggedIn, login } = useAuth();

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* Product image */}
      <img src={`${product.image}`} alt={product.name} className="w-full h-40 object-cover mb-4" />
      {/* Product name */}
      <p className="text-lg font-semibold">{product.name}</p>
      {/* Quantity dropdown */}
      <div>
        <select className="bg-gray-200 px-4 py-1 w-full rounded mt-2 mb-4">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <span className='text-sm font-semibold'>{product.price || "₹55"}</span>
      <div>
        {/* Save button */}
        <button
          className="bg-white-500 text-black border border-black px-4 py-2 rounded mt-5 mr-5 mb-4"
          onClick={() => {alert('Functionality coming soon')}}
        >
          <i className="fas fa-bookmark"></i>
        </button>
        {/* Add to cart button */}
        {isInCart ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            onClick={() => onRemoveFromCart(product)}
          >
            Remove
          </button>
        ) : (
          <button
            className="bg-white-500 text-red px-4 py-2 rounded border border-red-500 hover:bg-green-600 w-full"
            onClick={() => onAddToCart(product)}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductTile;
