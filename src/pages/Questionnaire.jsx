import React, { useState } from 'react';
import { FaPlane, FaHotel, FaUtensils, FaCamera, FaHiking, FaSwimmer, FaBook, FaShoppingBag, FaUsers, FaUser, FaChild, FaCrown, FaFilter, FaStar, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Questionnaire.css';
import { saveDestination } from '../services/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Questionnaire = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    minMatchScore: 0,
    priceRange: '',
    activities: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    destination: '',
    travelDates: {
      start: '',
      end: ''
    },
    budget: '',
    preferences: {
      accommodation: '',
      activities: [],
      cuisine: [],
      transportation: ''
    },
    groupSize: '',
    specialRequirements: ''
  });

  const interests = [
    { id: 'beach', name: 'Beach', icon: <FaSwimmer /> },
    { id: 'culture', name: 'Culture', icon: <FaBook /> },
    { id: 'adventure', name: 'Adventure', icon: <FaHiking /> },
    { id: 'food', name: 'Food', icon: <FaUtensils /> },
    { id: 'shopping', name: 'Shopping', icon: <FaShoppingBag /> },
    { id: 'nightlife', name: 'Nightlife', icon: <FaUsers /> },
    { id: 'relaxation', name: 'Relaxation', icon: <FaHotel /> },
    { id: 'photography', name: 'Photography', icon: <FaCamera /> }
  ];

  const travelStyles = [
    { id: 'solo', label: 'Solo Travel', icon: <FaUser /> },
    { id: 'family', label: 'Family', icon: <FaChild /> },
    { id: 'couple', label: 'Couple', icon: <FaUsers /> },
    { id: 'luxury', label: 'Luxury', icon: <FaCrown /> },
  ];

  const activities = [
    { id: 'sightseeing', label: 'Sightseeing', icon: <FaCamera /> },
    { id: 'hiking', label: 'Hiking', icon: <FaHiking /> },
    { id: 'beach', label: 'Beach Activities', icon: <FaSwimmer /> },
    { id: 'museums', label: 'Museums', icon: <FaBook /> },
    { id: 'shopping', label: 'Shopping', icon: <FaShoppingBag /> },
    { id: 'dining', label: 'Fine Dining', icon: <FaUtensils /> },
  ];

  const recommendations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      description: 'A tropical paradise known for its lush landscapes, vibrant culture, and spiritual atmosphere.',
      matchScore: 0,
      priceRange: 'Budget to Luxury',
      activities: ['Beach', 'Cultural', 'Adventure', 'Wellness'],
      bestFor: ['Couples', 'Solo Travelers', 'Families'],
      highlights: [
        'Sacred Monkey Forest Sanctuary',
        'Tegallalang Rice Terraces',
        'Ubud Art Market',
        'Mount Batur Sunrise Trek'
      ],
      weather: 'Tropical (25-35°C)',
      bestTimeToVisit: 'April to October',
      averageCost: 1500,
      travelTips: [
        'Rent a scooter for easy transportation',
        'Visit temples early morning to avoid crowds',
        'Try local warungs for authentic cuisine',
        'Book accommodations in advance during peak season'
      ],
      localCuisine: [
        'Nasi Goreng',
        'Satay',
        'Babi Guling',
        'Bebek Betutu'
      ],
      culturalNotes: 'Respect temple dress codes and local customs. Learn basic Bahasa phrases.'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      description: 'Ancient capital of Japan, home to numerous Buddhist temples, Shinto shrines, and traditional gardens.',
      matchScore: 0,
      priceRange: 'Mid to Luxury',
      activities: ['Cultural', 'Historical', 'Food', 'Nature'],
      bestFor: ['Couples', 'Solo Travelers', 'Culture Enthusiasts'],
      highlights: [
        'Fushimi Inari Shrine',
        'Arashiyama Bamboo Grove',
        'Kinkaku-ji (Golden Pavilion)',
        'Gion District'
      ],
      weather: 'Temperate (5-35°C)',
      bestTimeToVisit: 'March-May and October-November',
      averageCost: 2500,
      travelTips: [
        'Get a Japan Rail Pass for efficient travel',
        'Book ryokan stays in advance',
        'Visit temples during early morning or evening',
        'Try kaiseki dining experience'
      ],
      localCuisine: [
        'Kaiseki Ryori',
        'Matcha Sweets',
        'Yudofu',
        'Kyoto-style Sushi'
      ],
      culturalNotes: 'Learn basic Japanese etiquette. Remove shoes when required. Be quiet in temples.'
    },
    {
      id: 3,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      description: 'Iconic Greek island known for its stunning sunsets, white-washed buildings, and volcanic beaches.',
      matchScore: 0,
      priceRange: 'Luxury',
      activities: ['Beach', 'Romantic', 'Cultural', 'Food'],
      bestFor: ['Couples', 'Honeymooners', 'Photography Enthusiasts'],
      highlights: [
        'Oia Village Sunset Views',
        'Ancient Thera Ruins',
        'Red Beach',
        'Wine Tasting Tours'
      ],
      weather: 'Mediterranean (15-35°C)',
      bestTimeToVisit: 'May to October',
      averageCost: 3000,
      travelTips: [
        'Book sunset views in advance',
        'Rent an ATV for island exploration',
        'Visit beaches early morning',
        'Try local wine varieties'
      ],
      localCuisine: [
        'Fava',
        'Tomato Keftedes',
        'Fresh Seafood',
        'Local Wines'
      ],
      culturalNotes: 'Respect local customs. Learn basic Greek phrases. Dress appropriately for churches.'
    },
    {
      id: 4,
      name: 'Costa Rica',
      image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2',
      description: 'Eco-tourism paradise with diverse wildlife, lush rainforests, and pristine beaches.',
      matchScore: 0,
      priceRange: 'Mid to Luxury',
      activities: ['Adventure', 'Wildlife', 'Beach', 'Eco-tourism'],
      bestFor: ['Adventure Seekers', 'Nature Lovers', 'Families'],
      highlights: [
        'Manuel Antonio National Park',
        'Arenal Volcano',
        'Monteverde Cloud Forest',
        'Tortuguero National Park'
      ],
      weather: 'Tropical (20-35°C)',
      bestTimeToVisit: 'December to April',
      averageCost: 2000,
      travelTips: [
        'Pack rain gear year-round',
        'Book tours in advance',
        'Use local guides for wildlife spotting',
        'Learn basic Spanish phrases'
      ],
      localCuisine: [
        'Gallo Pinto',
        'Casado',
        'Fresh Tropical Fruits',
        'Costa Rican Coffee'
      ],
      culturalNotes: 'Practice eco-friendly tourism. Respect wildlife. Learn about local conservation efforts.'
    },
    {
      id: 5,
      name: 'Marrakech, Morocco',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11',
      description: 'Vibrant city blending ancient traditions with modern life, famous for its bustling medina and colorful souks.',
      matchScore: 0,
      priceRange: 'Budget to Mid',
      activities: ['Cultural', 'Shopping', 'Food', 'Historical'],
      bestFor: ['Adventure Seekers', 'Culture Enthusiasts', 'Photographers'],
      highlights: [
        'Jardin Majorelle',
        'Bahia Palace',
        'Souk Semmarine',
        'Koutoubia Mosque'
      ],
      weather: 'Desert (15-40°C)',
      bestTimeToVisit: 'March to May and September to November',
      averageCost: 1200,
      travelTips: [
        'Learn to haggle in souks',
        'Stay in a traditional riad',
        'Visit gardens early morning',
        'Try local street food'
      ],
      localCuisine: [
        'Tagine',
        'Couscous',
        'Pastilla',
        'Mint Tea'
      ],
      culturalNotes: 'Dress modestly. Respect prayer times. Learn basic Arabic phrases.'
    }
  ];

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleActivityToggle = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleBudgetChange = (e) => {
    setFormData(prev => ({
      ...prev,
      budget: parseInt(e.target.value)
    }));
  };

  const handleTravelStyleSelect = (style) => {
    setFormData(prev => ({
      ...prev,
      travelStyle: style
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!currentUser) {
        throw new Error('Please log in to save your preferences');
      }

      const preferencesRef = collection(db, 'userPreferences');
      await addDoc(preferencesRef, {
        userId: currentUser.uid,
        ...formData,
        createdAt: serverTimestamp()
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToItinerary = async (destination) => {
    try {
      if (!currentUser) {
        console.log('User not logged in, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('Saving destination to itinerary:', destination);
      await saveDestination(currentUser.uid, destination);
      console.log('Destination saved successfully');
      
      // Show success message
      setSavedDestinations(prev => [...prev, destination.id]);
    } catch (error) {
      console.error('Error saving destination:', error);
      // Show error message
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFilterOptions(prev => {
      if (type === 'checkbox') {
        const activities = checked
          ? [...(prev.activities || []), value]
          : (prev.activities || []).filter(a => a !== value);
        return { ...prev, activities };
      }
      
      if (name === 'minMatchScore') {
        return { ...prev, [name]: parseInt(value) || 0 };
      }
      
      return { ...prev, [name]: value };
    });
  };

  const calculateMatchScore = (destination) => {
    let score = 0;
    const maxScore = 100;
    const weights = {
      travelStyle: 20,
      budget: 20,
      activities: 30,
      groupType: 15,
      duration: 15
    };

    // Travel Style Matching
    if (formData.travelStyle === 'Adventure' && destination.activities.includes('Adventure')) {
      score += weights.travelStyle;
    } else if (formData.travelStyle === 'Relaxation' && 
              (destination.activities.includes('Beach') || destination.activities.includes('Wellness'))) {
      score += weights.travelStyle;
    } else if (formData.travelStyle === 'Cultural' && destination.activities.includes('Cultural')) {
      score += weights.travelStyle;
    }

    // Budget Matching
    const budgetRanges = {
      'Budget': { min: 0, max: 1500 },
      'Mid-range': { min: 1500, max: 3000 },
      'Luxury': { min: 3000, max: Infinity }
    };
    
    // Default to Mid-range if budget is not set or invalid
    const userBudget = budgetRanges[formData.budget] || budgetRanges['Mid-range'];
    
    if (destination.averageCost >= userBudget.min && destination.averageCost <= userBudget.max) {
      score += weights.budget;
    }

    // Activities Matching
    const userActivities = formData.activities || [];
    const matchingActivities = userActivities.filter(activity => 
      destination.activities.includes(activity)
    );
    score += (matchingActivities.length / Math.max(userActivities.length, 1)) * weights.activities;

    // Group Type Matching
    if (destination.bestFor.includes(formData.travelStyle)) {
      score += weights.groupType;
    }

    // Duration Matching
    const duration = parseInt(formData.duration) || 7; // Default to 7 days if not set
    const durationScore = Math.min(
      (duration / 14) * weights.duration,
      weights.duration
    );
    score += durationScore;

    // Adjust score based on weather preferences
    if (formData.weather === 'Warm' && 
        (destination.weather.includes('Tropical') || destination.weather.includes('Mediterranean'))) {
      score += 5;
    } else if (formData.weather === 'Cool' && 
               (destination.weather.includes('Temperate') || destination.weather.includes('Mountain'))) {
      score += 5;
    }

    // Adjust score based on language preferences
    if (formData.language === 'English' && 
        (destination.culturalNotes.includes('English') || !destination.culturalNotes.includes('Learn'))) {
      score += 5;
    }

    return Math.min(Math.round(score), maxScore);
  };

  const getFilteredRecommendations = () => {
    let filtered = [...recommendations];

    // Calculate match scores
    filtered = filtered.map(destination => ({
      ...destination,
      matchScore: calculateMatchScore(destination)
    }));

    // Apply filters
    if (filterOptions.minMatchScore > 0) {
      filtered = filtered.filter(d => d.matchScore >= filterOptions.minMatchScore);
    }

    if (filterOptions.priceRange) {
      filtered = filtered.filter(d => d.priceRange === filterOptions.priceRange);
    }

    if (filterOptions.activities && filterOptions.activities.length > 0) {
      filtered = filtered.filter(d => 
        filterOptions.activities.some(activity => d.activities.includes(activity))
      );
    }

    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore);

    return filtered;
  };

  const renderFilters = () => {
    return (
      <div className="filters-panel">
        <div className="filter-group">
          <label>Minimum Match Score</label>
          <input
            type="range"
            name="minMatchScore"
            min="0"
            max="100"
            value={filterOptions.minMatchScore}
            onChange={handleFilterChange}
          />
          <span>{filterOptions.minMatchScore}%</span>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <select
            name="priceRange"
            value={filterOptions.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">All Ranges</option>
            <option value="Budget">Budget</option>
            <option value="Mid-range">Mid-range</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Activities</label>
          <div className="checkbox-group">
            {['Beach', 'Cultural', 'Adventure', 'Wellness'].map(activity => (
              <label key={activity}>
                <input
                  type="checkbox"
                  value={activity}
                  checked={(filterOptions.activities || []).includes(activity)}
                  onChange={handleFilterChange}
                />
                {activity}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRecommendations = () => {
    const filteredRecommendations = getFilteredRecommendations();

    return (
      <div className="recommendations">
        <div className="recommendations-header">
          <h2>Your Personalized Recommendations</h2>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && renderFilters()}

        <div className="recommendations-grid">
          {filteredRecommendations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div className="destination-image-container">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="destination-image"
                />
                <div className="match-score">
                  {destination.matchScore}% Match
                </div>
              </div>
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div className="destination-meta">
                  <span className="price-range">{destination.priceRange}</span>
                  <span className="average-cost">
                    Avg. ${destination.averageCost.toLocaleString()}
                  </span>
                </div>
                <div className="destination-details">
                  <p><FaCalendarAlt /> Best Time: {destination.bestTimeToVisit}</p>
                  <p><FaMapMarkerAlt /> Weather: {destination.weather}</p>
                </div>
                <div className="destination-highlights">
                  <h4>Highlights:</h4>
                  <ul>
                    {destination.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="travel-tips">
                  <h4>Travel Tips:</h4>
                  <ul>
                    {destination.travelTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div className="local-cuisine">
                  <h4>Local Cuisine:</h4>
                  <ul>
                    {destination.localCuisine.map((dish, index) => (
                      <li key={index}>{dish}</li>
                    ))}
                  </ul>
                </div>
                <div className="cultural-notes">
                  <h4>Cultural Notes:</h4>
                  <p>{destination.culturalNotes}</p>
                </div>
                <button
                  className={`save-button ${savedDestinations.includes(destination.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveToItinerary(destination)}
                >
                  {savedDestinations.includes(destination.id) ? 'Saved to Itinerary' : 'Save to Itinerary'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    if (showRecommendations) {
      return renderRecommendations();
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="questionnaire-step">
            <h2>What are your interests?</h2>
            <p>Select all that apply</p>
            <div className="interests-grid">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  className={`interest-card ${formData.interests.includes(interest.id) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <span>{interest.name}</span>
                </button>
              ))}
            </div>
            <div className="step-buttons">
              <button 
                className="next-button"
                onClick={() => setCurrentStep(2)}
                disabled={formData.interests.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="questionnaire-step">
            <h2>What's your budget range?</h2>
            <div className="budget-slider">
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={formData.budget}
                onChange={handleBudgetChange}
              />
              <div className="budget-value">
                ${formData.budget.toLocaleString()}
              </div>
            </div>
            <div className="budget-markers">
              <span>Budget</span>
              <span>Luxury</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="questionnaire-step">
            <h2>What's your preferred travel style?</h2>
            <div className="travel-styles-grid">
              {travelStyles.map(style => (
                <button
                  key={style.id}
                  className={`travel-style-card ${formData.travelStyle === style.id ? 'selected' : ''}`}
                  onClick={() => handleTravelStyleSelect(style.id)}
                >
                  <div className="style-icon">{style.icon}</div>
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="questionnaire-step">
            <h2>What activities interest you?</h2>
            <p>Select all that apply</p>
            <div className="activities-grid">
              {activities.map(activity => (
                <button
                  key={activity.id}
                  className={`activity-card ${formData.activities.includes(activity.id) ? 'selected' : ''}`}
                  onClick={() => handleActivityToggle(activity.id)}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <span>{activity.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="questionnaire-container">
      {!showRecommendations && (
        <div className="questionnaire-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="progress-steps">
            <span className={currentStep >= 1 ? 'active' : ''}>Interests</span>
            <span className={currentStep >= 2 ? 'active' : ''}>Budget</span>
            <span className={currentStep >= 3 ? 'active' : ''}>Style</span>
            <span className={currentStep >= 4 ? 'active' : ''}>Activities</span>
          </div>
        </div>
      )}

      {renderStep()}

      {!showRecommendations && (
        <div className="questionnaire-navigation">
          {currentStep > 1 && (
            <button className="nav-button prev" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button className="nav-button next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="nav-button submit" onClick={handleSubmit}>
              Get Recommendations
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Questionnaire; 