import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import SchoolCard from '../composants/SchoolCard';
import { ArrowRight, Building2, GraduationCap, Zap, School } from 'lucide-react';

const HomePrivate = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const schoolsFromDb = await schoolService.getSchools();
        setSchools(schoolsFromDb);
      } catch (error) {
        console.error("Erreur Firebase lors de la récupération des écoles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'Étudiant') {
      fetchSchools();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) return null;

  if (user.role === 'Directeur') {
    return (
      <>
        <Helmet>
          <title>Portail Directeur - EduConnect</title>
          <meta name="description" content="Accédez à votre tableau de bord pour gérer vos établissements et suivre les inscriptions de vos étudiants sur EduConnect." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
          {/* Éléments décoratifs de fond - optimisés */}
          <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Ligne décorative animée */}
          <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 lg:py-16">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8 lg:mb-12 animate-fade-in-up">
                {/* Logo et branding */}
                <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-8 lg:mb-12">
                  <div className="relative group/logo">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-2xl">
                      <Zap className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                      EduConnect
                    </h2>
                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                  </div>
                </div>

                <div className="relative group/icon mb-6 lg:mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-3xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300 shadow-xl">
                    <Building2 className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 lg:mb-6">
                  Bonjour, {user.firstName} !
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 font-medium">
                  Bienvenue sur votre portail de gestion
                </p>
              </div>

              <div className="relative group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8 sm:p-10 lg:p-12 xl:p-16">
                  <div className="space-y-6 lg:space-y-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                      Tableau de bord Directeur
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
                      Gérez vos établissements, suivez les inscriptions et analysez les données de vos étudiants
                    </p>
                    <Link 
                      to="/dashboard/director" 
                      className="group relative inline-flex items-center space-x-3 sm:space-x-4 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <span className="relative z-10">Accéder au Tableau de Bord</span>
                      <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Liste des Écoles - EduConnect</title>
        <meta name="description" content="Explorez la liste des écoles et universités disponibles sur EDUCONNECT et trouvez la formation qui vous correspond pour postuler en ligne." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Éléments décoratifs de fond - optimisés */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Ligne décorative animée */}
        <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 lg:py-12">
          {/* Header */}
          <div className="mb-8 lg:mb-12 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="relative group/logo">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                      <Zap className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white drop-shadow-sm" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                      Bonjour {user.firstName}!
                    </h1>
                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                      Trouvez votre future école parmi nos établissements partenaires
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schools Section */}
          <div className="relative group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 dark:from-emerald-400/15 dark:to-blue-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
              {loading ? (
                <div className="text-center py-16 lg:py-20">
                  <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-emerald-500 mx-auto mb-4 lg:mb-6"></div>
                  <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium">Chargement des écoles...</p>
                </div>
              ) : schools.length === 0 ? (
                <div className="text-center py-16 lg:py-20">
                  <div className="relative group/empty mb-6 lg:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center group-hover/empty:scale-105 transition-transform duration-300">
                      <School className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-md opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Aucune école disponible</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Les écoles apparaîtront ici dès qu'elles seront ajoutées</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-6 lg:mb-8">
                    <div className="relative group/icon">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Écoles disponibles
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                    {schools.map((school, index) => (
                      <div key={school.id} className="animate-fade-in-up" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                        <SchoolCard school={school} />
                      </div>
                    ))}
                  </div>
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
      `}</style>
    </>
  );
};

export default HomePrivate;

