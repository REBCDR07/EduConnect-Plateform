import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import studentService from '../services/studentService';
import { School, CheckCircle, Clock, XCircle, Zap, GraduationCap } from 'lucide-react';

const DashboardStudent = () => {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentRegistrations = async () => {
            if (user && user.uid) {
                try {
                    setLoading(true);
                    const data = await studentService.getRegistrationsByStudent(user.uid);
                    setRegistrations(data);
                } catch (error) {
                    console.error("Erreur de récupération des inscriptions de l'étudiant:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudentRegistrations();
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">


            {/* Éléments d de fond */}
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            
            <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 lg:py-12">

                {/* Header */}
                <div className="mb-8 lg:mb-12 animate-fade-in-up">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="flex items-center space-x-4 sm:space-x-6">
                                <div className="relative group/logo">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                                        <Zap className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-white drop-shadow-sm" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                                        Mon Tableau de Bord Étudiant
                                    </h1>
                                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium">
                                        Bienvenue, <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{user?.firstName}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registrations */}
                
                <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-6 lg:mb-8">
                        <div className="relative group/icon">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Mes Inscriptions
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12 text-center py-16 lg:py-20">
                                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500 mx-auto mb-4 lg:mb-6"></div>
                                <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium">Chargement de vos inscriptions...</p>
                            </div>
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 xl:p-12 text-center py-16 lg:py-20">
                                <div className="relative group/empty mb-6 lg:mb-8">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center group-hover/empty:scale-105 transition-transform duration-300">
                                        <School className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-md opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Aucune inscription</h3>
                                <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-md mx-auto">
                                    Vous n'êtes inscrit à aucune école pour le moment.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 lg:space-y-6">
                            {registrations.map((reg, index) => (
                                <div key={reg.id} className="relative group animate-fade-in-up" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 lg:p-10 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                                                    <div className="relative group/school-icon">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center group-hover/school-icon:scale-105 transition-transform duration-300">
                                                            <School className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/school-icon:opacity-100 transition-opacity duration-500"></div>
                                                    </div>
                                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                                                        {reg.school?.name}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center space-x-2 sm:space-x-3">
                                                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                                                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium">
                                                        Classe / Formation : <span className="font-bold text-gray-800 dark:text-white">{reg.classLevel}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center sm:justify-end">
                                                <div className={`relative flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm sm:text-base font-bold shadow-lg transition-all duration-300 hover:scale-105 ${
                                                    reg.status === 'Accepté' 
                                                        ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-emerald-900/30 dark:to-emerald-800/30 dark:text-emerald-400 shadow-emerald-500/25' 
                                                        : reg.status === 'Rejeté' 
                                                        ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-400 shadow-red-500/25' 
                                                        : 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 dark:from-amber-900/30 dark:to-amber-800/30 dark:text-amber-400 shadow-amber-500/25'
                                                }`}>
                                                    {reg.status === 'Accepté' ? (
                                                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    ) : reg.status === 'Rejeté' ? (
                                                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    ) : (
                                                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    )}
                                                    <span>{reg.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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

export default DashboardStudent;

