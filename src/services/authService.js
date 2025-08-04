// client/src/services/authService.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, db } from '../firebase'; // On importe nos services Firebase

// ----- VERSION INSCRIPTION -----
// Crée l'utilisateur dans "Authentication" ET ses infos dans "Firestore"
const registerUser = async (userData) => {
  const { email, password, firstName, lastName, role } = userData;
  
  console.log("🕵️ [authService] Début de l'inscription pour:", email);
  // 1. Crée l'utilisateur dans Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log("✅ Utilisateur créé dans Firebase Auth (UID):", user.uid);

  // 2. Stocke les infos supplémentaires (rôle, nom) dans Firestore
  await setDoc(doc(db, "users", user.uid), {
    firstName,
    lastName,
    role
  });
  console.log("✅ Informations utilisateur sauvegardées dans Firestore.");

  return user;
};

// ----- VERSION CONNEXION -----
// Vérifie les identifiants et récupère les données complètes de l'utilisateur
const loginUser = async (email, password) => {
  console.log("🕵️ [authService] Tentative de connexion pour:", email);
  // 1. Firebase vérifie l'email et le mot de passe
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("✅ Authentification Firebase réussie pour:", userCredential.user.email);
  
  // 2. On récupère le rôle et le nom depuis Firestore
  const userDocRef = doc(db, "users", userCredential.user.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    console.log("✅ Rôle et nom récupérés depuis Firestore:", userDoc.data());
    // On fusionne l'objet de Firebase Auth avec nos données de Firestore
    const fullUserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userDoc.data()
    };
    return fullUserData;
  } else {
    // Cas peu probable où l'utilisateur existe dans Auth mais pas dans Firestore
    console.error("❌ Utilisateur authentifié mais aucune donnée trouvée dans Firestore !");
    return userCredential.user;
  }
};

// ----- VERSION DÉCONNEXION -----
const logoutUser = () => signOut(auth);

// On exporte un objet simple avec les fonctions renommées pour plus de clarté
const authService = {
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
};

export default authService;