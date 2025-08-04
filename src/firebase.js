// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Pour le stockage des images, on l'importera quand on en aura besoin.
// import { getStorage } from "firebase/storage";

// VOTRE configuration Firebase personnelle et complète
const firebaseConfig = {
  apiKey: "AIzaSyDXq5KlY8vpgbGmlGYEypNxfaz_CiVsV5Q",
  authDomain: "educonnect-cbb5d.firebaseapp.com",
  projectId: "educonnect-cbb5d",
  storageBucket: "educonnect-cbb5d.appspot.com", // J'ai corrigé le .firebasestorage.app en .appspot.com qui est le format attendu
  messagingSenderId: "328014003562",
  appId: "1:328014003562:web:c13cdcbc6ee686c7d0b913"
};

// Initialiser l'application Firebase
const app = initializeApp(firebaseConfig);

// Créer et exporter les instances des services Firebase
// C'est ce que nos autres fichiers importeront pour interagir avec Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);

export default app;