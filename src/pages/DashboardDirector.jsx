import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';
import SchoolCard from '../composants/SchoolCard';
import { Plus, Download, Users, CheckCircle } from 'lucide-react';

const DashboardDirector = () => {
    const { user } = useAuth();
    const [mySchools, setMySchools] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    
    useEffect(() => {
        if (user) {
            setMySchools(schoolService.getSchoolsByDirector(user.id));
            setRegistrations(studentService.getRegistrationsByDirector(user.id));
        }
    }, [user]);

    const totalRegistrations = useMemo(() => registrations.length, [registrations]);

    // FONCTION POUR GÉRER L'APPROBATION 
    const handleApproveRegistration = (registrationId) => {
        studentService.approveRegistration(registrationId);

        setRegistrations(studentService.getRegistrationsByDirector(user.id));
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
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Tableau de bord Directeur</h1>



            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Mes Établissements</h2>
                <Link to="/school/create" className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
                    <Plus size={20} />
                    <span>Enregistrer une nouvelle école</span>
                </Link>
            </div>
            
            {mySchools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mySchools.map(school => (
                        <SchoolCard key={school.id} school={school} onDelete={handleDeleteSchool} />
                    ))}
                </div>
            ) : (
                <p>Vous n'avez pas encore enregistré d'école.</p>
            )}

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold">Liste des Inscrits</h2>
                    {registrations.length > 0 && (
                        <button onClick={handleExportJson} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition">
                            <Download size={20} />
                            <span>Exporter en JSON</span>
                        </button>
                    )}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50 dark:bg-gray-700">
                           <tr>
                               {['Nom', 'Prénom', 'Email', 'Formation', 'Statut', 'Actions'].map(h => <th key={h} className="p-4 font-semibold">{h}</th>)}
                           </tr>
                       </thead>
                       <tbody>
                            {registrations.length > 0 ? registrations.map(reg => (
                                <tr key={reg.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">{reg.lastName}</td>
                                    <td className="p-4">{reg.firstName}</td>
                                    <td className="p-4">{reg.email}</td>
                                    <td className="p-4">{reg.classLevel}</td>
                                    
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            reg.status === 'Accepté' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                                   : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    
                                    <td className="p-4">
                                        {reg.status === 'En attente' && (
                                            <button
                                              onClick={() => handleApproveRegistration(reg.id)}
                                              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded"
                                            >
                                                <CheckCircle size={16} />
                                                <span>Accepter</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center">Aucun étudiant inscrit pour le moment.</td>
                                </tr>
                            )}
                       </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardDirector;