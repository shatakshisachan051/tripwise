import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  getSavedDestinations, 
  removeSavedDestination, 
  addDestinationReview, 
  getDestinationReviews,
  updateDestinationRating,
  getTrendingDestinations
} from '../services/firestore';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import './Dashboard.css';

const StarRating = React.memo(({ destinationId, avgRating, onRate }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={`star-${destinationId}-${star}`}
          className={`star-button ${star <= avgRating ? 'selected' : ''}`}
          onClick={() => onRate(destinationId, star)}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
});

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({});
  const [userRatings, setUserRatings] = useState({});
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [formData, setFormData] = useState({
    interests: [],
    budget: '',
    travelStyle: '',
    activities: [],
    duration: '',
    groupSize: '',
    preferredSeason: '',
    accommodation: '',
    transportation: ''
  });
  const [showItineraries, setShowItineraries] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadSavedDestinations();
      loadTrendingDestinations();
      fetchUserData();
    }
  }, [currentUser]);

  const loadSavedDestinations = async () => {
    try {
      setLoading(true);
      const destinations = await getSavedDestinations(currentUser.uid);
      console.log('Loaded saved destinations:', destinations);
      
      // Ensure each destination has a unique ID
      const destinationsWithIds = destinations.map((dest, index) => ({
        ...dest,
        uniqueId: `dest-${dest.id}-${index}-${Date.now()}`
      }));
      
      setSavedDestinations(destinationsWithIds);
      
      const reviewsData = {};
      const ratingsData = {};
      
      for (const dest of destinationsWithIds) {
        try {
          const destReviews = await getDestinationReviews(dest.id);
          reviewsData[dest.id] = destReviews;
          
          const ratings = destReviews.map(review => review.rating);
          const avgRating = ratings.length > 0 
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
            : 0;
          ratingsData[dest.id] = {
            average: avgRating,
            count: ratings.length
          };
        } catch (error) {
          console.warn(`Error loading reviews for destination ${dest.id}:`, error);
          reviewsData[dest.id] = [];
          ratingsData[dest.id] = {
            average: 0,
            count: 0
          };
        }
      }
      
      setReviews(reviewsData);
      setUserRatings(ratingsData);
    } catch (error) {
      console.error('Error loading saved destinations:', error);
      setError('Failed to load saved destinations');
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingDestinations = async () => {
    try {
      setIsLoadingTrending(true);
      const trending = await getTrendingDestinations();
      setTrendingDestinations(trending);
    } catch (error) {
      console.error('Error loading trending destinations:', error);
      setError('Failed to load trending destinations');
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleRateDestination = async (destinationId, rating) => {
    try {
      if (!currentUser) {
        console.error('No user logged in');
        return;
      }

      console.log('Rating destination:', { destinationId, rating });

      // Update rating in Firestore
      const { averageRating, ratingCount } = await updateDestinationRating(destinationId, currentUser.uid, rating);

      // Update local state
      setSavedDestinations(prevDestinations => 
        prevDestinations.map(dest => {
          if (dest.id === destinationId) {
            return {
              ...dest,
              averageRating,
              ratingCount
            };
          }
          return dest;
        })
      );

      // Refresh trending destinations
      loadTrendingDestinations();

      console.log('Rating updated successfully in state');
    } catch (error) {
      console.error('Error rating destination:', error);
      setError('Failed to update rating. Please try again.');
    }
  };

  const handleRemoveDestination = async (destinationId) => {
    try {
      await removeSavedDestination(currentUser.uid, destinationId);
      console.log('Removed destination:', destinationId);
      setSavedDestinations(prev => 
        prev.filter(dest => dest.id !== destinationId)
      );
    } catch (error) {
      console.error('Error removing destination:', error);
      setError('Failed to remove destination');
    }
  };

  const handleAddReview = async (destinationId) => {
    try {
      await addDestinationReview(currentUser.uid, destinationId, newReview.rating, newReview.comment);
      console.log('Added review:', newReview);
      setNewReview({ rating: 5, comment: '' });
      loadSavedDestinations();
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add review');
    }
  };

  const handleAddToItinerary = (destination) => {
    // TODO: Implement add to itinerary functionality
    console.log('Adding to itinerary:', destination);
  };

  const handleViewDetails = (destination) => {
    // TODO: Implement view details functionality
    console.log('Viewing details:', destination);
  };

  const handleRemoveRecentSearch = (index) => {
    // TODO: Implement remove recent search functionality
    console.log('Removing recent search:', index);
  };

  const fetchUserData = async () => {
    try {
      if (!currentUser) return;

      // Fetch user preferences
      const preferencesRef = collection(db, 'userPreferences');
      const q = query(preferencesRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFormData(userData);
        generateRecommendations(userData);
      }

      // Fetch saved itineraries
      const itinerariesRef = collection(db, 'itineraries');
      const itinerariesQuery = query(itinerariesRef, where('userId', '==', currentUser.uid));
      const itinerariesSnapshot = await getDocs(itinerariesQuery);
      
      const itineraries = itinerariesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSavedItineraries(itineraries);

      setLoading(false);
    } catch (err) {
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  const generateRecommendations = (userData) => {
    // This is a placeholder for the recommendation engine
    // In a real application, this would use AI/ML to generate personalized recommendations
    const mockRecommendations = [
      {
        id: 1,
        name: 'Bali, Indonesia',
        image: 'https://source.unsplash.com/800x600/?bali',
        description: 'Perfect for adventure and relaxation seekers',
        rating: 4.8,
        reviews: 1245,
        price: '$$',
        activities: ['Beach', 'Temples', 'Surfing', 'Yoga'],
        bestTime: 'April to October'
      },
      {
        id: 2,
        name: 'Kyoto, Japan',
        image: 'https://source.unsplash.com/800x600/?kyoto',
        description: 'Rich in culture and history',
        rating: 4.9,
        reviews: 987,
        price: '$$$',
        activities: ['Temples', 'Gardens', 'Tea Ceremony', 'Shopping'],
        bestTime: 'March-May, October-November'
      }
    ];
    setRecommendations(mockRecommendations);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const preferencesRef = collection(db, 'userPreferences');
      await addDoc(preferencesRef, {
        userId: currentUser.uid,
        ...formData,
        createdAt: serverTimestamp()
      });

      generateRecommendations(formData);
      setShowQuestionnaire(false);
    } catch (err) {
      setError('Error saving preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = async (destination) => {
    try {
      const itinerariesRef = collection(db, 'itineraries');
      await addDoc(itinerariesRef, {
        userId: currentUser.uid,
        destination: destination.name,
        activities: destination.activities,
        createdAt: serverTimestamp()
      });

      fetchUserData(); // Refresh itineraries
    } catch (err) {
      setError('Error saving itinerary');
    }
  };

  const handleViewItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setShowItineraries(true);
  };

  const handleDeleteItinerary = async (itineraryId) => {
    try {
      const itineraryRef = doc(db, 'itineraries', itineraryId);
      await deleteDoc(itineraryRef);
      fetchUserData(); // Refresh itineraries
    } catch (err) {
      setError('Error deleting itinerary');
    }
  };

  const renderDestinationCard = (destination) => {
    const destinationReviews = reviews[destination.id] || [];
    const avgRating = destinationReviews.length > 0
      ? (destinationReviews.reduce((sum, review) => sum + review.rating, 0) / destinationReviews.length).toFixed(1)
      : '0.0';
    const ratingCount = destinationReviews.length;

    return (
      <div key={destination.uniqueId} className="destination-card">
        <div className="destination-image-container">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="destination-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
            }}
          />
          <button 
            className="remove-btn"
            onClick={() => handleRemoveDestination(destination.id)}
            title="Remove destination"
          >
            ×
          </button>
        </div>
        <div className="destination-content">
          <h3 className="destination-title">{destination.name}</h3>
          <div className="destination-rating">
            <StarRating 
              destinationId={destination.id}
              avgRating={avgRating}
              onRate={handleRateDestination}
            />
            <div className="rating-info">
              <span className="rating-value">{avgRating}</span>
              <span className="rating-count">({ratingCount})</span>
            </div>
          </div>
          <p className="destination-description">{destination.description}</p>
        </div>
      </div>
    );
  };

  const renderTrendingDestinations = () => {
    if (isLoadingTrending) {
      return <div className="loading-spinner">Loading trending destinations...</div>;
    }

    if (trendingDestinations.length === 0) {
      return <p>No trending destinations yet.</p>;
    }

    return (
      <div className="trending-grid">
        {trendingDestinations.map((destination) => (
          <div key={destination.id} className="trending-card">
            <div className="trending-image-container">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="trending-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
            <div className="trending-content">
              <h3 className="trending-title">{destination.name || 'Unnamed Destination'}</h3>
              <p className="trending-location">
                <span className="location-icon">📍</span> {destination.location || 'Location not specified'}
              </p>
              <div className="trending-rating">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`star ${star <= (destination.averageRating || 0) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-value">
                  {destination.averageRating ? destination.averageRating.toFixed(1) : '0.0'}
                </span>
                <span className="rating-count">
                  ({destination.ratingCount || 0} ratings)
                </span>
              </div>
              <p className="trending-description">
                {destination.description || 'No description available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderItinerariesSection = () => (
    <div className="itineraries-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Your Saved Itineraries</h2>
          <p className="user-email">{currentUser?.email}</p>
        </div>
        <button 
          className="back-button"
          onClick={() => setShowItineraries(false)}
        >
          Back to Dashboard
        </button>
      </div>

      {savedItineraries.length > 0 ? (
        <div className="itineraries-grid">
          {savedItineraries.map(itinerary => (
            <div key={itinerary.id} className="itinerary-card">
              <div className="itinerary-image-container">
                <img 
                  src={itinerary.image || `https://source.unsplash.com/800x600/?${itinerary.destination}`}
                  alt={itinerary.destination}
                  className="itinerary-image"
                />
              </div>
              <div className="itinerary-header">
                <h3>{itinerary.destination}</h3>
                <div className="itinerary-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleViewItinerary(itinerary)}
                  >
                    View Details
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteItinerary(itinerary.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="itinerary-details">
                <div className="itinerary-info">
                  <span className="date">
                    Created: {new Date(itinerary.createdAt?.toDate()).toLocaleDateString()}
                  </span>
                  <span className="duration">
                    Duration: {itinerary.duration || 'Not specified'}
                  </span>
                </div>
                
                <div className="activities-list">
                  <h4>Planned Activities:</h4>
                  <ul>
                    {itinerary.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>

                {itinerary.notes && (
                  <div className="itinerary-notes">
                    <h4>Notes:</h4>
                    <p>{itinerary.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No saved itineraries yet</p>
          <button 
            className="create-button"
            onClick={() => navigate('/destinations')}
          >
            Browse Destinations
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Your Travel Dashboard</h1>
          <p className="user-email">{currentUser?.email}</p>
        </div>
        <p>Discover personalized travel recommendations and manage your itineraries</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Actions</h3>
            <button 
              className="action-button"
              onClick={() => setShowQuestionnaire(!showQuestionnaire)}
            >
              {showQuestionnaire ? 'Hide Questionnaire' : 'Update Preferences'}
            </button>
            <button 
              className="action-button"
              onClick={() => navigate('/destinations')}
            >
              Browse Destinations
            </button>
            <button 
              className="action-button"
              onClick={() => setShowItineraries(!showItineraries)}
            >
              {showItineraries ? 'Hide Itineraries' : 'View Saved Itineraries'}
            </button>
          </div>

          {!showItineraries && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Recent Itineraries</h3>
              {savedItineraries.length > 0 ? (
                <div className="itinerary-list">
                  {savedItineraries.slice(0, 3).map(itinerary => (
                    <div key={itinerary.id} className="itinerary-item">
                      <h4>{itinerary.destination}</h4>
                      <p>{itinerary.activities.join(', ')}</p>
                      <button 
                        className="view-button"
                        onClick={() => handleViewItinerary(itinerary)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No saved itineraries yet</p>
              )}
            </div>
          )}
        </aside>

        <main className="main-content">
          {showItineraries ? (
            renderItinerariesSection()
          ) : showQuestionnaire ? (
            <div className="questionnaire-section">
              <h2>Update Your Travel Preferences</h2>
              <form onSubmit={handleSubmit} className="preference-form">
                <div className="form-group">
                  <label>Interests</label>
                  <div className="checkbox-group">
                    {['Adventure', 'Relaxation', 'Culture', 'Food', 'Nature'].map(interest => (
                      <label key={interest} className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest.toLowerCase()}
                          checked={formData.interests.includes(interest.toLowerCase())}
                          onChange={handleCheckboxChange}
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select budget</option>
                    <option value="budget">Budget ($)</option>
                    <option value="moderate">Moderate ($$)</option>
                    <option value="luxury">Luxury ($$$)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Travel Style</label>
                  <select
                    name="travelStyle"
                    value={formData.travelStyle}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select style</option>
                    <option value="solo">Solo</option>
                    <option value="family">Family</option>
                    <option value="couple">Couple</option>
                    <option value="group">Group</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Activities</label>
                  <div className="checkbox-group">
                    {['Sightseeing', 'Dining', 'Outdoor', 'Shopping', 'Nightlife'].map(activity => (
                      <label key={activity} className="checkbox-label">
                        <input
                          type="checkbox"
                          name="activities"
                          value={activity.toLowerCase()}
                          checked={formData.activities.includes(activity.toLowerCase())}
                          onChange={handleCheckboxChange}
                        />
                        {activity}
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </form>
            </div>
          ) : (
            <div className="recommendations-section">
              <h2>Personalized Recommendations</h2>
              <div className="recommendations-grid">
                {recommendations.map(destination => (
                  <div key={destination.id} className="destination-card">
                    <div className="destination-image-container">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="destination-image"
                      />
                    </div>
                    <div className="destination-content">
                      <h3 className="destination-title">{destination.name}</h3>
                      <div className="destination-rating">
                        <span className="rating-stars">★★★★★</span>
                        <span className="rating-count">({destination.reviews} reviews)</span>
                      </div>
                      <p className="destination-description">{destination.description}</p>
                      <div className="destination-details">
                        <span className="price-tag">{destination.price}</span>
                        <span className="best-time">Best time: {destination.bestTime}</span>
                      </div>
                      <div className="destination-tags">
                        {destination.activities.map(activity => (
                          <span key={activity} className="tag">{activity}</span>
                        ))}
                      </div>
                      <div className="destination-actions">
                        <button 
                          className="save-button"
                          onClick={() => handleSaveItinerary(destination)}
                        >
                          Save to Itinerary
                        </button>
                        <button 
                          className="details-button"
                          onClick={() => navigate(`/destinations/${destination.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 