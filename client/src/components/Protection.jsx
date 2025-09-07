import { Navigate } from "react-router-dom";
import { useAuth } from "./wrappers/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {

    return <Navigate to="/auth/login" replace />;
  }

  return children;
}