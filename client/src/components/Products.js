import React, { useState } from 'react';
import ProductTile from './ProductTile';
import '../styles.css';

function Products({ selectedCategory, searchTerm, cartItems, setCartItems }) {
  // Sample data, replace with your actual product data
  const products = [
    { id: 1, name: 'Product 1', image: 'https://firebasestorage.googleapis.com/v0/b/my-first-project-29bc7.appspot.com/o/JobRobo%2FproductImages%2Fproduct1.jpg?alt=media&token=015466bf-2622-4344-bb75-443fe2c0140f', category: 'category_1', subcategory: 'subCategory_1.1', sub_subcategory: 'subCategory_1.1.1' },
    { id: 2, name: 'Product 2', image: 'https://firebasestorage.googleapis.com/v0/b/my-first-project-29bc7.appspot.com/o/JobRobo%2FproductImages%2Fproduct2.jpg?alt=media&token=987f0b65-2db8-4e5c-8128-f1455295f25d', category: 'category_2', subcategory: 'subCategory_2.1', sub_subcategory: 'subCategory_2.1.1' },
    { id: 3, name: 'Product 3', image: 'https://firebasestorage.googleapis.com/v0/b/my-first-project-29bc7.appspot.com/o/JobRobo%2FproductImages%2Fproduct3.jpg?alt=media&token=b3ec3802-639d-4651-9afb-0910a056f241', category: 'category_3', subcategory: 'subCategory_3.1', sub_subcategory: 'subCategory_3.1.1' },
    { id: 4, name: 'Product 4', image: 'https://firebasestorage.googleapis.com/v0/b/my-first-project-29bc7.appspot.com/o/JobRobo%2FproductImages%2Fproduct4.jpg?alt=media&token=d3afdecd-8fe1-486c-a1e8-615e26dfd0c3', category: 'category_4', subcategory: 'subCategory_4.1', sub_subcategory: 'subCategory_4.1.1' },
    { id: 5, name: 'Product 5', image: 'product5.jpg', category: 'category_5', subcategory: 'subCategory_5.1', sub_subcategory: 'subCategory_5.1.1' },
    // Add more product objects
  ];

  const addToCart = (product) => {
    // Make an API request to save the item to the backend
    
    // Add the item to the cart state
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    // Make an API request to save the item to the backend

    // Remove the item from the cart state
    const updatedCart = cartItems.filter((item) => item.productId !== product.id);
    setCartItems(updatedCart);
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
      {/* Product slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart} // Pass the removeFromCart function
            isInCart={cartItems.some((item) => item.productId === product.id)} // Check if the product is in the cart
          />
        ))}
      </div>
      {/* Slider arrows */}
    </div>
  );
}

export default Products;
