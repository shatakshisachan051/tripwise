import { useState } from 'react';
import { FaPlay, FaChevronRight } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/images/hero1.jpg',
      title: 'Discover Amazing Destinations',
      description: 'Explore the world\'s most beautiful places'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Unforgettable Experiences',
      description: 'Create memories that last a lifetime'
    }
  ];

  const featuredDestinations = [
    {
      image: '/images/destination1.jpg',
      title: 'Bali',
      description: 'Tropical Paradise'
    },
    {
      image: '/images/destination2.jpg',
      title: 'Paris',
      description: 'City of Love'
    },
    {
      image: '/images/destination3.jpg',
      title: 'Tokyo',
      description: 'Modern Metropolis'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <button className="play-button">
                  <FaPlay /> Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-destinations">
        <div className="section-header">
          <h2>Featured Destinations</h2>
          <a href="/destinations" className="view-all">
            View All <FaChevronRight />
          </a>
        </div>
        <div className="destinations-grid">
          {featuredDestinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <div className="destination-image">
                <img src={destination.image} alt={destination.title} />
              </div>
              <div className="destination-info">
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="travel-inspiration">
        <div className="section-header">
          <h2>Travel Inspiration</h2>
          <a href="/inspiration" className="view-all">
            View All <FaChevronRight />
          </a>
        </div>
        <div className="inspiration-grid">
          <div className="inspiration-card large">
            <img src="/images/inspiration1.jpg" alt="Travel Inspiration" />
            <div className="inspiration-content">
              <h3>Adventure Awaits</h3>
              <p>Discover thrilling experiences around the world</p>
            </div>
          </div>
          <div className="inspiration-card">
            <img src="/images/inspiration2.jpg" alt="Travel Inspiration" />
            <div className="inspiration-content">
              <h3>Cultural Experiences</h3>
              <p>Immerse yourself in local traditions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 