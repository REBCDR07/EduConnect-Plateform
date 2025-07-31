import React from 'react';
import useAuth from '../hooks/useAuth';
import HomePublic from './HomePublic';
import HomePrivate from './HomePrivate';

const HomePage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Éléments décoratifs de fond subtils */}
        <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="flex justify-center items-center min-h-screen relative">
          <div className="text-center">
            {/* Spinner simplifié */}
            <div className="w-16 h-16 mx-auto relative mb-6">
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-b-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute inset-6 bg-blue-500 rounded-full"></div>
            </div>

            {/* Texte de chargement */}
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Chargement...
            </p>

            {/* Barre de progression */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Préparation de votre espace...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <HomePrivate /> : <HomePublic />;
};

export default HomePage;