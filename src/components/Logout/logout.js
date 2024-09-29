// src/components/Logout/logout.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request
      });

      if (response.ok) {
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Navigate to the login page or another page after logout
        navigate('/log-in');
      } else {
        console.error('Logout failed with status:', response.status);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
