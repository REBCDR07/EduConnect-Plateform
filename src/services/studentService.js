import { v4 as uuidv4 } from 'uuid';
import schoolService from './schoolService';

const REGISTRATIONS_KEY = 'educonnect_registrations';

// Fonction de récupéreration des inscriptions depuis la simulation de stockage via le localStorage
const getStoredRegistrations = () => {
    const registrations = localStorage.getItem(REGISTRATIONS_KEY);
    return registrations ? JSON.parse(registrations) : [];
};



const studentService = {

    /**
     * Inscription d'un étudiant à une école spécifique.
     * @param {object} registrationData - Les données d'inscription.
     * @returns {object} La nouvelle inscription.
     */
    registerStudentToSchool: (registrationData) => {
        const registrations = getStoredRegistrations();
        
        // Vérification non authentifié (parce que, pas encore de backend) si l'étudiant est déjà inscrit à cette école via les infos stocké dans le localstorage
        const existingRegistration = registrations.find(
            r => r.studentId === registrationData.studentId && r.schoolId === registrationData.schoolId
        );

        if (existingRegistration) {
            throw new Error('Vous êtes déjà inscrit à cette école.');
        }

        const newRegistration = {
            id: uuidv4(),
            ...registrationData,
            status: 'En attente', // statut d'acceptation de l'inscription par le possesseur de l'école "En attente" (valeur de satut par défaut, parce que, pas encore de backend)
            registrationDate: new Date().toISOString()
        };

        registrations.push(newRegistration);
        localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
        return newRegistration;
    },

    /**
     * Récupération de toutes les inscriptions pour un étudiant donné.
     * @param {string} studentId - L'ID de l'étudiant.
     * @returns {Array} Une liste des inscriptions de l'étudiant.
     */
    getRegistrationsByStudent: (studentId) => {
        const registrations = getStoredRegistrations();
        return registrations.filter(r => r.studentId === studentId);
    },

    /**
     * Récupération de toutes les inscriptions pour une école donnée.
     * @param {string} schoolId - L'ID de l'école.
     * @returns {Array} Une liste des inscriptions de l'école.
     */
    getRegistrationsBySchool: (schoolId) => {
        const registrations = getStoredRegistrations();
        return registrations.filter(r => r.schoolId === schoolId);
    },

    /**
     * Récupération de toutes les inscriptions des écoles appartenant à un directeur.
     * @param {string} directorId - L'ID du directeur.
     * @returns {Array} Une liste des inscriptions pour les écoles de ce directeur.
     */
    getRegistrationsByDirector: (directorId) => {
        // 1. Obtention de toutes les écoles gérées par ce directeur dans son dashboard
        const directorSchools = schoolService.getSchoolsByDirector(directorId);
        const directorSchoolIds = directorSchools.map(s => s.id);
        
        // 2. Filtration de toutes les inscriptions pour ne garder que celles qui correspondent à ces écoles
        const allRegistrations = getStoredRegistrations();
        return allRegistrations.filter(r => directorSchoolIds.includes(r.schoolId));
    },

    /**
     * Approuver l'inscription d'un étudiant par l'option statut.
     * @param {string} registrationId - L'ID de l'inscription à approuver.
     * @returns {object|null} L'inscription mise à jour ou null si non trouvée.
     */
    approveRegistration: (registrationId) => {
        let registrations = getStoredRegistrations();
        const registrationIndex = registrations.findIndex(r => r.id === registrationId);

        if (registrationIndex > -1) {
            registrations[registrationIndex].status = 'Accepté'; // Changement du statut
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
            return registrations[registrationIndex];
        }

        return null; // Retourner null si l'inscription n'est pas trouvée
    }
};

export default studentService;