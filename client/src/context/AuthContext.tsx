// src/context/AuthContext.tsx
import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

import { User } from "../../types.ts";

interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isLoading: boolean;
  checkSession: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<{
    user: User | null;
  }>({ user: null });

  const login = async (user: User) => {
    return new Promise<void>(resolve => {
      setAuth({ user: user });
      resolve();
    });
  };

  const checkSession = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`api/check_session`);
      await login(response.data.user);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    return response;
  };

  const logout = async () => {
    try {
      await axios.delete(`api/logout`);
    } catch (error) {
      console.error("Error logging out:, ", error);
    }
    setAuth({ user: null });
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return auth.user !== null && auth.user !== undefined;
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        isAuthenticated,
        checkSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
