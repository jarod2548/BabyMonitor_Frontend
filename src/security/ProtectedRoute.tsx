import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../authorization/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const context = useAuth();


  if (!context?.user) {
    console.error("no user found")
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(context.user.role)) {
    console.log({
  contextUser: context?.user,
  requiredRole: roles,
  match: roles.includes(context.user.role)
});
    return <Navigate to="/login" />;
  }

  return children;
};