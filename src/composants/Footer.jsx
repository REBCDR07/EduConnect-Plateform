import React from 'react';
import { Heart, Code, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 mt-16 sm:mt-20 lg:mt-24 overflow-hidden">


      {/* styles de fond  */}

      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      
      {/* ligne décorative */}*

      <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* section principale */}
        <div className="py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* logo et description */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">

                <div className="relative group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-blue-500/30">
                    <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 text-white drop-shadow-sm" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                    EduConnect
                  </span>
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-sm mx-auto lg:mx-0 font-medium">
                Connecter l'éducation avec l'innovation pour un avenir meilleur et plus accessible.
              </p>
            </div>

            {/* copyright central */}


            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 rounded-3xl sm:rounded-[2rem] opacity-20 dark:opacity-15 blur-sm group-hover:opacity-30 dark:group-hover:opacity-25 transition-opacity duration-500"></div>

                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 xl:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">


                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-100 font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                      © {currentYear} <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">EduConnect</span>
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg font-medium">
                      Tous droits réservés.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* message créatif */}
            <div className="text-center lg:text-right animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>

              <div className="group cursor-pointer">
                <div className="flex items-center justify-center lg:justify-end space-x-2 sm:space-x-3 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-all duration-500 mb-3 sm:mb-4">

                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium">Fait avec</span>
                  <div className="relative">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-red-500 dark:text-red-400 group-hover:scale-125 transition-all duration-500 drop-shadow-sm" />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium">et</span>

                  <div className="relative">
                    <Code className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-500 dark:text-blue-400 group-hover:scale-125 transition-all duration-500 drop-shadow-sm" />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                </div>
                <div className="relative">
                  <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-500 font-medium leading-relaxed">
                    Pour l'éducation de demain avec l'innovation technologique !
                  </p>
                  <div className="absolute -bottom-1 left-1/2 lg:left-auto lg:right-0 transform -translate-x-1/2 lg:translate-x-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"></div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* barre de séparation  */}


        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 dark:via-gray-600/30 to-transparent h-px"></div>
          <div className="py-8 sm:py-10 lg:py-12 xl:py-14">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 sm:space-y-8 lg:space-y-0 lg:space-x-8">
              
              {/* Liens rapides infonctionnel, à complèté plus tard pour les versions à venir */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 xl:gap-8 text-sm sm:text-base lg:text-lg animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                {[
                  { name: "À propos", color: "blue" },
                  { name: "Contact", color: "purple" },
                  { name: "Politique de confidentialité", color: "emerald" },
                  { name: "Conditions d'utilisation", color: "amber" }
                ].map((link, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className={`group relative px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 hover:text-${link.color}-600 dark:hover:text-${link.color}-400 transition-all duration-300 font-medium rounded-xl hover:bg-${link.color}-50 dark:hover:bg-${link.color}-900/20`}
                  >

                    <span className="relative z-10">{link.name}</span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${link.color}-500/0 to-${link.color}-500/0 group-hover:from-${link.color}-500/10 group-hover:to-${link.color}-500/10 rounded-xl transition-all duration-300`}></div>
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 bg-${link.color}-500 dark:bg-${link.color}-400 transition-all duration-300 rounded-full`}></div>
                  </a>
                ))}
              </div>

              {/* badge version */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>

                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 dark:from-emerald-400/15 dark:to-blue-400/15 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>


                  <div className="relative inline-flex items-center space-x-3 sm:space-x-4 bg-white/90 dark:bg-gray-700/90 backdrop-blur-xl px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full border border-gray-200/50 dark:border-gray-600/50 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 transition-all duration-500 group-hover:shadow-xl group-hover:scale-105">


                    <div className="relative">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full animate-ping"></div>
                    </div>

                    <span className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200">
                      Version 1.0.0
                    </span>

                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                      • Test 
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* effet de vague */}

        
        <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-blue-500/20 via-purple-500/20 via-emerald-500/20 to-transparent animate-wave rounded-t-full"></div>
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
        
        @keyframes wave {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.7;
          }
          50% {
            transform: scaleX(1.1) scaleY(1.2);
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
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
    </footer>
  );
};

export default Footer;

