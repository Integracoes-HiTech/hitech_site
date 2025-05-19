import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Layout e páginas
import Layout from "./Layout.jsx";
import Home from "./Home";
import ClienteLogin from "./ClienteLogin";
import Dashboard from "./Dashboard";
import Files from "./files";
import Contracts from "./contracts";
import Payments from "./payments";
import Support from "./support";
import Notifications from "./notifications";
import ProjectDetails from "./ProjectDetails"; // ✅ sem proteção
import PortfolioSection from "@/components/PortfolioSection";// ✅ sem proteção
import NovoTicket from "@/pages/NovoTicket";
import TicketDetalhes from "@/pages/TicketDetalhes";
import VisualizarProjeto from "@/pages/VisualizarProjeto";



const protectedPaths = [
  "/dashboard", "/files", "/contracts", "/payments", "/support", "/notifications", "/NovoTicket", "/TicketDetalhes", "/projeto/:id"
];

function _getCurrentPage(url) {
  if (url.endsWith("/")) url = url.slice(0, -1);
  const path = url.split("?")[0]; // remove query string
  if (path.includes("/projeto/")) return "projeto";
  if (path.includes("/ticket/")) return "ticket";
  const lastPart = path.split("/").pop()?.toLowerCase() || "home";
  return lastPart;
}


// Componente de proteção de rota
function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Sessão:", data?.session?.user);
      setAuthorized(!!data?.session?.user);
    };
    checkSession();
  }, []);

  if (authorized === null) return null;

  return authorized ? children : <Navigate to="/cliente-login" replace state={{ from: location }} />;
}

function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Routes>
      {/* ROTAS PÚBLICAS SEM LAYOUT */}
      <Route path="/projectdetails" element={<ProjectDetails />} />
      <Route path="/portfoliodetalhes" element={<PortfolioSection />} />

      {/* ROTAS COM LAYOUT */}
      <Route
        path="*"
        element={
          <Layout currentPageName={currentPage}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cliente-login" element={<ClienteLogin />} />


              {/* Protegidas */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/files" element={<ProtectedRoute><Files /></ProtectedRoute>} />
              <Route path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
              <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/NovoTicket" element={<ProtectedRoute><NovoTicket /></ProtectedRoute>} />
              <Route path="/ticket/:id" element={<ProtectedRoute><TicketDetalhes /></ProtectedRoute>} />
              <Route path="/projeto/:id" element={<ProtectedRoute><VisualizarProjeto /></ProtectedRoute>} />
              {/* fallback */}
              <Route path="*" element={<Navigate to="/cliente-login" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
