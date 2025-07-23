import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardStudent from '../pages/DashboardStudent';
import DashboardDirector from '../pages/DashboardDirector';
import CreateSchool from '../pages/CreateSchool';
import SchoolDetails from '../pages/SchoolDetails';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../composants/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
    // Route pour la page d'accueil public et accessible à tous
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* routes protégées menant à des contenus privés uniquement pour les utilisateurs inscrits et connectés */}
      <Route path="/dashboard/student" element={<ProtectedRoute role="Étudiant"><DashboardStudent /></ProtectedRoute>} />
      <Route path="/dashboard/director" element={<ProtectedRoute role="Directeur"><DashboardDirector /></ProtectedRoute>} />
      <Route path="/school/create" element={<ProtectedRoute role="Directeur"><CreateSchool /></ProtectedRoute>} />
      <Route path="/school/edit/:id" element={<ProtectedRoute role="Directeur"><CreateSchool /></ProtectedRoute>} />
      <Route path="/school/:id" element={<ProtectedRoute role="Étudiant"><SchoolDetails /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;