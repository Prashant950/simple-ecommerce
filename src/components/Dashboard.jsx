import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API (optional for JWT)
      await axios.post('http://localhost:5000/logout');

      // Remove token or session from localStorage
      localStorage.removeItem('token');
      toast.success('Logout successful');

      // Redirect to login
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <>
      <h2>Dashboard Page!!</h2>
      <button onClick={handleLogout}>Logout User</button>
    </>
  );
};

export default Dashboard;
