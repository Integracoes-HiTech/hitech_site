import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  User, 
  Settings, 
  LogOut,
  Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClienteSidebar({ className }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: createPageUrl("Cliente"),
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "Projetos",
      href: createPageUrl("ClienteProjetos"),
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: "Documentos",
      href: createPageUrl("ClienteDocumentos"),
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: "Pagamentos",
      href: createPageUrl("ClientePagamentos"),
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      name: "Meu perfil",
      href: createPageUrl("ClientePerfil"),
      icon: <User className="h-5 w-5" />
    },
    {
      name: "Configurações",
      href: createPageUrl("ClienteConfiguracoes"),
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar - Desktop (fixed) and Mobile (overlay) */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col fixed top-0 bottom-0 lg:w-64 z-40 transition-all duration-300",
          mobileMenuOpen ? "left-0 w-64" : "left-[-240px] lg:left-0",
          className
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hi Tech</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 border-b">
          <div className="text-sm text-gray-600">Bem-vindo(a),</div>
          <div className="font-medium">Ana Silva</div>
        </div>

        <nav className="flex-1 overflow-auto py-6 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t mt-auto">
          <Link
            to={createPageUrl("Home")}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Voltar ao site</span>
          </Link>
          <Link
            to={createPageUrl("ClienteLogin")}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mt-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}