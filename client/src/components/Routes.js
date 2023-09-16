import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './Cart';
import SavedItems from './SavedItems';

// Check if the user is authenticated (has a valid JWT)
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? (
    <>{element}</>
  ) : (
    // If not authenticated, navigate to the homepage
    <Navigate to="/" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
      <Route path="/saved-items" element={<ProtectedRoute element={<SavedItems />} />} />
    </Routes>
  );
};

export default AppRoutes;
