import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute redirects authenticated users away from routes they shouldn't access when logged in
// For example, login and signup pages
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return element;
};

export default ProtectedRoute; 