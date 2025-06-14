import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Destinations.css';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'adventure',
    'beach',
    'hill station',
    'historical',
    'cultural',
    'wildlife',
    'religious',
    'urban'
  ];

  const destinations = [
    {
      id: 1,
      name: 'Chongqing',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'A vibrant metropolis in China known for its spicy cuisine and modern architecture',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Almaty',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1000',
      description: 'Kazakhstan\'s largest city, surrounded by the beautiful Tian Shan mountains',
      rating: 4.3
    },
    {
      id: 3,
      name: 'Hawaii',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
      description: 'Paradise islands with stunning beaches and volcanic landscapes',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Taj Mahal',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000',
      description: 'A stunning white marble mausoleum in Agra, India',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Mount Everest Base Camp',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000',
      description: 'Trek to the base of the world\'s highest mountain',
      rating: 4.9
    },
    {
      id: 6,
      name: 'Grand Canyon',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000',
      description: 'Breathtaking natural wonder with hiking and rafting opportunities',
      rating: 4.8
    },
    {
      id: 7,
      name: 'Maldives',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
      description: 'Tropical paradise with crystal clear waters and white sand beaches',
      rating: 4.9
    },
    {
      id: 8,
      name: 'Bali',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      description: 'Indonesian island known for its beaches, rice terraces, and temples',
      rating: 4.7
    },
    {
      id: 9,
      name: 'Darjeeling',
      category: 'hill station',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1000',
      description: 'Famous for its tea plantations and Himalayan views',
      rating: 4.6
    },
    {
      id: 10,
      name: 'Shimla',
      category: 'hill station',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1000',
      description: 'Queen of Hills with colonial architecture and scenic beauty',
      rating: 4.5
    },
    {
      id: 11,
      name: 'Petra',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000',
      description: 'Ancient city carved into rose-red rock in Jordan',
      rating: 4.8
    },
    {
      id: 12,
      name: 'Machu Picchu',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000',
      description: 'Inca citadel set high in the Andes Mountains',
      rating: 4.9
    },
    {
      id: 13,
      name: 'Kyoto',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000',
      description: 'Japan\'s cultural heart with ancient temples and gardens',
      rating: 4.7
    },
    {
      id: 14,
      name: 'Varanasi',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000',
      description: 'Spiritual capital of India on the banks of the Ganges',
      rating: 4.6
    },
    {
      id: 15,
      name: 'Serengeti',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000',
      description: 'Famous for the annual wildebeest migration',
      rating: 4.8
    },
    {
      id: 16,
      name: 'Ranthambore',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1534567110353-1fdfa02095f5?q=80&w=1000',
      description: 'Tiger reserve with ancient fort and diverse wildlife',
      rating: 4.5
    },
    {
      id: 17,
      name: 'Jerusalem',
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000',
      description: 'Holy city for three major religions',
      rating: 4.7
    },
    {
      id: 18,
      name: 'Vatican City',
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000',
      description: 'Center of the Catholic Church with stunning art',
      rating: 4.8
    },
    {
      id: 19,
      name: 'Tokyo',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000',
      description: 'Ultra-modern city with traditional culture',
      rating: 4.6
    },
    {
      id: 20,
      name: 'New York',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000',
      description: 'The city that never sleeps with iconic landmarks',
      rating: 4.7
    },
    {
      id: 21,
      name: 'Santorini',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000',
      description: 'Greek island with stunning sunsets and white-washed buildings',
      rating: 4.9
    },
    {
      id: 22,
      name: 'Banff',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1513111168955-1c8d0a81d656?q=80&w=1000',
      description: 'Canadian Rockies paradise with lakes and mountains',
      rating: 4.8
    },
    {
      id: 23,
      name: 'Venice',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1534113413411-26bcdcba6c96?q=80&w=1000',
      description: 'Romantic city of canals and historic architecture',
      rating: 4.7
    },
    {
      id: 24,
      name: 'Great Barrier Reef',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1000',
      description: 'World\'s largest coral reef system',
      rating: 4.9
    },
    {
      id: 25,
      name: 'Dubai',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000',
      description: 'Ultra-modern city with luxury shopping and architecture',
      rating: 4.6
    },
    {
      id: 26,
      name: 'Angkor Wat',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000',
      description: 'Largest religious monument in the world',
      rating: 4.8
    },
    {
      id: 27,
      name: 'Safari Serengeti',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000',
      description: 'Experience the great migration of wildebeest',
      rating: 4.9
    }
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="destinations-page">
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
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
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <div className="destination-image">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-rating">
                ⭐ {destination.rating}
              </div>
            </div>
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <span className="destination-category">{destination.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations; 