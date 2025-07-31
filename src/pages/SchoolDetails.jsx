import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';
import useAuth from '../hooks/useAuth';
import { ArrowLeft, User, Calendar, MapPin, Mail, GraduationCap, School, Send, CheckCircle } from 'lucide-react';

const SchoolDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [school, setSchool] = useState(null);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '', 
        lastName: user?.lastName || '',
        birthDate: '', 
        birthPlace: '', 
        email: user?.email || '', 
        classLevel: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const classes = ['Maternelle', 'CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale A1', 'Terminale A2', 'Terminale B', 'Terminale C', 'Terminale D', 'Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat', 'Formation professionnelle'];
    
    useEffect(() => {
        const schoolData = schoolService.getSchoolById(id);
        if (schoolData) { 
            setSchool(schoolData); 
        } else { 
            navigate('/'); 
        }
    }, [id, navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error when user starts typing
    };

    const handleRegistration = async () => {
        if (Object.values(formData).some(v => v === '')) {
            setError('Tous les champs sont requis.');
            return;
        }
        
        try {
            setIsLoading(true);
            setError('');
            
            // Simulation d'un délai pour l'animation
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            studentService.registerStudentToSchool({ 
                ...formData, 
                studentId: user.id, 
                schoolId: id 
            });
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard/student');
            }, 2000);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!school) {
        return (
            <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
                {/* Éléments de fond animés pendant le chargement - plus subtils */}
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-green-500/8 to-blue-500/8 rounded-full blur-xl"></div>

                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto relative">
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-transparent border-b-green-500 border-l-blue-400 rounded-full animate-spin-reverse"></div>
                        <div className="absolute inset-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                    <p className="mt-6 text-2xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
                        Chargement...
                    </p>
                </div>

                <style jsx>{`
                    @keyframes spin-reverse {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                    .animate-spin-reverse {
                        animation: spin-reverse 2s linear infinite;
                    }
                `}</style>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center max-w-lg mx-auto px-4">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-bounce-in">
                        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-6">
                            Inscription réussie !
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Votre demande d'inscription à <strong className="text-gray-800 dark:text-white">{school.name}</strong> a été envoyée avec succès.
                        </p>
                        <div className="text-gray-500 dark:text-gray-400">
                            Redirection en cours vers votre tableau de bord...
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes bounce-in {
                        0% {
                            opacity: 0;
                            transform: scale(0.3);
                        }
                        50% {
                            opacity: 1;
                            transform: scale(1.05);
                        }
                        70% {
                            transform: scale(0.9);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-bounce-in {
                        animation: bounce-in 0.8s ease-out;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Éléments décoratifs de fond - plus subtils */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-green-500/6 to-blue-500/6 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Bouton retour */}
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300 group mb-8"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-lg">Retour à la liste des écoles</span>
                </button>

                {/* Container principal */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden animate-fade-in-up">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl opacity-10 blur-sm"></div>
                    
                    <div className="relative z-10">
                        {/* Image de l'école avec overlay */}
                        <div className="relative h-96 lg:h-[500px] overflow-hidden">
                            <img 
                                src={school.photo || '/src/assets/logo.png'} 
                                alt={`Logo de ${school.name}`} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight">
                                    {school.name}
                                </h1>
                                <div className="flex items-center space-x-3 text-white/90">
                                    <School className="h-6 w-6" />
                                    <span className="text-xl font-medium">Établissement d'enseignement</span>
                                </div>
                            </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="p-8 lg:p-12 xl:p-16 space-y-12">
                            {/* Description */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 lg:p-10 border border-blue-200/50 dark:border-blue-800/50">
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                                        <School className="h-8 w-8 mr-4 text-blue-600" />
                                        À propos de l'établissement
                                    </h2>
                                    <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {school.description}
                                    </p>
                                </div>
                            </div>

                            {/* Formulaire d'inscription */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                                <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 lg:p-10 xl:p-12 border border-gray-200/50 dark:border-gray-700/50">
                                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white mb-8 lg:mb-10 flex items-center">
                                        <GraduationCap className="h-10 w-10 mr-4 text-green-600" />
                                        Formulaire d'Inscription
                                    </h2>
                                    
                                    {error && (
                                        <div className="mb-8 animate-shake bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
                                            <p className="text-red-600 dark:text-red-400 font-medium text-lg">{error}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                                        {/* Prénom */}
                                        <div className="group">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <User className="h-5 w-5" />
                                                <span>Prénom</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name="firstName" 
                                                    value={formData.firstName} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"
                                                    placeholder="Votre prénom"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        {/* Nom */}
                                        <div className="group">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <User className="h-5 w-5" />
                                                <span>Nom</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name="lastName" 
                                                    value={formData.lastName} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"
                                                    placeholder="Votre nom"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        {/* Date de naissance */}
                                        <div className="group xl:col-span-1 lg:col-span-2">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <Calendar className="h-5 w-5" />
                                                <span>Date de naissance</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name="birthDate" 
                                                    type="date" 
                                                    value={formData.birthDate} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-lg"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        {/* Lieu de naissance */}
                                        <div className="group xl:col-span-1 lg:col-span-2">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <MapPin className="h-5 w-5" />
                                                <span>Lieu de naissance</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name="birthPlace" 
                                                    value={formData.birthPlace} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"
                                                    placeholder="Ville, Pays"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="group xl:col-span-2 lg:col-span-2">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <Mail className="h-5 w-5" />
                                                <span>Email</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"
                                                    placeholder="votre@email.com"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        {/* Niveau de classe */}
                                        <div className="group lg:col-span-2 xl:col-span-3">
                                            <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                <GraduationCap className="h-5 w-5" />
                                                <span>Niveau de classe</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="classLevel" 
                                                    value={formData.classLevel} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white appearance-none cursor-pointer text-lg"
                                                >
                                                    <option value="">-- Sélectionnez une classe --</option>
                                                    {classes.map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                    <svg className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bouton d'inscription */}
                                    <div className="mt-12 flex justify-center">
                                        <button 
                                            onClick={handleRegistration}
                                            disabled={isLoading}
                                            className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-semibold px-12 lg:px-16 py-4 lg:py-5 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed text-lg lg:text-xl min-w-[320px]"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                {isLoading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-6 w-6 mr-3" />
                                                        Envoyer mon inscription
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                                        </button>
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
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
                    20%, 40%, 60%, 80% { transform: translateX(3px); }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default SchoolDetails;