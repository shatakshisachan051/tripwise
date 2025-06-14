import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="TripWise" />
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="Search destinations, attractions, hotels..." />
          <FaSearch className="search-icon" />
        </div>

        <div className="nav-menu">
          <Link to="/destinations" className="nav-item">Destinations</Link>
          <Link to="/attractions" className="nav-item">Attractions</Link>
          <Link to="/questionnaire" className="nav-item">Plan My Trip</Link>
        </div>

        <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/destinations" className="mobile-nav-item">Destinations</Link>
          <Link to="/attractions" className="mobile-nav-item">Attractions</Link>
          <Link to="/questionnaire" className="mobile-nav-item">Plan My Trip</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 