import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser()); // Charge directement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Juste pour s'assurer que l'état initial est bien défini.
    // L'essentiel du travail se fait dans le state initial de useState.
    setUser(authService.getCurrentUser());
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
      const loggedInUser = authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw error; // Propage l'erreur au composant
    }
  };
  
  const register = (userData) => {
    try {
      return authService.register(userData);
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = { user, login, logout, register, isAuthenticated: !!user, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};