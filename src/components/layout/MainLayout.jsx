
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const MainLayout = () => {
  const { isLoading } = useAuth();
  const isMobile = useIsMobile();

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className={`flex-1 ${!isMobile && "p-6"} overflow-auto`}>
        <div className={`mx-auto ${!isMobile ? "container" : "px-4 py-6"}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
