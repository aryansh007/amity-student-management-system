import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="navbar">
      <h1>Amity Student Management System</h1>
      {isAuthenticated && (
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
