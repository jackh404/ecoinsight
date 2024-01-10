import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  if (!auth || !auth.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
