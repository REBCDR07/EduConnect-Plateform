import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';
import SchoolCard from '../composants/SchoolCard';
import { Plus, Download, Users, CheckCircle, School, GraduationCap, UserCheck, Building, XCircle } from 'lucide-react';

const DashboardDirector = () => {
    const { user } = useAuth();
    const [mySchools, setMySchools] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    
    useEffect(() => {
        if (user?.id) {
            setMySchools(schoolService.getSchoolsByDirector(user.id));
            setRegistrations(studentService.getRegistrationsByDirector(user.id));
        }
    }, [user]);

    const totalRegistrations = useMemo(() => registrations.length, [registrations]);
    const pendingRegistrations = useMemo(() => registrations.filter(r => r.status === 'En attente').length, [registrations]);
    const acceptedRegistrations = useMemo(() => registrations.filter(r => r.status === 'Accepté').length, [registrations]);
    const rejectedRegistrations = useMemo(() => registrations.filter(r => r.status === 'Rejeté').length, [registrations]);

    const handleApproveRegistration = (registrationId) => {
        studentService.approveRegistration(registrationId);
        setRegistrations(studentService.getRegistrationsByDirector(user.id));
    };
    
    const handleRejectRegistration = (registrationId) => {
        if (window.confirm("Êtes-vous sûr de vouloir rejeter cette inscription ?")) {
            studentService.rejectRegistration(registrationId);
            setRegistrations(studentService.getRegistrationsByDirector(user.id));
        }
    };

    const handleDeleteSchool = (schoolId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette école ? Cette action est irréversible.")) {
            schoolService.deleteSchool(schoolId);
            setMySchools(schoolService.getSchoolsByDirector(user.id));
            setRegistrations(studentService.getRegistrationsByDirector(user.id));
        }
    };
    
    const handleExportJson = () => {
        const dataToExport = registrations.map(({ id, registrationDate, studentId, schoolId, ...rest }) => rest);
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = 'inscrits_educonnect.json';
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="fixed bottom-0 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Building className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white">Tableau de bord Directeur</h1>
                                    <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1">
                                        Bienvenue, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.firstName} {user?.lastName}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center lg:justify-end space-x-4 sm:space-x-8">
                                <div className="text-center"><div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">{mySchools.length}</div><div className="text-sm text-gray-600 dark:text-gray-300">École{mySchools.length > 1 ? 's' : ''}</div></div>
                                <div className="text-center"><div className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">{acceptedRegistrations}</div><div className="text-sm text-gray-600 dark:text-gray-300">Accepté{acceptedRegistrations > 1 ? 's' : ''}</div></div>
                                <div className="text-center"><div className="text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400">{pendingRegistrations}</div><div className="text-sm text-gray-600 dark:text-gray-300">En attente</div></div>
                                <div className="text-center"><div className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRegistrations}</div><div className="text-sm text-gray-600 dark:text-gray-300">Rejeté{rejectedRegistrations > 1 ? 's' : ''}</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-3"><div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center"><School className="h-5 w-5 lg:h-6 lg:w-6 text-white" /></div><h2 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">Mes Établissements</h2></div>
                            <Link to="/school/create" className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-xl shadow-sm transition-colors duration-200"><Plus size={18} /><span className="hidden sm:inline">Enregistrer une nouvelle école</span><span className="sm:hidden">Nouvelle école</span></Link>
                        </div>
                        {mySchools.length > 0 ? (<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">{mySchools.map((school) => (<div key={school.id}><SchoolCard school={school} onDelete={handleDeleteSchool} /></div>))}</div>) 
                        : (<div className="text-center py-16"><div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"><School className="h-10 w-10 text-gray-400" /></div><h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">Aucun établissement enregistré</h3><p className="mb-6 text-gray-500 dark:text-gray-400 max-w-md mx-auto">Vous n'avez pas encore enregistré d'école.</p></div>)}
                    </div>
                </div>
                <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-3"><div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"><Users className="h-5 w-5 lg:h-6 lg:w-6 text-white" /></div><div><h2 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">Liste des Inscrits</h2><p className="text-sm text-gray-600 dark:text-gray-300">Total: {totalRegistrations} inscription{totalRegistrations > 1 ? 's' : ''}</p></div></div>
                            {registrations.length > 0 && (<button onClick={handleExportJson} className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-xl shadow-sm transition-colors duration-200"><Download size={18} /><span className="hidden sm:inline">Exporter en JSON</span><span className="sm:hidden">Exporter</span></button>)}
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[800px]">
                                    <thead className="bg-gray-100 dark:bg-gray-700"><tr>{['Nom', 'Prénom', 'Email', 'Formation', 'Statut', 'Actions'].map((header) => (<th key={header} className="p-4 font-semibold text-gray-800 dark:text-gray-200 text-sm">{header}</th>))}</tr></thead>
                                    <tbody>
                                        {registrations.length > 0 ? registrations.map((reg) => (
                                            <tr key={reg.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{reg.lastName}</td>
                                                <td className="p-4 text-gray-700 dark:text-gray-300">{reg.firstName}</td>
                                                <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">{reg.email}</td>
                                                <td className="p-4"><div className="flex items-center space-x-2"><GraduationCap className="h-4 w-4 text-blue-500" /><span className="font-medium text-gray-700 dark:text-gray-300">{reg.classLevel}</span></div></td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full ${reg.status === 'Accepté' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : reg.status === 'Rejeté' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                                        {reg.status === 'Accepté' ? <CheckCircle size={12} /> : (reg.status === 'Rejeté' ? <XCircle size={12} /> : <UserCheck size={12} />)}
                                                        <span>{reg.status}</span>
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {reg.status === 'En attente' && (
                                                        <div className="flex items-center space-x-2">
                                                            <button onClick={() => handleApproveRegistration(reg.id)} className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200"><CheckCircle size={14} /><span>Accepter</span></button>
                                                            <button onClick={() => handleRejectRegistration(reg.id)} className="inline-flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200"><XCircle size={14} /><span>Rejeter</span></button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (<tr><td colSpan="6" className="p-12 text-center"><div className="flex flex-col items-center space-y-4"><div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"><Users className="h-8 w-8 text-gray-400" /></div><div><h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Aucune inscription</h3><p className="text-gray-500 dark:text-gray-400">Aucun étudiant n'est inscrit pour le moment.</p></div></div></td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDirector;