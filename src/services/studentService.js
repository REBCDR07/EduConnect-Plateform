import { v4 as uuidv4 } from 'uuid';

const REGISTRATIONS_KEY = 'educonnect_registrations';
const SCHOOLS_KEY = 'educonnect_schools';

// Fonction pour récupérer les inscriptions depuis la simulation via localStorage
const getStoredRegistrations = () => {
    const registrations = localStorage.getItem(REGISTRATIONS_KEY);
    return registrations ? JSON.parse(registrations) : [];
};

const studentService = {

    /**
     * Inscrit un étudiant à une école spécifique, en incluant tous les détails de la candidature.
     * @param {object} registrationData - Les données complètes de l'inscription.
     * @returns {object} La nouvelle inscription.
     */
    registerStudentToSchool: (registrationData) => {
        const registrations = getStoredRegistrations();
        
        // Vérification pour éviter les doublons
        const existingRegistration = registrations.find(
            r => r.studentId === registrationData.studentId && r.schoolId === registrationData.schoolId
        );

        if (existingRegistration) {
            throw new Error('Vous êtes déjà inscrit à cette école.');
        }

        // Sauvegarde toutes les données fournies par le formulaire
        const newRegistration = {
            id: uuidv4(),
            ...registrationData,
            status: 'En attente', // Statut par défaut à la création
            registrationDate: new Date().toISOString()
        };

        registrations.push(newRegistration);
        localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
        return newRegistration;
    },

    /**
     * Récupère toutes les inscriptions pour un étudiant donné.
     * @param {string} studentId - L'ID de l'étudiant.
     * @returns {Array} Une liste des inscriptions de l'étudiant.
     */
    getRegistrationsByStudent: (studentId) => {
        const registrations = getStoredRegistrations();
        return registrations.filter(r => r.studentId === studentId);
    },

    /**
     * Récupère toutes les inscriptions des écoles appartenant à un directeur.
     * @param {string} directorId - L'ID du directeur.
     * @returns {Array} Une liste des inscriptions pour les écoles de ce directeur.
     */
    getRegistrationsByDirector: (directorId) => {
        const schools = JSON.parse(localStorage.getItem(SCHOOLS_KEY) || '[]');
        const directorSchoolIds = schools
            .filter(s => s.directorId === directorId)
            .map(s => s.id);
        
        const allRegistrations = getStoredRegistrations();
        return allRegistrations.filter(r => directorSchoolIds.includes(r.schoolId));
    },

    /**
     * Approuve l'inscription d'un étudiant.
     * @param {string} registrationId - L'ID de l'inscription à approuver.
     */
    approveRegistration: (registrationId) => {
        let registrations = getStoredRegistrations();
        const registrationIndex = registrations.findIndex(r => r.id === registrationId);

        if (registrationIndex > -1) {
            registrations[registrationIndex].status = 'Accepté';
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
        }
    },

    /**
     * Rejette l'inscription d'un étudiant.
     * @param {string} registrationId - L'ID de l'inscription à rejeter.
     */
    rejectRegistration: (registrationId) => {
        let registrations = getStoredRegistrations();
        const registrationIndex = registrations.findIndex(r => r.id === registrationId);

        if (registrationIndex > -1) {
            registrations[registrationIndex].status = 'Rejeté';
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
        }
    }
};

export default studentService;