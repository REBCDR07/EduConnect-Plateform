import React, { useState, useEffect } from 'react';
import SchoolCard from '../composants/SchoolCard';
import schoolService from '../services/schoolService';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const HomePrivate = () => {
  const [schools, setSchools] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // liste fraîche des écoles nouvellements crées
    setSchools(schoolService.getSchools());
  }, []);
  
  // `HomePrivate` ne doit être vu que par des utilisateurs connectés à la plateforme

  if (!user) return null;

  if (user.role === 'Directeur') {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold">Bonjour, {user.firstName} !</h1>
        <p className="mt-4 text-lg">Votre tableau de bord contient tous les outils pour gérer vos établissements.</p>
        <Link to="/dashboard/director" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md">
          Aller au Tableau de Bord
        </Link>
      </div>
    );
  }

  // affichage pour l'étudiant
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
        Bonjour {user.firstName}, trouvez votre future école !
      </h1>
      
      {schools.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Aucune école n'est disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePrivate;