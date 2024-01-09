// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  user: object | null;
  login: (token: string, user: object) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{
    token: string | null;
    user: object | null;
  }>({ token: null, user: null });

  // Set the user's auth token
  const login = (token: string, user: object) => setAuth({ token, user });

  // Clear the user's auth token
  const logout = () => setAuth({ token: null, user: null });

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
