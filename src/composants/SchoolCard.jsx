import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Edit, Trash, School, ArrowRight, Zap } from 'lucide-react';

const SchoolCard = ({ school, onDelete }) => {
  const { user } = useAuth();
  const defaultImage = '/src/assets/logo.png';

  return (
    <div className="group relative w-full max-w-sm mx-auto lg:max-w-none animate-fade-in-up">


      {/* effet glassmorphism */}


      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">


        {/* background elements */}
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* overlay */}


        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-emerald-500/20 rounded-3xl opacity-60 dark:opacity-40 transition-opacity duration-500 group-hover:opacity-80 blur-sm"></div>
        
        <div className="relative z-10 h-full flex flex-col">


          {/* image section */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-3xl">
            <img 
              src={school.photo || defaultImage} 
              alt={`Logo de ${school.name}`} 
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
            />


            

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* badge for school name on mobile */}


            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 sm:hidden">
              <div className="relative group/badge">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-2xl blur-sm opacity-60 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 group-hover/badge:shadow-2xl group-hover/badge:scale-105">
                  <div className="flex items-center">
                    <div className="relative group/icon mr-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                        <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-sm font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent truncate">
                      {school.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          


          {/* Content section */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow space-y-4 sm:space-y-6">


            {/* Title - hidden on mobile due to badge */}


            <div className="hidden sm:flex items-center">
              <div className="relative group/icon mr-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                  <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                {school.name}
              </h3>
            </div>


            
            {/* Description spacing */}


            <div className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-3 sm:line-clamp-4 font-medium">
                {school.description}
              </p>
            </div>
            
            {/* Actions section */}
            
            <div className="pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              {user?.role === 'Étudiant' && (
                <Link 
                  to={`/school/${school.id}`} 
                  className="group/btn relative w-full inline-flex items-center justify-center overflow-hidden px-6 sm:px-8 py-4 sm:py-5 font-bold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  <span className="relative z-10 flex items-center text-base sm:text-lg">
                    S'inscrire
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
                </Link>
              )}
              
              {user?.role === 'Directeur' && onDelete && (
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <Link 
                    to={`/school/edit/${school.id}`} 
                    className="group/edit relative overflow-hidden p-3 sm:p-4 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-amber-700 hover:to-orange-700 text-white rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                    title="Modifier l'école"
                  >
                    <Edit size={18} className="sm:w-5 sm:h-5 relative z-10 transition-transform duration-200 group-hover/edit:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover/edit:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
                  </Link>
                  <button 
                    onClick={() => onDelete(school.id)} 
                    className="group/delete relative overflow-hidden p-3 sm:p-4 bg-gradient-to-br from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white rounded-2xl shadow-xl shadow-red-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                    title="Supprimer l'école"
                  >
                    <Trash size={18} className="sm:w-5 sm:h-5 relative z-10 transition-transform duration-200 group-hover/delete:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 opacity-0 group-hover/delete:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
                  </button>
                </div>
              )}
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
        
        /* Amélioration du line-clamp */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SchoolCard;

