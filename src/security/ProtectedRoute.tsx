import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: string;
};

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};