import React, { useState, useEffect } from 'react';
import SchoolCard from '../composants/SchoolCard';
import schoolService from '../services/schoolService';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building2, GraduationCap } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Éléments décoratifs de fond subtils */}
          <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="fixed bottom-0 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Bonjour, {user.firstName} !
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                  Bienvenue sur votre portail de gestion
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 lg:p-12 mb-8">
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Tableau de bord Directeur
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    Votre tableau de bord contient tous les outils pour gérer vos établissements, 
                    suivre les inscriptions et administrer votre plateforme éducative.
                  </p>
                </div>
                
                <Link 
                  to="/dashboard/director" 
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-sm transition-colors duration-200 group"
                >
                  <span>Accéder au Tableau de Bord</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

              {/* Statistiques rapides ou informations utiles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 mx-auto">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Établissements</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Gérez vos écoles et formations</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4 mx-auto">
                    <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Inscriptions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Suivez les demandes d'inscription</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4 mx-auto">
                    <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reporting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Exportez vos données</p>
                </div>
              </div>
            </div>
          </div>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Éléments décoratifs de fond subtils */}
        <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* En-tête */}
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    Bonjour {user.firstName} !
                  </h1>
                  <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1">
                    Trouvez votre future école parmi nos établissements partenaires
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
            {schools.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                  Aucune école disponible
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Aucune école n'est disponible pour le moment. 
                  Revenez plus tard pour découvrir nos établissements partenaires.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Écoles disponibles
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Découvrez {schools.length} établissement{schools.length > 1 ? 's' : ''} et trouvez votre formation idéale
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {schools.map((school) => (
                    <div key={school.id}>
                      <SchoolCard school={school} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePrivate;