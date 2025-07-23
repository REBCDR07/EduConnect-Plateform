import { v4 as uuidv4 } from 'uuid';

const SCHOOLS_KEY = 'educonnect_schools';

const getStoredSchools = () => {
   const schools = localStorage.getItem(SCHOOLS_KEY);
   if (!schools) {
        // Initialiser avec quelques données si vide
       const initialSchools = [
          { id: uuidv4(), directorId: 'director-id-placeholder', name: 'Université Prestigia', description: 'Formation d\'excellence pour les leaders de demain.', photo: '/src/assets/logo.jpg' },
          { id: uuidv4(), directorId: 'director-id-placeholder', name: 'Institut InnovaTech', description: 'Au cœur de la technologie et de l\'innovation.', photo: '/src/assets/logo.jpg' }
      ];
    localStorage.setItem(SCHOOLS_KEY, JSON.stringify(initialSchools));
      return initialSchools;
   }
   return JSON.parse(schools);
};

const schoolService = {
    getSchools: () => {
        return getStoredSchools();
    },

    getSchoolById: (id) => {
        const schools = getStoredSchools();
        return schools.find(s => s.id === id);
    },

    getSchoolsByDirector: (directorId) => {
        const schools = getStoredSchools();
        return schools.filter(s => s.directorId === directorId);
    },

    createSchool: (schoolData) => {
        const schools = getStoredSchools();
        const newSchool = {
            id: uuidv4(),
            ...schoolData
        };
        schools.push(newSchool);
        localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools));
        return newSchool;
    },

    updateSchool: (id, updatedData) => {
        let schools = getStoredSchools();
        const schoolIndex = schools.findIndex(s => s.id === id);
        if (schoolIndex > -1) {
            schools[schoolIndex] = { ...schools[schoolIndex], ...updatedData };
            localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools));
            return schools[schoolIndex];
        }
        return null;
    },

    deleteSchool: (id) => {
        let schools = getStoredSchools();
        schools = schools.filter(s => s.id !== id);
        localStorage.setItem(SCHOOLS_KEY, JSON.stringify(schools));
    }
};

export default schoolService;