import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService'; 
import SchoolCard from '../composants/SchoolCard';
import { Plus, Download, Users, CheckCircle, School, GraduationCap, UserCheck, Building, XCircle, Zap } from 'lucide-react';

const DashboardDirector = () => {
    // --- logique de connexion à firebase ---
    const { user } = useAuth();
    
    const [mySchools, setMySchools] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (user && user.uid) {
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
    };
    
    useEffect(() => {
        fetchData();
    }, [user]);

    // fonctions de connexion aux services Firebase et rafraîchissent des données
    const handleApproveRegistration = async (registrationId) => {
        await studentService.approveRegistration(registrationId);
        fetchData();
    };
    
    const handleRejectRegistration = async (registrationId) => {
        if (window.confirm("Êtes-vous sûr de vouloir rejeter cette inscription ?")) {
            await studentService.rejectRegistration(registrationId);
            fetchData();
        }
    };

    const handleDeleteSchool = async (schoolId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette école ? Cette action est irréversible.")) {
            await schoolService.deleteSchool(schoolId);
            fetchData();
        }
    };
    
    // `useMemo` 
    const totalRegistrations = useMemo(() => registrations.length, [registrations]);
    const pendingRegistrations = useMemo(() => registrations.filter(r => r.status === 'En attente').length, [registrations]);
    const acceptedRegistrations = useMemo(() => registrations.filter(r => r.status === 'Accepté').length, [registrations]);
    const rejectedRegistrations = useMemo(() => registrations.filter(r => r.status === 'Rejeté').length, [registrations]);



    // fonction d'export 
    const handleExportJson = () => {
        const dataToExport = registrations.map(({ studentId, schoolId, createdAt, ...rest }) => rest);
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = 'inscrits_educonnect.json';
        link.click();
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">


            {/* décors de fond  */}


            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {/* ligne décorative */}

            <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 lg:py-12">
                {/* Header */}
                <div className="mb-8 lg:mb-12 animate-fade-in-up">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
                                <div className="flex items-center space-x-4 sm:space-x-6">
                                    <div className="relative group/logo">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                                            <Zap className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-white drop-shadow-sm" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                                            Tableau de bord Directeur
                                        </h1>
                                        <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium">
                                            Bienvenue, <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{user?.firstName} {user?.lastName}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                    <div className="relative group/stat">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-2xl blur-sm opacity-60 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative text-center bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/30 dark:border-gray-600/30 shadow-lg transition-all duration-300 group-hover/stat:scale-105">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">{mySchools.length}</div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">École{mySchools.length !== 1 ? 's' : ''}</div>
                                        </div>
                                    </div>
                                    <div className="relative group/stat">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 rounded-2xl blur-sm opacity-60 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative text-center bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/30 dark:border-gray-600/30 shadow-lg transition-all duration-300 group-hover/stat:scale-105">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">{acceptedRegistrations}</div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">Accepté{acceptedRegistrations !== 1 ? 's' : ''}</div>
                                        </div>
                                    </div>
                                    <div className="relative group/stat">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-500/20 rounded-2xl blur-sm opacity-60 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative text-center bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/30 dark:border-gray-600/30 shadow-lg transition-all duration-300 group-hover/stat:scale-105">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent">{pendingRegistrations}</div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">En attente</div>
                                        </div>
                                    </div>
                                    <div className="relative group/stat">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-500/20 rounded-2xl blur-sm opacity-60 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative text-center bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/30 dark:border-gray-600/30 shadow-lg transition-all duration-300 group-hover/stat:scale-105">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">{rejectedRegistrations}</div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">Rejeté{rejectedRegistrations !== 1 ? 's' : ''}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section des Établissements */}

                <div className="mb-8 lg:mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 dark:from-emerald-400/15 dark:to-blue-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="relative group/icon">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                            <School className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                                        Mes Établissements
                                    </h2>
                                </div>
                                <Link 
                                    to="/school/create" 
                                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-blue-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                >
                                    <span className="relative z-10 flex items-center justify-center space-x-2">
                                        <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                                        <span className="hidden sm:inline text-base sm:text-lg">Enregistrer une nouvelle école</span>
                                        <span className="sm:hidden text-base">Nouvelle école</span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                </Link>
                            </div>
                            
                            {loading ? (
                                <div className="text-center py-16 lg:py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Chargement de vos établissements...</p>
                                </div>
                            ) : mySchools.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                                    {mySchools.map((school) => (
                                        <div key={school.id} className="animate-fade-in-up" style={{animationDelay: `${0.1 * (mySchools.indexOf(school) + 1)}s`}}>
                                            <SchoolCard school={school} onDelete={() => handleDeleteSchool(school.id)} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 lg:py-20">
                                    <div className="relative group/empty mb-6 lg:mb-8">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center group-hover/empty:scale-105 transition-transform duration-300">
                                            <School className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-md opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Aucun établissement enregistré</h3>
                                    <p className="mb-6 lg:mb-8 text-gray-500 dark:text-gray-400 max-w-md mx-auto text-base sm:text-lg font-medium">
                                        Vous n'avez pas encore enregistré d'école.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section Liste des Inscrits */}

                <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/15 dark:to-pink-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="relative group/icon">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                            <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                            Liste des Inscrits
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                                            Total : {totalRegistrations} inscription{totalRegistrations !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                {registrations.length > 0 && (
                                    <button 
                                        onClick={handleExportJson} 
                                        className="group relative overflow-hidden bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl shadow-gray-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                    >
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                                            <span className="hidden sm:inline text-base sm:text-lg">Exporter en JSON</span>
                                            <span className="sm:hidden text-base">Exporter</span>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    </button>
                                )}
                            </div>
                            
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-500/20 rounded-2xl blur-sm opacity-60"></div>
                                <div className="relative bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                                <tr>
                                                    {['Nom', 'Email', 'Formation', 'Statut', 'Actions'].map((header) => (
                                                        <th key={header} className="p-4 sm:p-6 font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="5" className="p-12 text-center">
                                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                                            <p className="text-gray-500 dark:text-gray-400 font-medium">Chargement des inscriptions...</p>
                                                        </td>
                                                    </tr>
                                                ) : registrations.length > 0 ? registrations.map((reg) => (
                                                    <tr key={reg.id} className="border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                        <td className="p-4 sm:p-6 font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                                            {reg.lastName} {reg.firstName}
                                                        </td>
                                                        <td className="p-4 sm:p-6 text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                                                            {reg.email}
                                                        </td>
                                                        <td className="p-4 sm:p-6">
                                                            <div className="flex items-center space-x-2">
                                                                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                                                                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">{reg.classLevel}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 sm:p-6">
                                                            <span className={`inline-flex items-center space-x-1 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-full ${
                                                                reg.status === 'Accepté' 
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                                                    : reg.status === 'Rejeté' 
                                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                                                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                            }`}>
                                                                {reg.status === 'Accepté' ? <CheckCircle size={12}/> : reg.status === 'Rejeté' ? <XCircle size={12}/> : <UserCheck size={12}/>}
                                                                <span>{reg.status}</span>
                                                            </span>
                                                        </td>
                                                        <td className="p-4 sm:p-6">
                                                            {reg.status === 'En attente' && (
                                                                <div className="flex items-center space-x-2">
                                                                    <button 
                                                                        onClick={() => handleApproveRegistration(reg.id)} 
                                                                        className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-3 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                                                                    >
                                                                        <span className="relative z-10 flex items-center space-x-1">
                                                                            <CheckCircle className="h-4 w-4" />
                                                                            <span className="text-xs sm:text-sm">Accepter</span>
                                                                        </span>
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleRejectRegistration(reg.id)} 
                                                                        className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-3 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                                                                    >
                                                                        <span className="relative z-10 flex items-center space-x-1">
                                                                            <XCircle className="h-4 w-4" />
                                                                            <span className="text-xs sm:text-sm">Rejeter</span>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="p-12 text-center">
                                                            <div className="relative group/empty mb-6">
                                                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center group-hover/empty:scale-105 transition-transform duration-300">
                                                                    <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500" />
                                                                </div>
                                                                <div className="absolute -inset-1 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-md opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
                                                            </div>
                                                            <h3 className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">Aucune inscription</h3>
                                                            <p className="text-gray-500 dark:text-gray-400 font-medium">Les inscriptions apparaîtront ici</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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
        </div>
    );
};

export default DashboardDirector;

