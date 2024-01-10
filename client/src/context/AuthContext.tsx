// src/context/AuthContext.tsx
import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

import { User } from "../../types.ts";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const server = import.meta.env.VITE_BACK_END_SERVER;

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{
    user: User | null;
  }>({ user: null });

  const login = (user: User) => setAuth({ user });

  const logout = async () => {
    try {
      await axios.delete(`${server}/logout`);
    } catch (error) {
      console.error("Error logging out:, ", error);
    }
    setAuth({ user: null });
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return auth.user !== null;
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
