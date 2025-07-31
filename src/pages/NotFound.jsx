import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Éléments décoratifs de fond  */}
      <div className="fixed top-10 left-10 w-80 h-80 bg-gradient-to-br from-red-400/6 to-orange-400/6 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/6 to-purple-400/6 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-yellow-400/4 to-pink-400/4 rounded-full blur-3xl animate-float-slow"></div>

      {/* Container principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10 min-h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          
          {/* Container principal avec glassmorphisme */}
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-8 sm:p-10 lg:p-12 xl:p-16 overflow-hidden">
            {/* Effet de bordure  */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl opacity-10 blur-sm"></div>
            
            <div className="relative z-10">
              {/* Icône d'alerte 404 */}
              <div className="w-20 sm:w-24 lg:w-28 xl:w-32 h-20 sm:h-24 lg:h-28 xl:h-32 mx-auto mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl">
                <AlertTriangle className="h-10 sm:h-12 lg:h-14 xl:h-16 w-10 sm:w-12 lg:w-14 xl:w-16 text-white" />
              </div>

              {/* Titre 404 avec effet 3D pour desktop */}
              <div className="relative mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-widest transform hover:scale-105 transition-transform duration-500 select-none leading-none">
                  404
                </h1>
                {/* Ombre du texte responsive */}
                <div className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extrabold text-gray-300/15 dark:text-gray-700/15 tracking-widest transform translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 -z-10 leading-none">
                  404
                </div>
              </div>

              {/* Badge "Page non trouvée" */}
              <div className="inline-block relative mb-6 sm:mb-8 animate-wiggle">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full transform rotate-2 shadow-xl">
                  Page non trouvée
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base lg:text-lg rounded-full transform -rotate-1 blur-sm opacity-40 -z-10"></div>
              </div>

              {/* Message d'erreur responsive */}
              <div className="mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Oups ! Vous vous êtes perdu
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  La page que vous recherchez semble avoir disparu dans les méandres d'Internet. 
                  <br className="hidden sm:block" />
                  Mais ne vous inquiétez pas, nous allons vous ramener en sécurité !
                </p>
              </div>

              {/* Boutons d'action optimisés */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center animate-fade-in-up mb-8 sm:mb-10 lg:mb-12" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <Link 
                  to="/"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-3 text-base sm:text-lg lg:text-xl w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Home className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>Retour à l'accueil</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <button 
                  onClick={() => window.history.back()}
                  className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 hover:bg-white/95 dark:hover:bg-gray-700/95 text-gray-700 dark:text-gray-300 font-semibold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-600/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-3 backdrop-blur-sm text-base sm:text-lg lg:text-xl w-full sm:w-auto"
                >
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Page précédente</span>
                </button>
              </div>

              {/* Suggestions d'aide */}
              <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 animate-fade-in-up shadow-lg" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Quelques suggestions :
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-3 sm:space-y-4 text-left max-w-2xl mx-auto">
                  <li className="flex items-center space-x-3 sm:space-x-4 text-base sm:text-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Vérifiez l'URL dans la barre d'adresse</span>
                  </li>
                  <li className="flex items-center space-x-3 sm:space-x-4 text-base sm:text-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span>Utilisez le menu de navigation</span>
                  </li>
                  <li className="flex items-center space-x-3 sm:space-x-4 text-base sm:text-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>Contactez-nous si le problème persiste</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Éléments flottants décoratifs aux coins */}
          <div className="absolute -top-4 -left-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float opacity-50"></div>
          <div className="absolute -top-2 -right-6 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-6 -left-2 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-4 -right-4 w-6 sm:w-7 h-6 sm:h-7 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-float opacity-50" style={{ animationDelay: '0.5s' }}></div>
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
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(2deg);
          }
          25% {
            transform: rotate(-2deg);
          }
          75% {
            transform: rotate(2deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(8px);
          }
          66% {
            transform: translateY(10px) translateX(-8px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(12px) translateX(-10px);
          }
          66% {
            transform: translateY(-8px) translateX(12px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;