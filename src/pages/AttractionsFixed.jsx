import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaTicketAlt, FaStar } from 'react-icons/fa';
import './Attractions.css';

const Attractions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'all',
    'landmarks',
    'museums',
    'parks',
    'entertainment',
    'shopping',
    'dining',
    'nightlife',
    'sports',
    'cultural',
    'adventure',
    'family'
  ];

  const attractions = [
    {
      id: 1,
      name: 'Eiffel Tower',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1000',
      description: 'Iconic iron lattice tower on the Champ de Mars in Paris',
      rating: 4.8,
      location: 'Paris, France',
      openingHours: '9:00 AM - 12:45 AM',
      price: '€26.10',
      featured: true
    },
    {
      id: 2,
      name: 'Louvre Museum',
      category: 'museums',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000',
      description: 'World\'s largest art museum and a historic monument in Paris',
      rating: 4.7,
      location: 'Paris, France',
      openingHours: '9:00 AM - 6:00 PM',
      price: '€17',
      featured: false
    },
    {
      id: 3,
      name: 'Central Park',
      category: 'parks',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
      description: 'Urban oasis in the heart of New York City',
      rating: 4.6,
      location: 'New York, USA',
      openingHours: '6:00 AM - 10:00 PM',
      price: 'Free',
      featured: false
    },
    {
      id: 4,
      name: 'Disneyland',
      category: 'entertainment',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000',
      description: 'The happiest place on Earth with magical attractions',
      rating: 4.9,
      location: 'Anaheim, USA',
      openingHours: '8:00 AM - 12:00 AM',
      price: '$104',
      featured: true
    },
    {
      id: 5,
      name: 'Times Square',
      category: 'entertainment',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000',
      description: 'Major commercial intersection and tourist destination',
      rating: 4.5,
      location: 'New York, USA',
      openingHours: '24/7',
      price: 'Free',
      featured: false
    },
    {
      id: 6,
      name: 'Mall of America',
      category: 'shopping',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
      description: 'Largest shopping mall in the United States',
      rating: 4.4,
      location: 'Minnesota, USA',
      openingHours: '10:00 AM - 9:30 PM',
      price: 'Free',
      featured: false
    },
    {
      id: 7,
      name: 'Empire State Building',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      description: 'Iconic 102-story skyscraper in Midtown Manhattan',
      rating: 4.7,
      location: 'New York, USA',
      openingHours: '8:00 AM - 2:00 AM',
      price: '$44',
      featured: true
    },
    {
      id: 8,
      name: 'Madison Square Garden',
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1000',
      description: 'Multi-purpose indoor arena in New York City',
      rating: 4.6,
      location: 'New York, USA',
      openingHours: 'Varies by event',
      price: 'Varies by event',
      featured: false
    },
    {
      id: 9,
      name: 'Broadway',
      category: 'entertainment',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000',
      description: 'Famous theater district in Manhattan',
      rating: 4.8,
      location: 'New York, USA',
      openingHours: 'Varies by show',
      price: 'Varies by show',
      featured: true
    },
    {
      id: 10,
      name: 'Statue of Liberty',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000',
      description: 'Neoclassical sculpture on Liberty Island',
      rating: 4.9,
      location: 'New York, USA',
      openingHours: '8:30 AM - 4:00 PM',
      price: '$24.50',
      featured: true
    },
    {
      id: 11,
      name: 'Tower Bridge',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1000',
      description: 'Victorian bridge and exhibition in London',
      rating: 4.7,
      location: 'London, UK',
      openingHours: '9:30 AM - 6:00 PM',
      price: '£10.60',
      featured: true
    },
    {
      id: 12,
      name: 'Universal Studios',
      category: 'entertainment',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
      description: 'Theme park with movie-themed rides and attractions',
      rating: 4.8,
      location: 'Orlando, USA',
      openingHours: '9:00 AM - 9:00 PM',
      price: '$109',
      featured: true
    },
    {
      id: 13,
      name: 'Sagrada Familia',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000',
      description: 'Unfinished church designed by Antoni Gaudí',
      rating: 4.9,
      location: 'Barcelona, Spain',
      openingHours: '9:00 AM - 6:00 PM',
      price: '€26',
      featured: true
    },
    {
      id: 14,
      name: 'Yellowstone National Park',
      category: 'parks',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000',
      description: 'First national park with geysers and wildlife',
      rating: 4.9,
      location: 'Wyoming, USA',
      openingHours: '24/7',
      price: '$35',
      featured: true
    },
    {
      id: 15,
      name: 'Sydney Opera House',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000',
      description: 'Iconic performing arts center',
      rating: 4.8,
      location: 'Sydney, Australia',
      openingHours: '9:00 AM - 5:00 PM',
      price: 'AUD 42',
      featured: true
    },
    {
      id: 16,
      name: 'Burj Khalifa',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000',
      description: 'World\'s tallest building',
      rating: 4.7,
      location: 'Dubai, UAE',
      openingHours: '9:00 AM - 11:00 PM',
      price: 'AED 149',
      featured: true
    },
    {
      id: 17,
      name: 'Great Wall of China',
      category: 'landmarks',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000',
      description: 'Ancient defensive wall stretching across China',
      rating: 4.9,
      location: 'Beijing, China',
      openingHours: '7:30 AM - 5:30 PM',
      price: '¥40',
      featured: true
    },
    {
      id: 18,
      name: 'Colosseum',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000',
      description: 'Ancient Roman amphitheater',
      rating: 4.8,
      location: 'Rome, Italy',
      openingHours: '8:30 AM - 7:00 PM',
      price: '€16',
      featured: true
    },
    {
      id: 19,
      name: 'Petra',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000',
      description: 'Ancient city carved into rose-red rock',
      rating: 4.9,
      location: 'Jordan',
      openingHours: '6:00 AM - 6:00 PM',
      price: 'JOD 50',
      featured: true
    },
    {
      id: 20,
      name: 'Machu Picchu',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000',
      description: '15th-century Inca citadel',
      rating: 4.9,
      location: 'Peru',
      openingHours: '6:00 AM - 5:30 PM',
      price: 'PEN 152',
      featured: true
    }
  ];

  const filteredAttractions = attractions
    .filter(attraction => {
      const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'price') {
        const getNumericPrice = (price) => {
          if (!price || price === 'Free' || price === 'Varies by event' || price === 'Varies by show') return 0;
          const numericValue = parseFloat(price.replace(/[^0-9.-]+/g, ''));
          return isNaN(numericValue) ? 0 : numericValue;
        };
        return getNumericPrice(a.price) - getNumericPrice(b.price);
      }
      return 0;
    });

  return (
    <div className="attractions-page">
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="filters-container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="view-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`attractions-container ${viewMode}`}>
        {filteredAttractions.map(attraction => (
          <div key={attraction.id} className="attraction-card">
            <div className="attraction-image">
              <img src={attraction.image} alt={attraction.name} />
              <div className="attraction-rating">
                <FaStar /> {attraction.rating}
              </div>
              {attraction.featured && (
                <div className="featured-badge">Featured</div>
              )}
            </div>
            <div className="attraction-info">
              <h3>{attraction.name}</h3>
              <p>{attraction.description}</p>
              <div className="attraction-details">
                <div className="detail-item">
                  <FaMapMarkerAlt /> {attraction.location}
                </div>
                <div className="detail-item">
                  <FaClock /> {attraction.openingHours}
                </div>
                <div className="detail-item">
                  <FaTicketAlt /> {attraction.price}
                </div>
              </div>
              <span className="attraction-category">{attraction.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions; 