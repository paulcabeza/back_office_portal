import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { LoadingSpinner } from "./loading-spinner";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
