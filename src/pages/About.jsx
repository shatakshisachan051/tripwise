import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About TripWise</h1>
        <p>Your AI-Powered Travel Companion</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At TripWise, we're revolutionizing the way people plan their travels. 
            Our AI-powered platform helps you discover, plan, and experience the perfect trip, 
            tailored to your preferences and needs.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Recommendations</h3>
              <p>Get personalized destination suggestions based on your interests and preferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Detailed Guides</h3>
              <p>Access comprehensive information about destinations, including attractions, local culture, and tips.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>User Reviews</h3>
              <p>Read authentic experiences from fellow travelers and share your own.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Planning</h3>
              <p>Save your favorite destinations and create personalized travel itineraries.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Search & Discover</h3>
              <p>Browse through our curated collection of destinations or use our smart search to find your next adventure.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Save & Plan</h3>
              <p>Save your favorite destinations and let our AI help you create the perfect itinerary.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Explore & Share</h3>
              <p>Visit your chosen destinations and share your experiences with the TripWise community.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Join Our Community</h2>
          <p>
            Be part of a growing community of travelers who are making their travel dreams come true. 
            Share your experiences, discover new places, and connect with fellow adventurers.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button primary">Get Started</Link>
            <Link to="/destinations" className="cta-button secondary">Explore Destinations</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 