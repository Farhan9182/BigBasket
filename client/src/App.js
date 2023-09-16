import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/Routes';

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
