import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { currentTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar" style={{ backgroundColor: currentTheme.colors.surface }}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            TripWise
          </Link>
          {currentUser && (
            <div className="user-email" style={{ color: currentTheme.colors.textSecondary }}>
              {currentUser.email}
            </div>
          )}
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          ☰
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/destinations" className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}>
            Destinations
          </Link>
          <Link to="/attractions" className={`nav-link ${isActive('/attractions') ? 'active' : ''}`}>
            Attractions
          </Link>
          {/* <Link to="/hotels" className={`nav-link ${isActive('/hotels') ? 'active' : ''}`}>
            Hotels
          </Link>
          <Link to="/deals" className={`nav-link ${isActive('/deals') ? 'active' : ''}`}>
            Deals
          </Link> */}
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>

          {currentUser ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button secondary">
                Login
              </Link>
              <Link to="/signup" className="nav-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 