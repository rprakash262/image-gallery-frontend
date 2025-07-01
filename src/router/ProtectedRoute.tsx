import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();

  // if (isLoading) return null;

  if (!user?._id) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};
