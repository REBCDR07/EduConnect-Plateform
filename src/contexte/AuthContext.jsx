import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // `onAuthStateChanged` est le "gardien" de notre application.
    // Il nous dit à tout moment qui est connecté.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🕵️ [AuthContext] État de connexion Firebase a changé. User:", firebaseUser?.email || "Personne");
      if (firebaseUser) {
        // Un utilisateur est détecté par Firebase
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          // On a trouvé ses infos dans Firestore, on met à jour l'état de notre app
          const fullUserData = { uid: firebaseUser.uid, email: firebaseUser.email, ...userDoc.data() };
          console.log("✅ [AuthContext] Utilisateur complet mis à jour dans le contexte :", fullUserData);
          setUser(fullUserData);
        }
      } else {
        // Personne n'est connecté
        console.log("🔴 [AuthContext] Aucun utilisateur connecté.");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Ne pas oublier de "nettoyer" l'écouteur
  }, []);

  // Les fonctions de notre contexte appellent simplement le service
  // qui fait maintenant tout le travail lourd.
  const login = (email, password) => authService.login(email, password);
  const register = (userData) => authService.register(userData);
  const logout = () => authService.logout();

  const value = { user, login, logout, register, isAuthenticated: !!user, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};