import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles.css';

function Header({ onSelectCategory, onSearch, cartItems}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await axios.get('http://localhost:5000/user/profile');
        setCategories(categoriesData.data);
      } catch (error) {
        localStorage.removeItem('token');
        console.error(error);
        navigate('/login');
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    onSelectCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold ml-4">
          Logo
        </Link>
        {/* Category dropdown */}
        <ul className="relative inline-block ml-4">
          <li className="group">
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <optgroup key={category.name} label={category.name}>
                  {category.subcategories &&
                    category.subcategories.map((subcategory) => (
                      <optgroup
                        key={subcategory.name}
                        label={subcategory.name}
                      >
                        {subcategory.subsubcategories &&
                          subcategory.subsubcategories.map(
                            (subsubcategory) => (
                              <option
                                key={subsubcategory}
                                value={subsubcategory}
                              >
                                {subsubcategory}
                              </option>
                            )
                          )}
                      </optgroup>
                    ))}
                </optgroup>
              ))}
            </select>
            {selectedCategory && (
              <ul className="absolute hidden mt-2 space-y-1 bg-gray-700 text-white rounded-lg group-hover:block">
                {/* Display subcategories */}
                {categories.map((category) =>
                  category.name === selectedCategory &&
                  category.subcategories &&
                  category.subcategories.length > 0 ? (
                    category.subcategories.map((subcategory) => (
                      <li key={subcategory.name}>
                        <button
                          className="block px-4 py-2 text-left hover:bg-gray-600 w-full"
                          onClick={() => {
                            // Handle subcategory selection here
                            onSelectCategory(subcategory.name);
                            setSelectedCategory(subcategory.name);
                          }}
                        >
                          {subcategory.name}
                        </button>
                      </li>
                    ))
                  ) : null
                )}
              </ul>
            )}
          </li>
        </ul>
        {/* Search box */}
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-700 text-white px-4 py-2 rounded ml-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Save icon */}
        <Link to="/saved" className="ml-4">
          <i className="fas fa-heart text-2xl"></i>
          {isLoggedIn && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">0</span>}
        </Link>
        {/* Cart icon */}
        <Link to="/cart" className="ml-4 relative">
          <i className="fas fa-shopping-cart text-2xl"></i>
          {isLoggedIn && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
              {cartItems.length} {/* Display the item count */}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
