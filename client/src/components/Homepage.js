import '../styles.css';
import React, {useState} from 'react';
import Header from './Header';
import Products from './Products';
import Login from './Login';
import { useAuth } from './AuthContext'; 

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);

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
      />
      {!isLoggedIn && <Login />} {/* Conditionally render Login component */}
    </div>
  );
}

export default Homepage;
