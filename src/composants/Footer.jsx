import React from 'react';
import { Heart, Code, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 mt-16 overflow-hidden">
      {/* Éléments décoratifs de fond - plus subtils */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/6 to-blue-500/6 rounded-full blur-3xl"></div>
      
      {/* Ligne décorative animée - plus subtile */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-green-500/60 animate-gradient-x"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 xl:px-12">
        {/* Section principale */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            
            {/* Logo et description */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Zap className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EduConnect
                </span>
              </div>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                Connecter l'éducation avec l'innovation pour un avenir meilleur et plus accessible.
              </p>
            </div>

            {/* Copyright central */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="relative bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10 dark:border-gray-700/30">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl opacity-10 blur-sm"></div>
                <div className="relative z-10">
                  <p className="text-gray-300 dark:text-gray-200 font-semibold text-lg lg:text-xl">
                    © {currentYear} <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">EduConnect</span>
                  </p>
                  <p className="text-gray-400 dark:text-gray-300 text-base mt-3">
                    Tous droits réservés.
                  </p>
                </div>
              </div>
            </div>

            {/* Message créatif */}
            <div className="text-center lg:text-right animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="flex items-center justify-center lg:justify-end space-x-3 text-gray-400 hover:text-gray-300 transition-colors duration-500 group cursor-pointer">
                <span className="text-base lg:text-lg">Fait avec</span>
                <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-red-500 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-base lg:text-lg">et</span>
                <Code className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-3">
                Pour l'éducation de demain avec l'innovation technologique !
              </p>
            </div>
          </div>
        </div>

        {/* Barre de séparation décorative */}
        <div className="border-t border-gray-700/50 dark:border-gray-600/30 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Liens rapides */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-10 text-base animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:underline hover:underline-offset-4 font-medium">
                À propos
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:underline hover:underline-offset-4 font-medium">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:underline hover:underline-offset-4 font-medium">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline hover:underline-offset-4 font-medium">
                Conditions d'utilisation
              </a>
            </div>

            {/* Badge version */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-600/30 shadow-lg">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-300">
                  Version 1.0.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Effet de vague décoratif */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-wave"></div>
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
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.05);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-wave {
          animation: wave 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;