import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import { UploadCloud, Image, School, FileText, Check, X, ArrowLeft } from 'lucide-react';

const CreateSchool = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null); 
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            const school = schoolService.getSchoolById(id);
            if (school) {
                setName(school.name);
                setDescription(school.description);
                setPhoto(school.photo);
            }
        }
    }, [id, isEditing]);

    const handleFileChange = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file); 
        }
    };
    
    const handleDragEnter = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(true); 
    };
    
    const handleDragLeave = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(false); 
    };
    
    const handleDragOver = (e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Le nom est requis';
        if (!description.trim()) newErrors.description = 'La description est requise';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleValidate = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        
        // Simulation d'un délai pour l'animation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const schoolData = { name, description, photo, directorId: user.id };

        try {
            if (isEditing) {
                schoolService.updateSchool(id, schoolData);
            } else {
                schoolService.createSchool(schoolData);
            }
            navigate('/dashboard/director');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removePhoto = () => {
        setPhoto(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Éléments décoratifs de fond subtils */}
            <div className="fixed top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite 2s' }}></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-12">
                {/* Bouton retour */}
                <button 
                    onClick={() => navigate('/dashboard/director')}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200 group mb-6 lg:mb-8"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Retour au tableau de bord</span>
                </button>

                {/* Layout principal responsive */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    
                    {/* Section gauche - En-tête et informations */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="animate-fade-in-up">
                            <div className="relative">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                                    {isEditing ? "Modifier l'école" : "Nouvelle école"}
                                </h1>
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"></div>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {isEditing ? "Modifiez les informations de votre établissement" : "Créez votre établissement sur EduConnect"}
                                </p>
                            </div>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="hidden lg:block bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Conseils</h3>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Choisissez un nom clair et reconnaissable</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Rédigez une description détaillée de vos programmes</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Ajoutez un logo ou une photo représentative</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section droite - Formulaire */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                                
                                {/* Champ Nom */}
                                <div className="group">
                                    <label className="flex items-center space-x-3 text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                            <School className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span>Nom de l'école/université/centre</span>
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={e => {
                                                setName(e.target.value);
                                                if (errors.name) setErrors({...errors, name: ''});
                                            }}
                                            className={`w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-slate-400 text-slate-900 dark:text-white ${errors.name ? 'border-red-400' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="Ex: Université de Sciences et Technologies"
                                        />
                                        {errors.name && (
                                            <p className="mt-3 text-red-500 text-sm flex items-center">
                                                <X className="h-4 w-4 mr-2" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Champ Description */}
                                <div className="group">
                                    <label className="flex items-center space-x-3 text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span>Description</span>
                                    </label>
                                    <div className="relative">
                                        <textarea 
                                            value={description} 
                                            onChange={e => {
                                                setDescription(e.target.value);
                                                if (errors.description) setErrors({...errors, description: ''});
                                            }}
                                            rows="6"
                                            className={`w-full px-6 py-4 text-lg border-2 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-slate-400 text-slate-900 dark:text-white resize-none ${errors.description ? 'border-red-400' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="Décrivez votre établissement, ses spécialités, ses atouts..."
                                        />
                                        {errors.description && (
                                            <p className="mt-3 text-red-500 text-sm flex items-center">
                                                <X className="h-4 w-4 mr-2" />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Zone de téléchargement d'image */}
                                <div className="group">
                                    <label className="flex items-center space-x-3 text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                            <Image className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <span>Photo ou Logo</span>
                                        <span className="text-sm font-normal text-slate-500">(optionnel)</span>
                                    </label>
                                    
                                    <div className="relative">
                                        <div 
                                            className={`group relative flex justify-center px-8 py-12 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${
                                                isDragging 
                                                    ? 'border-blue-400 bg-blue-50/70 dark:bg-blue-900/20 scale-[1.02]' 
                                                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50/70 dark:hover:bg-slate-700/50'
                                            }`}
                                            onClick={() => fileInputRef.current.click()}
                                            onDragEnter={handleDragEnter} 
                                            onDragLeave={handleDragLeave} 
                                            onDragOver={handleDragOver} 
                                            onDrop={handleDrop}
                                        >
                                            <div className="space-y-6 text-center">
                                                {photo ? (
                                                    <div className="relative group">
                                                        <img 
                                                            src={photo} 
                                                            alt="Aperçu" 
                                                            className="mx-auto h-56 w-auto rounded-2xl object-contain shadow-lg" 
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removePhoto();
                                                            }}
                                                            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2.5 transform transition-all duration-200 hover:scale-110 shadow-lg"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                        <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                                                            Cliquez pour changer l'image
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                            <UploadCloud className="h-10 w-10 text-white" />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="text-xl font-medium text-slate-700 dark:text-slate-300">
                                                                <span className="text-blue-600 hover:text-blue-500 font-semibold">
                                                                    Chargez un fichier
                                                                </span>
                                                                <span className="text-slate-500"> ou glissez-déposez</span>
                                                            </div>
                                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                PNG, JPG, GIF jusqu'à 10MB
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            
                                            <input 
                                                ref={fileInputRef} 
                                                type="file" 
                                                className="sr-only" 
                                                accept="image/*" 
                                                onChange={e => e.target.files[0] && handleFileChange(e.target.files[0])} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => navigate('/dashboard/director')}
                                        className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        Annuler
                                    </button>
                                    
                                    <button 
                                        onClick={handleValidate}
                                        disabled={isLoading}
                                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    {isEditing ? 'Mise à jour...' : 'Création...'}
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-5 w-5 mr-2" />
                                                    {isEditing ? "Mettre à jour" : "Valider"}
                                                </>
                                            )}
                                        </span>
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
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.1;
                    }
                }
            `}</style>
        </div>
    );
};

export default CreateSchool;