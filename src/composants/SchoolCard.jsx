import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Edit, Trash } from 'lucide-react';

const SchoolCard = ({ school, onDelete }) => {
  const { user } = useAuth();
  const defaultImage = '/src/assets/logo.png'; // L'image par défaut si le créateur n'upload pas d'image à la base

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img 
        src={school.photo || defaultImage} 
        alt={`Logo de ${school.name}`} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2">{school.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{school.description}</p>
        
        {user?.role === 'Étudiant' && (
          <Link to={`/school/${school.id}`} className="w-full text-center bg-blue-500 text-white font-bold py-2 px-4 rounded">
            S'inscrire
          </Link>
        )}
        {user?.role === 'Directeur' && onDelete && (
          <div className="flex justify-end space-x-2 mt-4">
             <Link to={`/school/edit/${school.id}`} className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"><Edit size={20}/></Link>
             <button onClick={() => onDelete(school.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"><Trash size={20}/></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SchoolCard;