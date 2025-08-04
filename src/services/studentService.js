// client/src/services/studentService.js
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const registrationsCollectionRef = collection(db, 'registrations');

/**
 * Crée une inscription après avoir vérifié les limites.
 * @param {object} registrationData - Les données de l'inscription.
 * @param {string} studentId - L'UID de l'étudiant.
 */
const registerStudentToSchool = async (registrationData, studentId) => {
  // 1. Vérifier le nombre total d'inscriptions de l'étudiant
  const totalRegistrationsQuery = query(registrationsCollectionRef, where("studentId", "==", studentId));
  const totalRegistrationsSnapshot = await getDocs(totalRegistrationsQuery);
  if (totalRegistrationsSnapshot.size >= 3) {
      throw new Error("Limite atteinte : Vous ne pouvez pas vous inscrire à plus de 3 écoles au total.");
  }
  
  // 2. Vérifier si l'étudiant n'est pas DÉJÀ inscrit à CETTE école
  const existingRegistrationQuery = query(
      registrationsCollectionRef,
      where("studentId", "==", studentId),
      where("schoolId", "==", registrationData.schoolId)
  );
  const existingRegistrationSnapshot = await getDocs(existingRegistrationQuery);
  if (!existingRegistrationSnapshot.empty) {
      throw new Error("Vous êtes déjà inscrit à cette école.");
  }
  
  // 3. Si les vérifications passent, on crée l'inscription
  return await addDoc(registrationsCollectionRef, { studentId, ...registrationData, status: 'En attente', createdAt: new Date() });
};

/**
 * Récupère les inscriptions pour les écoles d'un directeur spécifique.
 * @param {string} directorId - L'UID du directeur.
 */
const getRegistrationsByDirector = async (directorId) => {
  const schoolsRef = collection(db, 'schools');
  const qSchools = query(schoolsRef, where("directorId", "==", directorId));
  const schoolsSnapshot = await getDocs(qSchools);
  const directorSchoolIds = schoolsSnapshot.docs.map(doc => doc.id);
  
  if (directorSchoolIds.length === 0) return [];
  
  const qRegistrations = query(registrationsCollectionRef, where("schoolId", "in", directorSchoolIds));
  const registrationsSnapshot = await getDocs(qRegistrations);
  return registrationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

/**
 * Récupère les inscriptions d'un étudiant spécifique.
 * @param {string} studentId - L'UID de l'étudiant.
 */
const getRegistrationsByStudent = async (studentId) => {
  const q = query(registrationsCollectionRef, where("studentId", "==", studentId));
  const data = await getDocs(q);
  
  // Pour chaque inscription, on va chercher les détails de l'école associée pour les afficher
  const registrations = await Promise.all(data.docs.map(async (d) => {
      const regData = d.data();
      let schoolData = { name: "École Supprimée" }; // Nom par défaut si l'école a été supprimée
      try {
        const schoolDoc = await getDoc(doc(db, "schools", regData.schoolId));
        if (schoolDoc.exists()) {
            schoolData = schoolDoc.data();
        }
      } catch (e) {
          console.error(`Impossible de récupérer l'école ${regData.schoolId}:`, e);
      }
      return { ...regData, id: d.id, school: schoolData };
  }));
  return registrations;
};

/**
 * Met à jour le statut d'une inscription ('Accepté' ou 'Rejeté').
 * @param {string} registrationId - L'ID du document de l'inscription.
 * @param {string} status - Le nouveau statut.
 */
const updateRegistrationStatus = async (registrationId, status) => {
  const registrationDoc = doc(db, 'registrations', registrationId);
  await updateDoc(registrationDoc, { status: status });
};

const studentService = {
  registerStudentToSchool,
  getRegistrationsByDirector,
  getRegistrationsByStudent,
  approveRegistration: (id) => updateRegistrationStatus(id, 'Accepté'),
  rejectRegistration: (id) => updateRegistrationStatus(id, 'Rejeté'),
};

export default studentService;