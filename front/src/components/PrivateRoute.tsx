// PrivateRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    // Если не авторизован, перенаправляем на страницу логина
    return <Navigate to="/login" />;
  }

  if (userRole !== "admin") {
    // Если пользователь не администратор, перенаправляем на главную
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;