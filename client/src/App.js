import React from 'react';
import './styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/Routes';
import { AuthProvider } from './components/AuthContext';
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
