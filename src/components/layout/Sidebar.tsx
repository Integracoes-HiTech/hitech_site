import {
  LayoutDashboard,
  FileText,
  FileSignature,
  CreditCard,
  LifeBuoy,
  Bell,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

export const SIDEBAR_WIDTH = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ email: "", role: "" });

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout realizado", {
      description: "Você saiu da área do cliente.",
    });
    navigate("/cliente-login", { replace: true });
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("email, role")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Arquivos", icon: FileText, path: "/files" },
    { label: "Contratos", icon: FileSignature, path: "/contracts" },
    { label: "Pagamentos", icon: CreditCard, path: "/payments" },
    { label: "Suporte", icon: LifeBuoy, path: "/support" },
    { label: "Notificações", icon: Bell, path: "/notifications" },
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div
      className={`${
        collapsed && !isMobile ? "w-[80px]" : "w-[240px]"
      } bg-gradient-to-b from-[#0036A8] to-[#0074FF] text-white h-full flex flex-col transition-all duration-300`}
    >
      <div className="border-b">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h1 className="text-lg font-bold">Hi Tech</h1>}
          <button
            onClick={() =>
              isMobile ? setMobileMenuOpen(false) : setCollapsed(!collapsed)
            }
          >
            {isMobile ? <X className="text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>

        <div className="flex items-start gap-3 p-4">
          <div className="bg-white/20 p-2 rounded-full">
            <User className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <div className="text-sm font-semibold truncate">{profile.email || "Usuário"}</div>
              <div className="text-xs text-white/80 capitalize">{profile.role || "cliente"}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <ul className="space-y-1 px-2 py-4 overflow-y-auto flex-1">
          {menu.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition ${
                  location.pathname === item.path
                    ? "bg-white/20 font-medium"
                    : "hover:bg-white/10"
                } text-white`}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-white hover:text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2 text-white" />
            {!collapsed && "Sair"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button size="icon" variant="outline" onClick={() => setMobileMenuOpen(true)}>
          <Menu />
        </Button>
      </div>

      <div className="hidden md:block fixed top-0 left-0 h-screen z-40 w-[240px]">
        <SidebarContent />
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="h-full">
            <SidebarContent isMobile />
          </div>
        </div>
      )}
    </>
  );
}
