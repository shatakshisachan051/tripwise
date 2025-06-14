import { useState } from 'react';
import { FaPlane, FaHotel, FaUtensils, FaCamera, FaHiking, FaSwimmer, FaBook, FaShoppingBag, FaUsers, FaUser, FaChild, FaCrown, FaFilter, FaStar, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Questionnaire.css';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    minMatchScore: 0,
    maxPrice: '$$$$',
    sortBy: 'match',
    showSavedOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [answers, setAnswers] = useState({
    interests: [],
    budget: 0,
    travelStyle: '',
    activities: [],
    duration: 0,
    preferredSeason: '',
    accommodation: '',
    transportation: '',
    groupSize: 0,
    dietaryRestrictions: [],
    accessibility: false,
    language: '',
  });

  const interests = [
    { id: 'adventure', label: 'Adventure', icon: <FaHiking /> },
    { id: 'relaxation', label: 'Relaxation', icon: <FaSwimmer /> },
    { id: 'culture', label: 'Culture', icon: <FaBook /> },
    { id: 'shopping', label: 'Shopping', icon: <FaShoppingBag /> },
    { id: 'photography', label: 'Photography', icon: <FaCamera /> },
    { id: 'food', label: 'Food & Dining', icon: <FaUtensils /> },
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
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      description: 'Perfect for adventure and relaxation seekers. Offers beautiful beaches, cultural experiences, and affordable luxury.',
      matchScore: 95,
      priceRange: '$$',
      activities: ['beach', 'hiking', 'culture'],
      bestFor: ['couple', 'family'],
      highlights: ['Ubud Monkey Forest', 'Tegallalang Rice Terraces', 'Sacred Monkey Forest Sanctuary'],
      weather: 'Tropical',
      bestTimeToVisit: 'April-October',
      averageCost: 2000
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000',
      description: 'A cultural paradise with ancient temples, traditional gardens, and authentic Japanese experiences.',
      matchScore: 90,
      priceRange: '$$$',
      activities: ['culture', 'photography', 'food'],
      bestFor: ['solo', 'couple'],
      highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple'],
      weather: 'Temperate',
      bestTimeToVisit: 'March-May, October-November',
      averageCost: 3500
    },
    {
      id: 3,
      name: 'Barcelona, Spain',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1000',
      description: 'Vibrant city with stunning architecture, beautiful beaches, and rich cultural experiences.',
      matchScore: 88,
      priceRange: '$$',
      activities: ['culture', 'food', 'shopping'],
      bestFor: ['solo', 'couple', 'family'],
      highlights: ['Sagrada Familia', 'Park Güell', 'La Rambla'],
      weather: 'Mediterranean',
      bestTimeToVisit: 'May-June, September-October',
      averageCost: 2500
    },
    {
      id: 4,
      name: 'Queenstown, New Zealand',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000',
      description: 'Adventure capital of the world with stunning landscapes and thrilling activities.',
      matchScore: 92,
      priceRange: '$$$',
      activities: ['adventure', 'hiking', 'photography'],
      bestFor: ['solo', 'couple'],
      highlights: ['Milford Sound', 'Skyline Queenstown', 'Arrowtown'],
      weather: 'Temperate',
      bestTimeToVisit: 'December-February',
      averageCost: 4000
    },
    {
      id: 5,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000',
      description: 'Luxury destination with world-class shopping, dining, and entertainment.',
      matchScore: 85,
      priceRange: '$$$$',
      activities: ['shopping', 'food', 'luxury'],
      bestFor: ['couple', 'family'],
      highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'],
      weather: 'Desert',
      bestTimeToVisit: 'November-March',
      averageCost: 5000
    },
    {
      id: 6,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000',
      description: 'Stunning island with white-washed buildings, blue domes, and breathtaking sunsets.',
      matchScore: 93,
      priceRange: '$$$',
      activities: ['relaxation', 'photography', 'food'],
      bestFor: ['couple', 'luxury'],
      highlights: ['Oia Village', 'Fira', 'Red Beach'],
      weather: 'Mediterranean',
      bestTimeToVisit: 'May-October',
      averageCost: 3000
    },
    {
      id: 7,
      name: 'Costa Rica',
      image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1000',
      description: 'Eco-tourism paradise with rainforests, beaches, and diverse wildlife.',
      matchScore: 91,
      priceRange: '$$',
      activities: ['adventure', 'hiking', 'wildlife'],
      bestFor: ['family', 'solo'],
      highlights: ['Manuel Antonio National Park', 'Arenal Volcano', 'Monteverde Cloud Forest'],
      weather: 'Tropical',
      bestTimeToVisit: 'December-April',
      averageCost: 2500
    },
    {
      id: 8,
      name: 'Marrakech, Morocco',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?q=80&w=1000',
      description: 'Vibrant city with rich culture, bustling markets, and stunning architecture.',
      matchScore: 89,
      priceRange: '$$',
      activities: ['culture', 'shopping', 'food'],
      bestFor: ['solo', 'couple'],
      highlights: ['Jardin Majorelle', 'Medina', 'Bahia Palace'],
      weather: 'Desert',
      bestTimeToVisit: 'March-May, September-November',
      averageCost: 2000
    },
    {
      id: 9,
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1000',
      description: 'Majestic mountains, pristine lakes, and world-class skiing.',
      matchScore: 94,
      priceRange: '$$$$',
      activities: ['adventure', 'hiking', 'photography'],
      bestFor: ['family', 'couple'],
      highlights: ['Matterhorn', 'Interlaken', 'Lucerne'],
      weather: 'Alpine',
      bestTimeToVisit: 'December-March (skiing), June-September (hiking)',
      averageCost: 4500
    },
    {
      id: 10,
      name: 'Vietnam',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000',
      description: 'Rich history, delicious cuisine, and diverse landscapes from mountains to beaches.',
      matchScore: 87,
      priceRange: '$',
      activities: ['culture', 'food', 'adventure'],
      bestFor: ['solo', 'family'],
      highlights: ['Ha Long Bay', 'Hoi An', 'Mekong Delta'],
      weather: 'Tropical',
      bestTimeToVisit: 'November-April',
      averageCost: 1500
    }
  ];

  const handleInterestToggle = (interest) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleActivityToggle = (activity) => {
    setAnswers(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleBudgetChange = (e) => {
    setAnswers(prev => ({
      ...prev,
      budget: parseInt(e.target.value)
    }));
  };

  const handleTravelStyleSelect = (style) => {
    setAnswers(prev => ({
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

  const handleSubmit = () => {
    setShowRecommendations(true);
  };

  const handleSaveToItinerary = (destination) => {
    setSavedDestinations(prev => {
      if (prev.some(d => d.id === destination.id)) {
        return prev.filter(d => d.id !== destination.id);
      }
      return [...prev, { ...destination, savedAt: new Date() }];
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFilteredRecommendations = () => {
    let filtered = recommendations;

    // Filter based on travel style
    if (answers.travelStyle) {
      filtered = filtered.filter(rec => rec.bestFor.includes(answers.travelStyle));
    }

    // Filter based on budget
    const budgetMap = {
      '$': 1000,
      '$$': 2000,
      '$$$': 5000,
      '$$$$': 10000
    };
    filtered = filtered.filter(rec => answers.budget >= budgetMap[rec.priceRange]);

    // Filter based on activities
    if (answers.activities.length > 0) {
      filtered = filtered.filter(rec => 
        answers.activities.some(activity => rec.activities.includes(activity))
      );
    }

    // Apply additional filters
    if (filterOptions.showSavedOnly) {
      filtered = filtered.filter(rec => 
        savedDestinations.some(saved => saved.id === rec.id)
      );
    }

    filtered = filtered.filter(rec => 
      rec.matchScore >= filterOptions.minMatchScore
    );

    // Sort recommendations
    switch (filterOptions.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.averageCost - b.averageCost);
        break;
      case 'match':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    return filtered;
  };

  const renderFilters = () => (
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
        <label>Sort By</label>
        <select
          name="sortBy"
          value={filterOptions.sortBy}
          onChange={handleFilterChange}
        >
          <option value="match">Match Score</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="showSavedOnly"
            checked={filterOptions.showSavedOnly}
            onChange={(e) => setFilterOptions(prev => ({
              ...prev,
              showSavedOnly: e.target.checked
            }))}
          />
          Show Saved Only
        </label>
      </div>
    </div>
  );

  const renderRecommendations = () => {
    const filteredRecs = getFilteredRecommendations();

    return (
      <div className="recommendations-container">
        <div className="recommendations-header">
          <h2>Your Personalized Recommendations</h2>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {showFilters && renderFilters()}

        <div className="recommendations-grid">
          {filteredRecs.map(rec => (
            <div key={rec.id} className="recommendation-card">
              <div className="recommendation-image">
                <img src={rec.image} alt={rec.name} />
                <div className="match-score">
                  <FaStar /> {rec.matchScore}% Match
                </div>
              </div>
              <div className="recommendation-info">
                <h3>{rec.name}</h3>
                <p>{rec.description}</p>
                <div className="recommendation-details">
                  <div className="price-range">
                    {rec.priceRange} • ${rec.averageCost.toLocaleString()}
                  </div>
                  <div className="destination-meta">
                    <div className="meta-item">
                      <FaCalendarAlt /> {rec.bestTimeToVisit}
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt /> {rec.weather}
                    </div>
                  </div>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {rec.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button 
                  className={`save-button ${savedDestinations.some(d => d.id === rec.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveToItinerary(rec)}
                >
                  {savedDestinations.some(d => d.id === rec.id) ? 'Saved to Itinerary' : 'Save to Itinerary'}
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
            <h2>What are your travel interests?</h2>
            <p>Select all that apply</p>
            <div className="interests-grid">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  className={`interest-card ${answers.interests.includes(interest.id) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <span>{interest.label}</span>
                </button>
              ))}
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
                value={answers.budget}
                onChange={handleBudgetChange}
              />
              <div className="budget-value">
                ${answers.budget.toLocaleString()}
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
                  className={`travel-style-card ${answers.travelStyle === style.id ? 'selected' : ''}`}
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
                  className={`activity-card ${answers.activities.includes(activity.id) ? 'selected' : ''}`}
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