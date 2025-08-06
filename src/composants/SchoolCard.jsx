import React, { useState, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Edit, Trash, School, ArrowRight, Zap, Heart, Eye, Users } from 'lucide-react';

const SchoolCard = memo(({ school, onDelete }) => {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const defaultImage = '/src/assets/logo.png';

  // Optimisation: useCallback pour éviter les re-renders
  const handleImageError = useCallback((e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = defaultImage;
    }
  }, [imageError, defaultImage]);

  const handleDelete = useCallback(async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${school.name}" ?`)) {
      setIsLoading(true);
      try {
        await onDelete(school.id);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onDelete, school.id, school.name]);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    // Ici vous pourriez ajouter la logique pour sauvegarder en base
  }, [isFavorite]);

  // Optimisation: useMemo pour les calculs coûteux
  const truncatedDescription = useMemo(() => {
    if (!school.description) return '';
    const maxLength = window.innerWidth < 640 ? 120 : 180;
    return school.description.length > maxLength 
      ? school.description.substring(0, maxLength) + '...'
      : school.description;
  }, [school.description]);

  const cardStats = useMemo(() => ({
    students: Math.floor(Math.random() * 500) + 50, // Simulation
    rating: (Math.random() * 2 + 3).toFixed(1), // Rating entre 3.0 et 5.0
  }), [school.id]);

  return (
    <article className="group relative w-full max-w-sm mx-auto lg:max-w-none animate-fade-in-up">
      {/* Glassmorphism effect */}
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02]">

        {/* Background elements - optimisés pour mobile */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Gradient overlay */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-emerald-500/20 rounded-2xl sm:rounded-3xl opacity-60 dark:opacity-40 transition-opacity duration-500 group-hover:opacity-80 blur-sm"></div>
        
        <div className="relative z-10 h-full flex flex-col">

          {/* Image section avec lazy loading */}
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <img 
              src={school.photo || defaultImage} 
              alt={`Logo de ${school.name}`} 
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Stats overlay - visible sur hover */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex space-x-2">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-800 dark:text-gray-200 flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{cardStats.students}</span>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-800 dark:text-gray-200 flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{cardStats.rating}</span>
                </div>
              </div>
            </div>

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart 
                className={`h-4 w-4 transition-colors duration-200 ${
                  isFavorite 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
                }`} 
              />
            </button>
            
            {/* Badge pour le nom d'école sur mobile */}
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 sm:hidden">
              <div className="relative group/badge">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-xl sm:rounded-2xl blur-sm opacity-60 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl transition-all duration-300 group-hover/badge:shadow-2xl group-hover/badge:scale-105">
                  <div className="flex items-center">
                    <div className="relative group/icon mr-2 sm:mr-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                        <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg sm:rounded-xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent truncate flex-1">
                      {school.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col flex-grow space-y-3 sm:space-y-4 lg:space-y-6">

            {/* Title - caché sur mobile à cause du badge */}
            <div className="hidden sm:flex items-center">
              <div className="relative group/icon mr-3 sm:mr-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent truncate">
                  {school.name}
                </h3>
              </div>
            </div>
            
            {/* Description */}
            <div className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                {truncatedDescription}
              </p>
            </div>

            {/* Quick stats - visible uniquement sur desktop */}
            <div className="hidden lg:flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50 pt-3">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{cardStats.students} étudiants</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{cardStats.rating}/5</span>
              </div>
            </div>
            
            {/* Actions section */}
            <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              {user?.role === 'Étudiant' && (
                <Link 
                  to={`/school/${school.id}`} 
                  className="group/btn relative w-full inline-flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-bold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-sm sm:text-base lg:text-lg"
                >
                  <span className="relative z-10 flex items-center">
                    S'inscrire
                    <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                </Link>
              )}
              
              {user?.role === 'Directeur' && onDelete && (
                <div className="flex justify-end space-x-2 sm:space-x-3 lg:space-x-4">
                  <Link 
                    to={`/school/edit/${school.id}`} 
                    className="group/edit relative overflow-hidden p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-amber-700 hover:to-orange-700 text-white rounded-xl sm:rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                    title="Modifier l'école"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-200 group-hover/edit:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover/edit:opacity-30 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                  </Link>
                  <button 
                    onClick={handleDelete} 
                    disabled={isLoading}
                    className="group/delete relative overflow-hidden p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 disabled:from-red-400 disabled:via-red-500 disabled:to-pink-500 text-white rounded-xl sm:rounded-2xl shadow-xl shadow-red-500/25 transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    title="Supprimer l'école"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-200 group-hover/delete:scale-110"/>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 opacity-0 group-hover/delete:opacity-30 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
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
            transform: translateY(20px);
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
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        
        /* Focus amélioré pour l'accessibilité */
        a:focus-visible, button:focus-visible {
          outline: 2px solid theme('colors.blue.500');
          outline-offset: 2px;
        }
        
        /* Animation de pulse optimisée */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        /* Préloader d'image */
        img {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        img[src] {
          animation: none;
          background: none;
        }
        
        /* Optimisation pour les écrans rétine */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .blur-2xl {
            backdrop-filter: blur(20px);
          }
          .blur-3xl {
            backdrop-filter: blur(30px);
          }
        }
        
        /* Améliorations pour très petits écrans */
        @media (max-width: 360px) {
          .animate-fade-in-up {
            animation-duration: 0.6s;
          }
        }
        
        /* Optimisation pour les écrans tactiles */
        @media (hover: none) and (pointer: coarse) {
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.05);
          }
          .group:hover .group-hover\\:-translate-y-2 {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </article>
  );
});

SchoolCard.displayName = 'SchoolCard';

export default SchoolCard;