import React, { useState, useEffect } from 'react';
import SchoolCard from '../composants/SchoolCard';
import schoolService from '../services/schoolService';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePrivate = () => {
  const [schools, setSchools] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setSchools(schoolService.getSchools());
  }, []);
  
  if (!user) return null;

  // Si l'utilisateur est un directeur, le redirige vers son tableau de bord
  if (user.role === 'Directeur') {
    return (
      <>
        <Helmet>
          <title>Portail Directeur - EduConnect</title>
          <meta name="description" content="Accédez à votre tableau de bord pour gérer vos établissements et suivre les inscriptions de vos étudiants sur EduConnect." />
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-bold">Bonjour, {user.firstName} !</h1>
          <p className="mt-4 text-lg">Votre tableau de bord contient tous les outils pour gérer vos établissements.</p>
          <Link to="/dashboard/director" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md">
            Aller au Tableau de Bord
          </Link>
        </div>
      </>
    );
  }

  // Si c'est un étudiant, on affiche la liste des écoles
  return (
    <>
      <Helmet>
        <title>Liste des Écoles - EduConnect</title>
        <meta name="description" content="Explorez la liste des écoles et universités disponibles sur EDUCONNECT et trouvez la formation qui vous correspond pour postuler en ligne." />
      </Helmet>
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
    </>
  );
};

export default HomePrivate;