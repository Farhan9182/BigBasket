import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import '../styles.css';

function Login({onClose}) {
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Default token expiration (in seconds)
  const tokenExpirationInSeconds = 3600; // Adjust as needed

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedExpiration = localStorage.getItem('tokenExpiration');

    if (storedToken && storedExpiration) {
      const currentTime = Math.floor(Date.now() / 1000);

      // If the stored token is not expired, set it as authenticated
      if (parseInt(storedExpiration) > currentTime) {
        login();
      }
    }
  }, [login]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userId, password }),
      });

      if (response.ok) {
        const {token} = await response.json();

        // Set the token in localStorage and update tokenExpiration
        localStorage.setItem('authToken', token);

        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = currentTime + tokenExpirationInSeconds;
        localStorage.setItem('tokenExpiration', expirationTime);

        // Log in the user
        login();
      } else {
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('An error occurred while logging in.');
    }
  };

  const handleClose = () => {
    setUserId(''); // Reset user input fields
    setPassword('');
    setLoginError(''); // Clear any error messages
    onClose(); // Call the onClose callback from the parent component
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {loginError && <p className="text-red-500 mb-2">{loginError}</p>}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded ml-2 hover:bg-gray-400"
          onClick={handleClose} // Close the login overlay
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Login;
