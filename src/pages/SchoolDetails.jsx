import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, School, BookOpen, AlertCircle, Zap, User, Mail, Calendar, MapPin, GraduationCap } from 'lucide-react';

const SchoolDetails = () => {
    const { id: schoolId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [school, setSchool] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ firstName: '', lastName: '', birthDate: '', birthPlace: '', email: '', classLevel: '' });

    useEffect(() => {
        const fetchSchoolDetails = async () => {
            try {
                const schoolData = await schoolService.getSchoolById(schoolId);
                setSchool(schoolData);
            } catch (err) {
                console.error("École non trouvée:", err);
                navigate('/');
            }
        };

        if (user) {
            setFormData(prev => ({ ...prev, firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '' }));
        }
        
        fetchSchoolDetails();
    }, [user, schoolId, navigate]);
    
    const classes = ['Maternelle', 'CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale A1', 'Terminale A2', 'Terminale B', 'Terminale C', 'Terminale D', 'Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat', 'Formation professionnelle'];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async () => {
        if (Object.values(formData).some(v => v === '')) return setError('Tous les champs du formulaire sont requis.');
        if (!user || !user.uid) return setError("Vous devez être connecté pour vous inscrire.");
        setError('');
        setIsLoading(true);
        try {
            const registrationData = { schoolId, ...formData };
            await studentService.registerStudentToSchool(registrationData, user.uid);
            alert('Votre demande d\'inscription a bien été envoyée !');
            navigate('/dashboard/student');
        } catch (err) {
            setError("Une erreur est survenue. Vous êtes peut-être déjà inscrit à cette école.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if(!school) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
                {/* Éléments décoratifs de fond */}
                <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="flex justify-center items-center min-h-screen relative z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Chargement de l'école...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet><title>Inscription à {school?.name} - EduConnect</title>
            
            <meta name="description" content="EduConnect - Plateforme éducative intuitive pour étudiants et enseignants." />
            <meta name="keywords" content="EduConnect, éducation, plateforme scolaire, école, étudiants, enseignants" />
            <meta name="author" content="ELTON HOUNNOU" />
            <meta property="og:title" content="EduConnect - Plateforme éducative" />
            <meta property="og:description" content="Simplifiez la gestion scolaire avec EduConnect." />
            <meta property="og:url" content="https://educonnect-sandy.vercel.app/" />
            <meta property="og:type" content="website" />

            
            
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
                {/* Éléments décoratifs de fond - optimisés */}
                <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Ligne décorative animée */}
                <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 lg:py-12">
                    <div className="max-w-5xl mx-auto animate-fade-in-up">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
                                <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
                                    {/* Header */}
                                    <div className="flex items-center space-x-4 sm:space-x-6 mb-8 lg:mb-12">
                                        <div className="relative group/logo">
                                            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl">
                                                <Zap className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white drop-shadow-sm" />
                                            </div>
                                            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                                                Formulaire d'Inscription
                                            </h1>
                                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                                                {school.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-6 lg:mb-8 p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm rounded-2xl border border-red-200/50 dark:border-red-800/50 animate-fade-in-up">
                                            <div className="flex items-center space-x-3">
                                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
                                        {/* Prénom */}
                                        <div className="group">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Prénom</span>
                                            </label>
                                            <input 
                                                name="firstName" 
                                                value={formData.firstName} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                                placeholder="Votre prénom"
                                            />
                                        </div>

                                        {/* Nom */}
                                        <div className="group">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Nom</span>
                                            </label>
                                            <input 
                                                name="lastName" 
                                                value={formData.lastName} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                                placeholder="Votre nom"
                                            />
                                        </div>

                                        {/* Date de naissance */}
                                        <div className="group">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Date de naissance</span>
                                            </label>
                                            <input 
                                                name="birthDate" 
                                                type="date" 
                                                value={formData.birthDate} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                            />
                                        </div>

                                        {/* Lieu de naissance */}
                                        <div className="group">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-amber-600 dark:group-focus-within:text-amber-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Lieu de naissance</span>
                                            </label>
                                            <input 
                                                name="birthPlace" 
                                                value={formData.birthPlace} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                                placeholder="Votre lieu de naissance"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="group lg:col-span-2">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Email</span>
                                            </label>
                                            <input 
                                                name="email" 
                                                type="email" 
                                                value={formData.email} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                                placeholder="votre.email@example.com"
                                            />
                                        </div>

                                        {/* Classe / Formation */}
                                        <div className="group lg:col-span-2">
                                            <label className="flex items-center space-x-3 text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 group-focus-within:text-rose-600 dark:group-focus-within:text-rose-400 transition-colors duration-300">
                                                <div className="relative group/icon">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                                        <GraduationCap className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                                    </div>
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                                </div>
                                                <span>Classe / Formation</span>
                                            </label>
                                            <select 
                                                name="classLevel" 
                                                value={formData.classLevel} 
                                                onChange={handleInputChange} 
                                                className="w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 text-gray-900 dark:text-white font-medium border-gray-200/50 dark:border-gray-700/50"
                                            >
                                                <option value="">-- Sélectionnez une option --</option>
                                                {classes.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                                        <button 
                                            onClick={handleRegistration} 
                                            disabled={isLoading}
                                            className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-500 text-white font-bold text-lg sm:text-xl py-4 sm:py-6 rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:scale-100 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10 flex items-center justify-center space-x-3">
                                                {isLoading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                        <span>Envoi en cours...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="h-6 w-6" />
                                                        <span>Confirmer mon inscription</span>
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        </button>
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
                    a:focus, button:focus, input:focus, select:focus {
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
        </>
    );
};

export default SchoolDetails;

