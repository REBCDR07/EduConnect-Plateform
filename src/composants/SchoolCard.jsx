import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Edit, Trash, School, ArrowRight } from 'lucide-react';

const SchoolCard = ({ school, onDelete }) => {
  const { user } = useAuth();
  const defaultImage = '/src/assets/logo.png';

  return (
    <div className="group relative w-full max-w-sm mx-auto lg:max-w-none">
      {/* Conteneur principal avec effet glassmorphism amélioré */}
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/40 overflow-hidden transition-all duration-500 ease-out hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.02]">
        
        {/* Élément décoratif subtil */}
        <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-3xl opacity-60 dark:opacity-40"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Section image améliorée */}
          <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
            <img 
              src={school.photo || defaultImage} 
              alt={`Logo de ${school.name}`} 
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
            />
            {/* Overlay gradient plus doux */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            
            {/* Badge flottant pour le nom de l'école sur mobile */}
            <div className="absolute bottom-4 left-4 right-4 sm:hidden">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center">
                  <School className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 truncate">
                    {school.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section contenu */}
          <div className="p-6 sm:p-8 flex flex-col flex-grow space-y-4">
            {/* Titre - caché sur mobile car affiché dans le badge */}
            <div className="hidden sm:flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-400/20 dark:to-blue-500/20 rounded-2xl mr-4">
                <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                {school.name}
              </h3>
            </div>
            
            {/* Description avec meilleur espacement */}
            <div className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg line-clamp-3 sm:line-clamp-none">
                {school.description}
              </p>
            </div>
            
            {/* Section actions */}
            <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              {user?.role === 'Étudiant' && (
                <Link 
                  to={`/school/${school.id}`} 
                  className="group/btn relative w-full inline-flex items-center justify-center overflow-hidden px-8 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  <span className="relative z-10 flex items-center text-lg">
                    S'inscrire
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </Link>
              )}
              
              {user?.role === 'Directeur' && onDelete && (
                <div className="flex justify-end space-x-3">
                  <Link 
                    to={`/school/edit/${school.id}`} 
                    className="group/edit relative p-3 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                    title="Modifier l'école"
                  >
                    <Edit size={20} className="relative z-10 transition-transform duration-200 group-hover/edit:scale-110"/>
                  </Link>
                  <button 
                    onClick={() => onDelete(school.id)} 
                    className="group/delete relative p-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50"
                    title="Supprimer l'école"
                  >
                    <Trash size={20} className="relative z-10 transition-transform duration-200 group-hover/delete:scale-110"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;