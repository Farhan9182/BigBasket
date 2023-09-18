import React, { useEffect, useState } from 'react';
import ProductTile from './ProductTile';
import { useAuth } from './AuthContext';
import '../styles.css';

function Products({ selectedCategory, searchTerm, cartItems, setCartItems, openLogin }) {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, login } = useAuth();
  useEffect(() => {
    async function getProducts () {
      const response = await fetch('http://localhost:5000/products/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const productsData = await response.json();
        console.log("Products: ", productsData);
        setProducts(productsData);
      }
    }
    getProducts();
  }, []);

  const addToCart = async (product) => {
    if (isLoggedIn) {
      const getToken = () => localStorage.getItem('authToken');
      // Make an API request to save the item to user's cart
      const response = await fetch('http://localhost:5000/cart/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({product}),
      });

      if (response.ok) {
        // Add the item to the cart state
        setCartItems([...cartItems, product]);
      }
    } else {
      alert("Plese login first...");
      openLogin();
    }
  };

  const removeFromCart = async(product) => {
    const getToken = () => localStorage.getItem('authToken');
    // Make an API request to remove the item from user cart
    const response = await fetch('http://localhost:5000/cart/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({productId: product.id}),
    });

    if (response.ok) {
      // Remove the item from the cart state
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    }
  };

  // Filter products based on selected category and search term
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory && product.category !== selectedCategory && product.subcategory !== selectedCategory && product.sub_subcategory !== selectedCategory) {
      return false;
    }

    // Filter by search term (case-insensitive)
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto my-4">
      <span className='ml-4 font-bold'>My Smart Basket</span>
      {/* Product slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart} // Pass the removeFromCart function
            isInCart={cartItems.some((item) => item.id === product.id)} // Check if the product is in the cart
          />
        ))}
      </div>
      {/* Slider arrows */}
    </div>
  );
}

export default Products;
