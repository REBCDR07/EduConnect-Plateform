import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import { UploadCloud, Image, School, FileText, Check, X, ArrowLeft, Zap, AlertTriangle, Menu } from 'lucide-react';

const CreateSchool = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const fileInputRef = useRef(null);

    // Optimisation: Détection mobile avec debounce
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        let timeoutId;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 150);
        };
        
        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        const fetchSchoolForEditing = async () => {
            if (!id || !user) return;
            try {
                const schoolData = await schoolService.getSchoolById(id);
                if (schoolData.directorId !== user.uid) {
                    alert("Accès non autorisé.");
                    navigate('/dashboard/director');
                    return;
                }
                setName(schoolData.name);
                setDescription(schoolData.description);
                setPhotoPreview(schoolData.photo);
            } catch (error) {
                console.error("Erreur:", error);
                navigate('/dashboard/director');
            }
        };
        if (isEditing) {
            fetchSchoolForEditing();
        }
    }, [id, isEditing, user, navigate]);
    
    // Optimisation: useCallback pour éviter les re-renders
    const processFile = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            // Vérification de la taille du fichier (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("Le fichier est trop volumineux. Taille maximum: 5MB");
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert("Veuillez sélectionner un fichier image valide.");
        }
    }, []);
    
    const handleFileChange = useCallback((e) => {
        processFile(e.target.files[0]);
    }, [processFile]);

    const handleDrop = useCallback((e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
        }
    }, [processFile]);
    
    const handleDragEnter = useCallback((e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(true); 
    }, []);
    
    const handleDragLeave = useCallback((e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(false); 
    }, []);
    
    const handleDragOver = useCallback((e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
    }, []);

    // Optimisation: useMemo pour la validation
    const validateForm = useMemo(() => {
        return () => {
            const newErrors = {};
            if (!name.trim()) newErrors.name = 'Le nom est requis';
            if (!description.trim()) newErrors.description = 'La description est requise';
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };
    }, [name, description]);
    
    const removePhoto = useCallback((e) => {
        e.stopPropagation();
        setPhotoPreview(null);
    }, []);

    const handleValidate = useCallback(async () => {
        if (!validateForm()) return;
        if (!user || user.role !== 'Directeur') return alert("Action non autorisée.");
        
        setIsLoading(true);
        const schoolData = { name, description, photo: photoPreview };

        try {
            if (isEditing) {
                await schoolService.updateSchool(id, schoolData);
            } else {
                await schoolService.createSchool(schoolData, user.uid);
            }
            navigate('/dashboard/director');
        } catch (error) {
            console.error('Erreur Firebase:', error);
            setErrors({ general: "Une erreur est survenue pendant la sauvegarde." });
        } finally {
            setIsLoading(false);
        }
    }, [validateForm, user, name, description, photoPreview, isEditing, id, navigate]);

    // Composant Tips optimisé
    const TipsSection = useMemo(() => (
        <div className={`${isMobile ? (showTips ? 'block' : 'hidden') : 'block'} animate-[fade-in-up_0.8s_ease-out] delay-200`}>
            <div className="relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/15 to-blue-500/15 dark:from-teal-600/10 dark:to-blue-600/10 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-xl flex items-center justify-center">
                                <School className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">Conseils</h3>
                        </div>
                        {isMobile && (
                            <button 
                                onClick={() => setShowTips(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        <li className="flex items-start space-x-2">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                            <span>Choisissez un nom unique et évocateur pour votre école.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                            <span>Rédigez une description claire et engageante.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                            <span>Utilisez une image de qualité pour refléter l'identité de votre établissement.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ), [isMobile, showTips]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Background Elements - Optimisés pour mobile */}
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-96 lg:h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 dark:from-indigo-600/8 dark:to-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-80 lg:h-80 bg-gradient-to-tl from-teal-400/10 to-blue-400/10 dark:from-teal-600/8 dark:to-blue-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 lg:py-12">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <button 
                        onClick={() => navigate('/dashboard/director')}
                        className="group relative inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-all duration-300 animate-[fade-in-up_0.8s_ease-out]"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm sm:text-base">Retour</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-indigo-500/10 group-hover:from-indigo-500/10 group-hover:to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Mobile Tips Toggle */}
                    {isMobile && (
                        <button 
                            onClick={() => setShowTips(true)}
                            className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-colors duration-300"
                            title="Afficher les conseils"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Mobile: Stack layout, Desktop: Grid layout */}
                    <div className={isMobile ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-12 gap-8"}>

                        {/* Left Column */}
                        <div className={isMobile ? "" : "lg:col-span-4 space-y-8"}>
                            {/* Title Section */}
                            <div className="animate-[fade-in-up_0.8s_ease-out]">
                                <div className="relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
                                        <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                                            <div className="relative group/logo">
                                                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover/logo:scale-105 transition-transform duration-300">
                                                    <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                                                    {isEditing ? "Modifier l'école" : "Nouvelle école"}
                                                </h1>
                                                <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1"></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg font-medium">
                                            {isEditing ? "Mettez à jour les détails de votre établissement" : "Créez un nouvel établissement sur EduConnect"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Section */}
                            {TipsSection}
                        </div>

                        {/* Right Column - Form */}
                        <div className={isMobile ? "" : "lg:col-span-8"}>
                            <div className="animate-[fade-in-up_0.8s_ease-out] delay-400">
                                <div className="relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/30 dark:border-gray-700/30 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

                                        {/* School Name */}
                                        <div className="group">
                                            <label className="flex items-center space-x-2 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300">
                                                <School className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                                <span>Nom de l'école</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={e => { setName(e.target.value); if (errors.name) setErrors({...errors, name: ''}); }}
                                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl bg-gray-50 dark:bg-gray-700 border ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400`}
                                                    placeholder="Nom de votre établissement"
                                                    required
                                                />
                                                {errors.name && (
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                                    </div>
                                                )}
                                            </div>
                                            {errors.name && (
                                                <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                                    <span>{errors.name}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="group">
                                            <label className="flex items-center space-x-2 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors duration-300">
                                                <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                                <span>Description</span>
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    value={description}
                                                    onChange={e => { setDescription(e.target.value); if (errors.description) setErrors({...errors, description: ''}); }}
                                                    rows={isMobile ? "4" : "5"}
                                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl bg-gray-50 dark:bg-gray-700 border ${errors.description ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 resize-none`}
                                                    placeholder="Décrivez votre école en quelques mots..."
                                                    required
                                                />
                                                {errors.description && (
                                                    <div className="absolute top-2 sm:top-3 right-0 pr-3 flex items-center pointer-events-none">
                                                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                                    </div>
                                                )}
                                            </div>
                                            {errors.description && (
                                                <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                                                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                                    <span>{errors.description}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Photo Upload */}
                                        <div className="group">
                                            <label className="flex items-center space-x-2 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400 transition-colors duration-300">
                                                <Image className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                                <span>Photo de l'école</span>
                                            </label>
                                            <div className="relative">
                                                <div
                                                    className={`flex flex-col items-center justify-center w-full ${isMobile ? 'h-40' : 'h-48 sm:h-56'} border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'}`}
                                                    onClick={() => fileInputRef.current.click()}
                                                    onDragEnter={handleDragEnter}
                                                    onDragLeave={handleDragLeave}
                                                    onDragOver={handleDragOver}
                                                    onDrop={handleDrop}
                                                >
                                                    {photoPreview ? (
                                                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                                                            <img src={photoPreview} alt="Aperçu de la photo" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={removePhoto}
                                                                className="absolute top-2 right-2 p-1 sm:p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                                                                title="Supprimer la photo"
                                                            >
                                                                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center space-y-1 sm:space-y-2 px-4">
                                                            <UploadCloud className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500" />
                                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                                                                {isMobile ? "Touchez pour sélectionner" : "Glissez-déposez une image ici, ou"} <span className="text-indigo-600 dark:text-indigo-400 font-semibold">cliquez pour sélectionner</span>
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">(JPG, PNG, GIF - Max 5MB)</p>
                                                        </div>
                                                    )}
                                                    <input ref={fileInputRef} type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                                                </div>
                                            </div>
                                        </div>

                                        {/* General Error */}
                                        {errors.general && (
                                            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-700 animate-[fade-in-up_0.8s_ease-out]">
                                                <div className="flex items-center space-x-2">
                                                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                                    <p className="text-sm sm:text-base text-red-600 dark:text-red-400 font-medium">{errors.general}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className={`flex ${isMobile ? 'flex-col-reverse space-y-reverse space-y-3' : 'justify-end space-x-4'} pt-4 border-t border-gray-200/50 dark:border-gray-700/50`}>
                                            <button 
                                                type="button"
                                                onClick={() => navigate('/dashboard/director')}
                                                className={`relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-gray-300 text-sm sm:text-base ${isMobile ? 'w-full' : ''}`}
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleValidate}
                                                disabled={isLoading}
                                                className={`relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-indigo-400 disabled:to-purple-400 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed text-sm sm:text-base ${isMobile ? 'w-full' : ''}`}
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-white"></div>
                                                        <span>Sauvegarde...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        <span>{isEditing ? "Mettre à jour" : "Valider"}</span>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Tips Overlay */}
                {isMobile && showTips && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
                        <div className="w-full max-w-md">
                            {TipsSection}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateSchool;