import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';
import useAuth from '../hooks/useAuth';

const SchoolDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [school, setSchool] = useState(null);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '', lastName: user?.lastName || '',
        birthDate: '', birthPlace: '', email: user?.email || '', classLevel: ''
    });
    const [error, setError] = useState('');

    const classes = ['Maternelle', 'CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale A1', 'Terminale A2', 'Terminale B', 'Terminale C', 'Terminale D', 'Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat', 'Formation professionnelle'];
    
    useEffect(() => {
        const schoolData = schoolService.getSchoolById(id);
        if (schoolData) { setSchool(schoolData); } 
        else { navigate('/'); }
    }, [id, navigate]);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegistration = () => {
        if (Object.values(formData).some(v => v === '')) return setError('Tous les champs sont requis.');
        try {
            studentService.registerStudentToSchool({ ...formData, studentId: user.id, schoolId: id });
            alert('Inscription réussie !');
            navigate('/dashboard/student');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!school) return <div className="p-10 text-center">Chargement...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <img src={school.photo || '/src/assets/logo.png'} alt={`Logo de ${school.name}`} className="w-full h-64 object-cover rounded-t-lg mb-6"/>
            <h1 className="text-4xl font-extrabold mb-2">{school.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{school.description}</p>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Formulaire d'Inscription</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="p-3 border rounded"/>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="p-3 border rounded"/>
                <input name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} className="p-3 border rounded"/>
                <input name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} className="p-3 border rounded"/>
                <input name="email" value={formData.email} onChange={handleInputChange} className="p-3 border rounded md:col-span-2"/>
                <select name="classLevel" value={formData.classLevel} onChange={handleInputChange} className="p-3 border rounded md:col-span-2">
                    <option value="">-- Sélectionnez une classe --</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="mt-8"><button onClick={handleRegistration} className="py-3 px-8 bg-blue-600 text-white rounded">Envoyer mon inscription</button></div>
        </div>
    );
};
export default SchoolDetails;