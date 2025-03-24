import React from 'react';
import { Navigate } from 'react-router-dom';

// AuthRoute protects routes that require authentication
const AuthRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <Component />;
};

export default AuthRoute; 