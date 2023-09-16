import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white py-4">
      <Link to="/" className="text-2xl font-bold ml-4">
        {/* Logo */}
      </Link>
      {/* Dropdown for filtering */}
      {/* Search box */}
      <Link to="/saved-items" className="text-2xl font-bold ml-4">
        {/* Saved Items */}
      </Link>
      <Link to="/cart" className="text-2xl font-bold ml-4">
        {/* Cart Items */}
      </Link>
    </header>
  );
}

export default Header;
