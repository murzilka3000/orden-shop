import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string; // Роль пользователя
  login: (token: string, role: string) => void; // Храним роль при логине
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>(""); // Роль пользователя

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    console.log("Token from localStorage:", token);
    console.log("Role from localStorage:", role);

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role); // Устанавливаем роль
    }
  }, []);

  const login = (token: string, role: string) => {
    console.log("Logging in with token:", token);
    console.log("Logging in with role:", role);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // Сохраняем роль
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};