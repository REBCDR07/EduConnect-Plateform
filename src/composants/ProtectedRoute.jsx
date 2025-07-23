import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si un rôle est requis et que l'utilisateur n'a pas ce rôle
  if (role && user.role !== role) {
    // Redirection vers le tableau de bord approprié ou une page d'accès refusé
    const dashboardPath =
      user.role === "Directeur" ? "/dashboard/director" : "/dashboard/student";
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
