import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import studentService from '../services/studentService';
import schoolService from '../services/schoolService';
import { School, CheckCircle, Clock } from 'lucide-react';

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

    if (loading) return <p>Chargement de vos inscriptions...</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Tableau de bord Étudiant</h1>
            <h2 className="text-2xl font-semibold">Mes Inscriptions</h2>

            {registrations.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Vous n'êtes inscrit à aucune école pour le moment.</p>
                    <Link to="/" className="text-blue-500 hover:underline font-semibold">
                        Voir les écoles disponibles
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {registrations.map(reg => reg.school && (
                       <div key={reg.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
                           <div>
                               <div className="flex items-center space-x-3 mb-2">
                                   <School className="text-blue-500"/>
                                   <h3 className="text-xl font-bold">{reg.school.name}</h3>
                               </div>
                               <p className="text-gray-600 dark:text-gray-300">Classe / Formation : <span className="font-semibold">{reg.classLevel}</span></p>
                               <p className="text-gray-500 dark:text-gray-400 text-sm">Inscrit le: {new Date(reg.registrationDate).toLocaleDateString()}</p>
                           </div>
                           
                        
                           <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                                reg.status === 'Accepté' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                         : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                           }`}>
                               {reg.status === 'Accepté' ? <CheckCircle size={16} /> : <Clock size={16} />}
                               <span>{reg.status}</span>
                           </div>
                       </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardStudent;