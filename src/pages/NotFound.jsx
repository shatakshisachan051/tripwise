import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Go to Home
          </Link>
          <Link to="/destinations" className="explore-button">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 