import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../authorization/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: string;
};

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const context = useAuth();


  if (!context?.user) {
    return <Navigate to="/login" />;
  }

  if (role && context.user?.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};