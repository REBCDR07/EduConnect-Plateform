import React from 'react';
import useAuth from '../hooks/useAuth';
import HomePublic from './HomePublic';
import HomePrivate from './HomePrivate';

const HomePage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p>Chargement...</p>
      </div>
    );
  }

  return isAuthenticated ? <HomePrivate /> : <HomePublic />;
};

export default HomePage;