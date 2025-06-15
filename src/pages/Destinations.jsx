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
    // Adventure Destinations
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
    // Beach Destinations
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
    // Hill Stations
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
    // Historical Places
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
    // Cultural Destinations
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
    // Wildlife Destinations
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
    // Religious Places
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
    // Urban Destinations
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
    // Adding more destinations...
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
    // Continue with more destinations...
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
    // Add more destinations here...
    {
      id: 25,
      name: 'Dubai',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000',
      description: 'Ultra-modern city with luxury shopping and architecture',
      rating: 4.6
    },
    // Continue adding more destinations...
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
    },
    {
      id: 28,
      name: 'Swiss Alps',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Majestic mountains with world-class skiing',
      rating: 4.8
    },
    {
      id: 29,
      name: 'Barcelona',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Artistic city with unique architecture and beaches',
      rating: 4.7
    },
    {
      id: 30,
      name: 'Sydney',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Iconic harbor city with Opera House',
      rating: 4.6
    },
    // Continue with more destinations...
    {
      id: 31,
      name: 'Amazon Rainforest',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'World\'s largest rainforest with diverse wildlife',
      rating: 4.8
    },
    {
      id: 32,
      name: 'Paris',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of Love with iconic landmarks',
      rating: 4.7
    },
    // Add more destinations...
    {
      id: 33,
      name: 'Great Wall of China',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Ancient wonder stretching across mountains',
      rating: 4.9
    },
    {
      id: 34,
      name: 'Santorini',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Greek island with stunning sunsets',
      rating: 4.8
    },
    // Continue with more destinations...
    {
      id: 35,
      name: 'Yellowstone',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'First national park with geysers and wildlife',
      rating: 4.7
    },
    // Add remaining destinations...
    {
      id: 36,
      name: 'Marrakech',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Vibrant Moroccan city with historic medina',
      rating: 4.6
    },
    // Continue with more destinations...
    {
      id: 37,
      name: 'Rio de Janeiro',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Brazilian city with famous beaches and carnival',
      rating: 4.7
    },
    {
      id: 38,
      name: 'Petra',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Ancient city carved into rose-red rock',
      rating: 4.8
    },
    // Add more destinations...
    {
      id: 39,
      name: 'Bangkok',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Vibrant city with temples and street food',
      rating: 4.6
    },
    {
      id: 40,
      name: 'Amsterdam',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of canals and historic architecture',
      rating: 4.7
    },
    // Continue with more destinations...
    {
      id: 41,
      name: 'Cairo',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Ancient city with pyramids and museums',
      rating: 4.5
    },
    {
      id: 42,
      name: 'Singapore',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Modern city-state with diverse culture',
      rating: 4.8
    },
    // Add more destinations...
    {
      id: 43,
      name: 'Istanbul',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City spanning two continents',
      rating: 4.7
    },
    {
      id: 44,
      name: 'Seoul',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Modern city with traditional culture',
      rating: 4.6
    },
    // Continue with more destinations...
    {
      id: 45,
      name: 'Cape Town',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City with Table Mountain and beaches',
      rating: 4.7
    },
    // Add remaining destinations...
    {
      id: 46,
      name: 'Vienna',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of music and imperial palaces',
      rating: 4.8
    },
    {
      id: 47,
      name: 'Hong Kong',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Vibrant city with stunning skyline',
      rating: 4.6
    },
    {
      id: 48,
      name: 'Rome',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Eternal city with ancient ruins',
      rating: 4.9
    },
    {
      id: 49,
      name: 'Barcelona',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of Gaudi and Mediterranean charm',
      rating: 4.7
    },
    {
      id: 50,
      name: 'San Francisco',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City with Golden Gate Bridge',
      rating: 4.6
    },
    // Continue with more destinations...
    {
      id: 51,
      name: 'Mumbai',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of dreams with diverse culture',
      rating: 4.5
    },
    {
      id: 52,
      name: 'Berlin',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City with rich history and art',
      rating: 4.7
    },
    // Add more destinations...
    {
      id: 53,
      name: 'Dubai',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of luxury and modern architecture',
      rating: 4.8
    },
    {
      id: 54,
      name: 'Athens',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Ancient city with Acropolis',
      rating: 4.6
    },
    {
      id: 55,
      name: 'Prague',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of a hundred spires',
      rating: 4.7
    },
    // Continue with more destinations...
    {
      id: 56,
      name: 'Shanghai',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Modern city with historic charm',
      rating: 4.6
    },
    {
      id: 57,
      name: 'Edinburgh',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Historic city with castle',
      rating: 4.7
    },
    {
      id: 58,
      name: 'Toronto',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Multicultural city with CN Tower',
      rating: 4.5
    },
    {
      id: 59,
      name: 'Lisbon',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of seven hills',
      rating: 4.6
    },
    {
      id: 60,
      name: 'Stockholm',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City spread across islands',
      rating: 4.7
    },
    // Continue with more destinations...
    {
      id: 61,
      name: 'Budapest',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of thermal baths',
      rating: 4.6
    },
    {
      id: 62,
      name: 'Osaka',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Food lover\'s paradise',
      rating: 4.7
    },
    {
      id: 63,
      name: 'Helsinki',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Design capital of Finland',
      rating: 4.5
    },
    {
      id: 64,
      name: 'Warsaw',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Phoenix city of Europe',
      rating: 4.6
    },
    {
      id: 65,
      name: 'Dublin',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of literature and pubs',
      rating: 4.7
    },
    // Continue with more destinations...
    {
      id: 66,
      name: 'Copenhagen',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of bicycles and design',
      rating: 4.6
    },
    {
      id: 67,
      name: 'Brussels',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Capital of Europe',
      rating: 4.5
    },
    {
      id: 68,
      name: 'Madrid',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of art and tapas',
      rating: 4.7
    },
    {
      id: 69,
      name: 'Moscow',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of Red Square',
      rating: 4.6
    },
    {
      id: 70,
      name: 'Amsterdam',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of canals',
      rating: 4.7
    },
    // Continue with more destinations...
    {
      id: 71,
      name: 'Bangkok',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of street food',
      rating: 4.6
    },
    {
      id: 72,
      name: 'Seoul',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of K-pop and technology',
      rating: 4.7
    },
    {
      id: 73,
      name: 'Taipei',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of night markets',
      rating: 4.5
    },
    {
      id: 74,
      name: 'Manila',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of history and culture',
      rating: 4.4
    },
    {
      id: 75,
      name: 'Jakarta',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Capital of Indonesia',
      rating: 4.3
    },
    // Continue with more destinations...
    {
      id: 76,
      name: 'Kuala Lumpur',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of Petronas Towers',
      rating: 4.6
    },
    {
      id: 77,
      name: 'Hanoi',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of street food',
      rating: 4.5
    },
    {
      id: 78,
      name: 'Phnom Penh',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of temples',
      rating: 4.4
    },
    {
      id: 79,
      name: 'Vientiane',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of Buddhist temples',
      rating: 4.3
    },
    {
      id: 80,
      name: 'Yangon',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of golden pagodas',
      rating: 4.4
    },
    // Continue with more destinations...
    {
      id: 81,
      name: 'Kathmandu',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of temples',
      rating: 4.5
    },
    {
      id: 82,
      name: 'Colombo',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of beaches',
      rating: 4.4
    },
    {
      id: 83,
      name: 'Male',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Capital of Maldives',
      rating: 4.3
    },
    {
      id: 84,
      name: 'Thimphu',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of happiness',
      rating: 4.4
    },
    {
      id: 85,
      name: 'Dhaka',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of rickshaws',
      rating: 4.3
    },
    // Continue with more destinations...
    {
      id: 86,
      name: 'Karachi',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of lights',
      rating: 4.2
    },
    {
      id: 87,
      name: 'Lahore',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of gardens',
      rating: 4.3
    },
    {
      id: 88,
      name: 'Islamabad',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Planned capital city',
      rating: 4.2
    },
    {
      id: 89,
      name: 'Kabul',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of gardens',
      rating: 4.1
    },
    {
      id: 90,
      name: 'Tehran',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of mountains',
      rating: 4.2
    },
    // Continue with more destinations...
    {
      id: 91,
      name: 'Baghdad',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of peace',
      rating: 4.1
    },
    {
      id: 92,
      name: 'Damascus',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Oldest capital',
      rating: 4.2
    },
    {
      id: 93,
      name: 'Beirut',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Paris of the Middle East',
      rating: 4.3
    },
    {
      id: 94,
      name: 'Amman',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of seven hills',
      rating: 4.2
    },
    {
      id: 95,
      name: 'Jerusalem',
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Holy city',
      rating: 4.4
    },
    // Continue with more destinations...
    {
      id: 96,
      name: 'Tel Aviv',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City that never sleeps',
      rating: 4.3
    },
    {
      id: 97,
      name: 'Cairo',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of pyramids',
      rating: 4.4
    },
    {
      id: 98,
      name: 'Alexandria',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Pearl of the Mediterranean',
      rating: 4.3
    },
    {
      id: 99,
      name: 'Casablanca',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'City of white buildings',
      rating: 4.2
    },
    {
      id: 100,
      name: 'Marrakech',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1000',
      description: 'Red city',
      rating: 4.3
    }
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div  className="destinations-page">
      <div  className="search-section">
        <div style={{width: '30%'}} className="search-container">
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
            <button style={{width: '60px'}}
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