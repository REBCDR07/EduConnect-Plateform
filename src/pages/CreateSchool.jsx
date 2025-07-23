import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import schoolService from '../services/schoolService';
import { UploadCloud, Image } from 'lucide-react';

const CreateSchool = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null); 
    const [isDragging, setIsDragging] = useState(false);
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
    
    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleValidate = () => {
        if (!name || !description) {
            alert('Veuillez remplir le nom et la description.');
            return;
        }

        const schoolData = { name, description, photo, directorId: user.id };

        if (isEditing) {
            schoolService.updateSchool(id, schoolData);
        } else {
            schoolService.createSchool(schoolData);
        }

        navigate('/dashboard/director');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">{isEditing ? "Modifier l'école" : "Enregistrer une nouvelle école"}</h1>
            <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div><label className="font-semibold">Nom de l'école/université/centre</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border rounded dark:bg-gray-700"/></div>
                <div><label className="font-semibold">Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" className="w-full mt-1 p-2 border rounded dark:bg-gray-700"></textarea></div>
                <div>
                    <label className="font-semibold">Photo ou Logo</label>
                    <div 
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => fileInputRef.current.click()}
                        onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
                    >
                        <div className="space-y-1 text-center">
                            {photo ? 
                                <img src={photo} alt="Aperçu" className="mx-auto h-40 w-auto rounded-md object-contain"/> 
                              : 
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            }
                            <div className="flex text-sm text-gray-600 dark:text-gray-300">
                                <span className="relative font-medium text-blue-600 hover:text-blue-500">
                                    <span>Chargez un fichier</span>
                                    <input ref={fileInputRef} type="file" className="sr-only" accept="image/*" onChange={e => e.target.files[0] && handleFileChange(e.target.files[0])} />
                                </span>
                                <p className="pl-1">ou glissez-déposez</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end"><button onClick={handleValidate} className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition">{isEditing ? "Mettre à jour" : "Valider"}</button></div>
        </div>
    );
};

export default CreateSchool;