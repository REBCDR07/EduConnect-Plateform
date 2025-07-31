import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import studentService from '../services/studentService';
import schoolService from '../services/schoolService';
import { School, CheckCircle, Clock, GraduationCap, Calendar, User, XCircle } from 'lucide-react';

const DashboardStudent = () => {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const studentRegistrations = studentService.getRegistrationsByStudent(user.id);
            const allSchools = schoolService.getSchools();
            const detailedRegistrations = studentRegistrations.map(reg => ({
                ...reg,
                school: allSchools.find(s => s.id === reg.schoolId)
            }));
            setRegistrations(detailedRegistrations);
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Chargement de vos inscriptions...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="fixed bottom-0 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                        <div className="flex items-center space-x-4"><div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"><User className="h-7 w-7 lg:h-8 lg:w-8 text-white" /></div><div><h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white">Tableau de bord Étudiant</h1><p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1">Bienvenue, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.firstName} {user?.lastName}</span></p></div></div>
                    </div>
                </div>
                <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                        <div className="flex items-center space-x-3 mb-8"><div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center"><GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" /></div><h2 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">Mes Inscriptions</h2></div>
                        {registrations.length === 0 ? (<div className="text-center py-16"><div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"><School className="h-10 w-10 text-gray-400" /></div><h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Aucune inscription</h3><p className="mb-8 text-gray-500 dark:text-gray-400 max-w-md mx-auto">Vous n'êtes inscrit à aucune école pour le moment.</p><Link to="/" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm"><School className="h-5 w-5" /><span>Voir les écoles</span></Link></div>) 
                        : (<div className="space-y-6">{registrations.map((reg) => reg.school && (<div key={reg.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start space-x-4 mb-4"><div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0"><School className="h-7 w-7 lg:h-8 lg:w-8 text-white" /></div><div className="flex-1 min-w-0"><h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">{reg.school.name}</h3><div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300"><div className="flex items-center space-x-2"><GraduationCap className="h-4 w-4 flex-shrink-0" /><span>Formation : <span className="font-semibold text-blue-600 dark:text-blue-400">{reg.classLevel}</span></span></div><div className="flex items-center space-x-2"><Calendar className="h-4 w-4 flex-shrink-0" /><span>Inscrit le: {new Date(reg.registrationDate).toLocaleDateString('fr-FR')}</span></div></div></div></div>
                                </div>
                                <div className="flex justify-center lg:justify-end">
                                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold ${reg.status === 'Accepté' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : reg.status === 'Rejeté' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                        {reg.status === 'Accepté' ? <CheckCircle size={16} /> : (reg.status === 'Rejeté' ? <XCircle size={16} /> : <Clock size={16} />)}
                                        <span>{reg.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className={`h-full transition-all duration-700 ${reg.status === 'Accepté' ? 'bg-gradient-to-r from-green-500 to-green-600 w-full' : reg.status === 'Rejeté' ? 'bg-gradient-to-r from-red-500 to-red-600 w-full' : 'bg-gradient-to-r from-orange-500 to-orange-600 w-1/2'}`}></div></div>
                                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Demande soumise</span>
                                    <span className={reg.status === 'Accepté' ? 'text-green-600 dark:text-green-400 font-semibold' : reg.status === 'Rejeté' ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>{reg.status === 'En attente' ? 'En traitement' : reg.status}</span>
                                </div>
                            </div>
                        </div>))}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardStudent;