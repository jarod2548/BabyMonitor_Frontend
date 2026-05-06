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
    console.error("no user found")
    return <Navigate to="/login" />;
  }

  if (role && context.user?.role !== role) {
    console.log({
  contextUser: context?.user,
  requiredRole: role,
  match: context?.user?.role === role
});
    return <Navigate to="/login" />;
  }

  return children;
};