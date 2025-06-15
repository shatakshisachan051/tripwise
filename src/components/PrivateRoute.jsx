import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log('PrivateRoute: Current user state:', currentUser ? 'Logged in' : 'Not logged in');
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 