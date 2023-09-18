import '../styles.css';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Products from './Products';
import Login from './Login';
import { useAuth } from './AuthContext'; 

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoginOpen, setLoginOpen] = useState(true); // Manage login overlay visibility

  useEffect(() => {
    async function getCartItems () {
      const getToken = () => localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/cart/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (response.ok) {
        const cartItemsData = await response.json();
        console.log("Cart Items: ", cartItemsData);
        setCartItems(cartItemsData);
      }
    }
    if (isLoggedIn) {
      getCartItems();   
    }
  }, [isLoggedIn]);

  // Function to open the login overlay
  const openLogin = () => {
    setLoginOpen(true);
  };

  // Function to close the login overlay
  const closeLogin = () => {
    setLoginOpen(false);
  };
  return (
    <div>
      <Header 
        onSelectCategory={setSelectedCategory}
        onSearch={setSearchTerm}
        cartItems={cartItems}
      />
      <Products 
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        cartItems={cartItems}
        setCartItems={setCartItems}
        openLogin={openLogin}
      />
      {!isLoggedIn && isLoginOpen && (
        <Login onClose={closeLogin} /> // Pass onClose function to close the login overlay
      )}
    </div>
  );
}

export default Homepage;
