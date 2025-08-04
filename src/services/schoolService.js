// client/src/services/schoolService.js
import { collection, addDoc, getDocs, getDoc, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

// Référence à la collection 'schools' dans Firestore
const schoolsCollectionRef = collection(db, 'schools');

/**
 * Crée un nouveau document 'school' dans Firestore.
 * @param {object} schoolData - Données de l'école (name, description, photo).
 * @param {string} directorId - L'UID du directeur.
 */
const createSchool = async (schoolData, directorId) => {
  return await addDoc(schoolsCollectionRef, { ...schoolData, directorId: directorId, createdAt: new Date() });
};

/**
 * Récupère tous les documents depuis la collection 'schools'.
 */
const getSchools = async () => {
  const data = await getDocs(schoolsCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

/**
 * Récupère les détails d'une seule école par son ID.
 * @param {string} schoolId - L'ID du document de l'école.
 */
const getSchoolById = async (schoolId) => {
    const schoolDocRef = doc(db, 'schools', schoolId);
    const docSnap = await getDoc(schoolDocRef);
    if(docSnap.exists()){
        return { ...docSnap.data(), id: docSnap.id };
    } else {
        throw new Error("École non trouvée");
    }
}

/**
 * Récupère uniquement les écoles créées par un directeur spécifique.
 * @param {string} directorId - L'UID du directeur.
 */
const getSchoolsByDirector = async (directorId) => {
  const q = query(schoolsCollectionRef, where("directorId", "==", directorId));
  const data = await getDocs(q);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

/**
 * Supprime une école de Firestore.
 * @param {string} schoolId - L'ID du document de l'école.
 */
const deleteSchool = async (schoolId) => {
  const schoolDoc = doc(db, 'schools', schoolId);
  await deleteDoc(schoolDoc);
};

/**
 * Met à jour les informations d'une école.
 * @param {string} schoolId - L'ID du document de l'école.
 * @param {object} schoolData - Les nouveaux champs à mettre à jour.
 */
const updateSchool = async (schoolId, schoolData) => {
  const schoolDoc = doc(db, 'schools', schoolId);
  await updateDoc(schoolDoc, schoolData); 
};


const schoolService = {
  createSchool,
  getSchools,
  getSchoolById,
  getSchoolsByDirector,
  deleteSchool,
  updateSchool,
};

export default schoolService;