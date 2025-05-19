
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoading, isAdmin, profile } = useAuth();
  const location = useLocation();

  // Se ainda estiver carregando, não fazemos nada
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse-subtle flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse"></div>
          <div className="mt-4 text-lg font-semibold">Carregando...</div>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota requer admin e o usuário não é admin, redireciona para dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
