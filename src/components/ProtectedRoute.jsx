import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function ProtectedRoute() {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthorized(!!data?.user);
    };

    checkSession();
  }, []);

  if (authorized === null) return null; // pode exibir loader se quiser

  return authorized
    ? <Outlet />
    : <Navigate to="/cliente-login" replace state={{ from: location }} />;
}
