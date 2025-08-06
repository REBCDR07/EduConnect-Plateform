import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService'; 
import { Plus, Download, Users, CheckCircle, School, GraduationCap, UserCheck, Building, XCircle, Zap } from 'lucide-react';

// Lazy loading du composant SchoolCard
const SchoolCard = lazy(() => import('../composants/SchoolCard'));

// Composant de loading optimisé
const LoadingSpinner = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
  
  return (
    <div className="text-center py-8">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-emerald-500 mx-auto mb-4`} 
           role="status" 
           aria-label="Chargement en cours">
        <span className="sr-only">Chargement...</span>
      </div>
      {text && <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{text}</p>}
    </div>
  );
};

// Composant de statistique optimisé
const StatCard = ({ value, label, colorFrom, colorTo, delay }) => (
  <div className="relative group/stat animate-fade-in-up" 
       style={{ animationDelay: delay }}>
    <div className={`absolute -inset-1 bg-gradient-to-r from-${colorFrom}-500/20 to-${colorTo}-500/20 rounded-2xl blur-sm opacity-60 group-hover/stat:opacity-100 transition-opacity duration-300`}></div>
    <div className="relative text-center bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl p-4 border border-white/30 dark:border-gray-600/30 shadow-lg transition-all duration-300 group-hover/stat:scale-105">
      <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-${colorFrom}-600 to-${colorTo}-700 dark:from-${colorFrom}-400 dark:to-${colorTo}-500 bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
        {label}
      </div>
    </div>
  </div>
);

// Composant de bouton d'action optimisé
const ActionButton = ({ onClick, variant = 'approve', children, disabled = false }) => {
  const variants = {
    approve: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    reject: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    primary: 'from-emerald-500 via-emerald-600 to-blue-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-blue-700',
    secondary: 'from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900'
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`group relative overflow-hidden bg-gradient-to-r ${variants[variant]} text-white font-bold px-3 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2">
        {children}
      </span>
    </button>
  );
};

const DashboardDirector = () => {
  const { user } = useAuth();
  
  const [mySchools, setMySchools] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  // Optimisation avec useCallback pour éviter les re-renders
  const fetchData = useCallback(async () => {
    if (user?.uid) {
      try {
        setLoading(true);
        const [schoolsData, registrationsData] = await Promise.all([
          schoolService.getSchoolsByDirector(user.uid),
          studentService.getRegistrationsByDirector(user.uid)
        ]);
        setMySchools(schoolsData);
        setRegistrations(registrationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du directeur:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.uid]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions optimisées avec loading states
  const handleApproveRegistration = useCallback(async (registrationId) => {
    setActionLoading(prev => ({ ...prev, [registrationId]: 'approve' }));
    try {
      await studentService.approveRegistration(registrationId);
      await fetchData();
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
    } finally {
      setActionLoading(prev => ({ ...prev, [registrationId]: false }));
    }
  }, [fetchData]);
  
  const handleRejectRegistration = useCallback(async (registrationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir rejeter cette inscription ?")) {
      setActionLoading(prev => ({ ...prev, [registrationId]: 'reject' }));
      try {
        await studentService.rejectRegistration(registrationId);
        await fetchData();
      } catch (error) {
        console.error("Erreur lors du rejet:", error);
      } finally {
        setActionLoading(prev => ({ ...prev, [registrationId]: false }));
      }
    }
  }, [fetchData]);

  const handleDeleteSchool = useCallback(async (schoolId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette école ? Cette action est irréversible.")) {
      try {
        await schoolService.deleteSchool(schoolId);
        await fetchData();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  }, [fetchData]);
  
  // Statistiques optimisées avec useMemo
  const stats = useMemo(() => ({
    totalRegistrations: registrations.length,
    pendingRegistrations: registrations.filter(r => r.status === 'En attente').length,
    acceptedRegistrations: registrations.filter(r => r.status === 'Accepté').length,
    rejectedRegistrations: registrations.filter(r => r.status === 'Rejeté').length
  }), [registrations]);

  // Export optimisé
  const handleExportJson = useCallback(() => {
    const dataToExport = registrations.map(({ studentId, schoolId, createdAt, ...rest }) => rest);
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'inscrits_educonnect.json';
    link.click();
  }, [registrations]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Éléments décoratifs optimisés - réduits sur mobile */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/6 to-purple-500/6 dark:from-blue-400/4 dark:to-purple-400/4 rounded-full blur-3xl will-change-transform" 
           style={{ transform: 'translate3d(0,0,0)' }}></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/6 to-blue-500/6 dark:from-emerald-400/4 dark:to-blue-400/4 rounded-full blur-3xl will-change-transform" 
           style={{ transform: 'translate3d(0,0,0)', animationDelay: '1s' }}></div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 via-purple-500/30 via-emerald-500/30 to-transparent"></div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12" role="main">
        {/* Header optimisé */}
        <header className="mb-8 lg:mb-12">
          <div className="relative group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                    Tableau de bord Directeur
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    Bienvenue, <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                  </p>
                </div>
              </div>

              {/* Statistiques optimisées pour mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <StatCard 
                  value={mySchools.length} 
                  label={`École${mySchools.length !== 1 ? 's' : ''}`}
                  colorFrom="blue" 
                  colorTo="blue"
                  delay="0.1s"
                />
                <StatCard 
                  value={stats.acceptedRegistrations} 
                  label={`Accepté${stats.acceptedRegistrations !== 1 ? 's' : ''}`}
                  colorFrom="emerald" 
                  colorTo="emerald"
                  delay="0.2s"
                />
                <StatCard 
                  value={stats.pendingRegistrations} 
                  label="En attente"
                  colorFrom="amber" 
                  colorTo="amber"
                  delay="0.3s"
                />
                <StatCard 
                  value={stats.rejectedRegistrations} 
                  label={`Rejeté${stats.rejectedRegistrations !== 1 ? 's' : ''}`}
                  colorFrom="red" 
                  colorTo="red"
                  delay="0.4s"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Section des Établissements */}
        <section className="mb-8 lg:mb-12" aria-labelledby="schools-section">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center">
                  <School className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </div>
                <h2 id="schools-section" className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Mes Établissements
                </h2>
              </div>
              <Link 
                to="/school/create" 
                className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-blue-700 text-white font-bold px-4 sm:px-6 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                aria-label="Enregistrer une nouvelle école"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Plus className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Enregistrer une nouvelle école</span>
                  <span className="sm:hidden">Nouvelle école</span>
                </span>
              </Link>
            </div>
            
            {loading ? (
              <LoadingSpinner text="Chargement de vos établissements..." />
            ) : mySchools.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                <Suspense fallback={<LoadingSpinner size="sm" />}>
                  {mySchools.map((school) => (
                    <SchoolCard 
                      key={school.id} 
                      school={school} 
                      onDelete={() => handleDeleteSchool(school.id)} 
                    />
                  ))}
                </Suspense>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-4">
                  <School className="h-8 w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">Aucun établissement enregistré</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Vous n'avez pas encore enregistré d'école.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section Liste des Inscrits */}
        <section aria-labelledby="registrations-section">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="registrations-section" className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Liste des Inscrits
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Total : {stats.totalRegistrations} inscription{stats.totalRegistrations !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              {registrations.length > 0 && (
                <ActionButton onClick={handleExportJson} variant="secondary">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Exporter en JSON</span>
                  <span className="sm:hidden">Exporter</span>
                </ActionButton>
              )}
            </div>
            
            {/* Table responsive optimisée */}
            <div className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]" role="table">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <tr role="row">
                      {['Nom', 'Email', 'Formation', 'Statut', 'Actions'].map((header) => (
                        <th key={header} 
                            className="p-3 sm:p-4 font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                            role="columnheader">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="p-8">
                          <LoadingSpinner size="sm" text="Chargement des inscriptions..." />
                        </td>
                      </tr>
                    ) : registrations.length > 0 ? registrations.map((reg) => (
                      <tr key={reg.id} 
                          className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                          role="row">
                        <td className="p-3 sm:p-4 font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                          {reg.lastName} {reg.firstName}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          <span className="break-all">{reg.email}</span>
                        </td>
                        <td className="p-3 sm:p-4">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4 text-blue-500 flex-shrink-0" aria-hidden="true" />
                            <span className="font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">{reg.classLevel}</span>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                            reg.status === 'Accepté' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                              : reg.status === 'Rejeté' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {reg.status === 'Accepté' ? 
                              <CheckCircle size={12} aria-hidden="true" /> : 
                              reg.status === 'Rejeté' ? 
                              <XCircle size={12} aria-hidden="true" /> : 
                              <UserCheck size={12} aria-hidden="true" />
                            }
                            <span>{reg.status}</span>
                          </span>
                        </td>
                        <td className="p-3 sm:p-4">
                          {reg.status === 'En attente' && (
                            <div className="flex items-center space-x-2">
                              <ActionButton 
                                onClick={() => handleApproveRegistration(reg.id)} 
                                variant="approve"
                                disabled={actionLoading[reg.id] === 'approve'}
                              >
                                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                                <span className="text-xs sm:text-sm">
                                  {actionLoading[reg.id] === 'approve' ? '...' : 'Accepter'}
                                </span>
                              </ActionButton>
                              <ActionButton 
                                onClick={() => handleRejectRegistration(reg.id)} 
                                variant="reject"
                                disabled={actionLoading[reg.id] === 'reject'}
                              >
                                <XCircle className="h-4 w-4" aria-hidden="true" />
                                <span className="text-xs sm:text-sm">
                                  {actionLoading[reg.id] === 'reject' ? '...' : 'Rejeter'}
                                </span>
                              </ActionButton>
                            </div>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="p-12 text-center">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">Aucune inscription</h3>
                          <p className="text-gray-500 dark:text-gray-400">Les inscriptions apparaîtront ici</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardDirector;