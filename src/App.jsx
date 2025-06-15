import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Attractions from './pages/Attractions';
import Questionnaire from './pages/Questionnaire';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

// Placeholder components for other routes
const Hotels = () => <div className="page">Hotels Page</div>;
const Deals = () => <div className="page">Deals Page</div>;

// Layout component to include Navbar
function Layout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

// Create router with future flags
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/destinations',
    element: <Layout><Destinations /></Layout>
  },
  {
    path: '/attractions',
    element: <Layout><Attractions /></Layout>
  },
  {
    path: '/hotels',
    element: <Layout><Hotels /></Layout>
  },
  {
    path: '/deals',
    element: <Layout><Deals /></Layout>
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>
  },
  {
    path: '/signup',
    element: <Layout><SignUp /></Layout>
  },
  {
    path: '/questionnaire',
    element: (
      <Layout>
        <PrivateRoute>
          <Questionnaire />
        </PrivateRoute>
      </Layout>
    )
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Layout>
    )
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </Layout>
    )
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button 
        className={`theme-btn ${currentTheme.name === 'summer' ? 'active' : ''}`}
        onClick={() => changeTheme('summer')}
        title="Summer Theme"
      >
        ☀️
      </button>
      <button 
        className={`theme-btn ${currentTheme.name === 'winter' ? 'active' : ''}`}
        onClick={() => changeTheme('winter')}
        title="Winter Theme"
      >
        ❄️
      </button>
      <button 
        className={`theme-btn ${currentTheme.name === 'day' ? 'active' : ''}`}
        onClick={() => changeTheme('day')}
        title="Day Theme"
      >
        🌞
      </button>
      <button 
        className={`theme-btn ${currentTheme.name === 'night' ? 'active' : ''}`}
        onClick={() => changeTheme('night')}
        title="Night Theme"
      >
        🌙
      </button>
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

// Public Route component
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/dashboard" />;
};

function App() {
  console.log('App: Rendering with AuthProvider');
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="app">
            <Navbar />
            <ThemeSwitcher />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/about" element={<About />} />
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/questionnaire" element={<PrivateRoute><Questionnaire /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
