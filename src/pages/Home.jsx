import React from 'react';
import useAuth from '../hooks/useAuth';
import HomePublic from './HomePublic';
import HomePrivate from './HomePrivate';
import { Zap } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Éléments décoratifs de fond - optimisés */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Ligne décorative animée */}
        <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

        <div className="flex justify-center items-center min-h-screen relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="relative group mb-8 lg:mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8 sm:p-10 lg:p-12">
                {/* Logo et titre */}
                <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 lg:mb-8">
                  <div className="relative group/logo">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                      <Zap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                      EduConnect
                    </h1>
                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                  </div>
                </div>

                {/* Spinner amélioré */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-6 lg:mb-8">
                  <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-transparent border-b-purple-500 dark:border-b-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  <div className="absolute inset-4 border-4 border-transparent border-l-emerald-500 dark:border-l-emerald-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-6 sm:inset-7 lg:inset-8 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 rounded-full animate-pulse"></div>
                </div>

                {/* Texte de chargement */}
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                    Chargement...
                  </p>

                  {/* Barre de progression améliorée */}
                  <div className="w-64 sm:w-80 lg:w-96 mx-auto">
                    <div className="relative h-2 sm:h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 rounded-full animate-gradient-x"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer"></div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium">
                    Préparation de votre espace...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
            @keyframes fade-in-up {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes gradient-x {
                0%, 100% {
                    background-size: 400% 400%;
                    background-position: left center;
                }
                50% {
                    background-size: 400% 400%;
                    background-position: right center;
                }
            }
            
            @keyframes shimmer {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(100%);
                }
            }
            
            .animate-fade-in-up {
                animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-gradient-x {
                animation: gradient-x 3s ease infinite;
            }
            
            .animate-shimmer {
                animation: shimmer 2s ease-in-out infinite;
            }
            
            /* Animation de pulse améliorée */
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.05);
                }
            }
        `}</style>
      </div>
    );
  }

  return isAuthenticated ? <HomePrivate /> : <HomePublic />;
};

export default HomePage;

