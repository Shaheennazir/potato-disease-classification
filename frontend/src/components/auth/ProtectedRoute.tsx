import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/login" replace />;
  }

  // Render children if token exists
  return <>{children}</>;
};

export default ProtectedRoute;