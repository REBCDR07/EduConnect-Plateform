import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, Home, Zap } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Non Trouvée - EduConnect</title>
        <meta name="description" content="La page que vous cherchez n'existe pas. Retournez à l'accueil d'EduConnect pour continuer votre navigation." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Éléments décoratifs de fond - optimisés */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Ligne décorative animée */}
        <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="relative w-full max-w-2xl animate-fade-in-up">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-12 xl:p-16 text-center">
              {/* Logo et branding */}
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-8 lg:mb-12">
                <div className="relative group/logo">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                    <Zap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white drop-shadow-sm" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                    EduConnect
                  </h2>
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Icône d'erreur */}
              <div className="relative group/error mb-8 lg:mb-12">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-red-500 via-red-600 to-orange-600 dark:from-red-400 dark:via-red-500 dark:to-orange-500 rounded-3xl flex items-center justify-center shadow-xl shadow-red-500/25 dark:shadow-red-400/20 transition-all duration-500 group-hover/error:scale-110 group-hover/error:shadow-2xl">
                  <AlertTriangle className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-md opacity-0 group-hover/error:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Titre et message d'erreur */}
              <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
                <div className="space-y-3 lg:space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-orange-600 dark:from-red-400 dark:via-red-300 dark:to-orange-400 bg-clip-text text-transparent leading-tight">
                    404
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 rounded-full mx-auto opacity-60"></div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                    Page Non Trouvée
                  </h2>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
                  Oups ! Il semble que cette page n'existe pas ou a été déplacée. Ne vous inquiétez pas, nous allons vous ramener en sécurité.
                </p>
              </div>

              {/* Bouton de retour */}
              <Link
                to="/"
                className="group relative inline-flex items-center space-x-3 sm:space-x-4 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <Home className="h-6 w-6 sm:h-7 sm:w-7 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">Retour à l'accueil</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </Link>

              {/* Message d'aide */}
              <div className="mt-8 lg:mt-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 dark:via-gray-600/30 to-transparent h-px top-1/2"></div>
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 mx-auto w-fit">
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
                      Besoin d'aide ? Contactez notre équipe support
                    </p>
                  </div>
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
          
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .animate-gradient-x {
            animation: gradient-x 6s ease infinite;
          }
          
          /* Amélioration du focus pour l'accessibilité */
          a:focus, button:focus {
            outline: 2px solid theme('colors.blue.500');
            outline-offset: 2px;
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
    </>
  );
};

export default NotFound;

