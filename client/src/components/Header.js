import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        const response = await fetch('http://localhost:5000/categories/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const categoriesData = await response.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');

        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (value) => {
    onSelectCategory(value);
    setSelectedCategory(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white-800 text-white py-4">
      <div className="container mx-auto flex items-center">
        {/* Logo */}
        <Link to="/" className="relative inline-block ml-4 mr-4">
          <img src={`https://firebasestorage.googleapis.com/v0/b/my-first-project-29bc7.appspot.com/o/JobRobo%2FbrandIcon%2Fbb_icon.webp?alt=media&token=19a6eb05-3c96-4d8e-ada8-1b684ff81d58`} alt={"icon"} className="w-auto aspect-w-16 aspect-h-9 h-10" />
        </Link>
        {/* Category dropdown */}
        <div className="relative inline-block mr-4">
          <button
            className="bg-green-700 text-white px-2 py-3 rounded"
            onClick={() => toggleMenu()}
          >
            {selectedCategory || 'Shop By Category'}
          </button>
          {categories.length > 0 && menuOpen && (
            <ul className="absolute mt-2 space-y-1 bg-gray-700 text-white rounded-lg flex space-x-4">
              <li key={0}>
                <button
                  className="px-4 py-2 text-left hover:bg-gray-600"
                  onClick={() => handleCategoryChange('')}
                >
                {`All`}  
                </button>
              </li>
              {categories.map((category) => (
                <li key={category._id}>
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-600"
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </button>
                  {category.subcategories.length > 0 && category.name === selectedCategory && (
                    <ul className="bg-gray-700 text-white flex flex-wrap">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.name}>
                          <button
                            className="px-4 py-2 text-left hover:bg-gray-600"
                            onClick={() => handleCategoryChange(subcategory.name)}
                          >
                            {subcategory.name}
                          </button>
                          {subcategory.subsubcategories && subcategory.subsubcategories.length > 0 && subcategory.name === selectedCategory && (
                            <ul className="bg-gray-700 text-white flex flex-wrap">
                              {subcategory.subsubcategories.map((subsubcategory) => (
                                <li key={subsubcategory}>
                                  <button
                                    className="px-4 py-2 text-left hover:bg-gray-600"
                                    onClick={() => handleCategoryChange(subsubcategory)}
                                  >
                                    {subsubcategory}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Search box */}
        <input
          type="text"
          placeholder="Search products..."
          className="bg-white-700 text-black border px-4 py-2 w-full rounded "
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Cart icon */}
        <p onClick={() => {alert("View Cart feature coming soon")}} className="ml-4 relative mr-2">
          <i className="fas fa-shopping-cart text-black text-2xl"></i>
          {isLoggedIn && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
              {cartItems.length} {/* Display the item count */}
            </span>
          )}
        </p>
      </div>
    </header>
  );
}

export default Header;
