import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  loggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check localStorage on load so login persists
  useEffect(() => {
    const saved = localStorage.getItem("hra_admin_logged_in");
    if (saved === "true") setLoggedIn(true);
  }, []);

  const login = (password: string) => {
    const correct = password === import.meta.env.VITE_ADMIN_PASSWORD;
    if (correct) {
      setLoggedIn(true);
      localStorage.setItem("hra_admin_logged_in", "true");
    }
    return correct;
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("hra_admin_logged_in");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
