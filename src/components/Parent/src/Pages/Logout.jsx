// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, such as clearing user session
    // For example: localStorage.removeItem('user');
    
    // Redirect to home page
    navigate('/childinfo');
  };

  return (
    <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}>
      Logout
    </Button>
  );
};

export default Logout;
