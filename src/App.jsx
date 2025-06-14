import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Attractions from './pages/Attractions';
import Questionnaire from './pages/Questionnaire';
import './App.css';

// Placeholder components for other routes
const Hotels = () => <div className="page">Hotels Page</div>;
const Deals = () => <div className="page">Deals Page</div>;
const About = () => <div className="page">About Page</div>;

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
