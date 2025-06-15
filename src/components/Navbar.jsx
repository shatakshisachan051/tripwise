import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">✈️</span>
            <span className="logo-text">TripWise</span>
          </Link>
          {currentUser && (
            <div className="user-email">
              {currentUser.email}
            </div>
          )}
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/destinations" className="nav-link">Destinations</Link>
          <Link to="/attractions" className="nav-link">Attractions</Link>
          {/* <Link to="/hotels" className="nav-link">Hotels</Link>
          <Link to="/deals" className="nav-link">Deals</Link> */}
          <Link to="/about" className="nav-link">About</Link>
        </div>

        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-button">Dashboard</Link>
              <button onClick={handleLogout} className="nav-button logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/signup" className="nav-button signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 