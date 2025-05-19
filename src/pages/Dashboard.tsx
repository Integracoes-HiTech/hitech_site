import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

import Sidebar from "@/components/layout/Sidebar";
import ProjectCard from "@/components/dashboard/ProjectCard";
import NotificationItem from "@/components/dashboard/NotificationItem";
import StatCard from "@/components/dashboard/StatCard";
import { SIDEBAR_WIDTH } from "@/components/layout/Sidebar";
import { formatDateBR } from "@/components/utils/date";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  LayoutDashboard,
  FileArchive,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [files, setFiles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) {
        navigate("/cliente-login", { replace: true });
        return;
      }

      if (!ignore && localStorage.getItem("login_success")) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo à área do cliente HiTech."
        });
        localStorage.removeItem("login_success");
      }

      if (!ignore) {
        const [proj, notif, contr, arq, pag] = await Promise.all([
          supabase.from("projetos").select("*").eq("usuario_id", user.id),
          supabase.from("notificacoes").select("*").eq("usuario_id", user.id),
          supabase.from("contratos").select("*").eq("usuario_id", user.id),
          supabase.from("arquivos").select("*").eq("usuario_id", user.id),
          supabase.from("pagamentos").select("*").eq("usuario_id", user.id)
        ]);

        setProjects(proj.data || []);
        setNotifications(notif.data || []);
        setContracts(contr.data || []);
        setFiles(arq.data || []);
        setPayments(pag.data || []);

        setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [navigate, toast]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/cliente-login", { replace: true });
  };

  if (loading) return null;

  const totalPendente = payments
    .filter(p => p.status === "Pendente")
    .reduce((acc, p) => acc + Number(p.valor), 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 p-4 md:p-6 space-y-6 md:ml-[240px]">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo à área do cliente HiTech. Veja um resumo de seus projetos e informações.
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Projetos Ativos"
            value={projects.length.toString()}
            icon={LayoutDashboard}
            description="Projetos cadastrados"
          />
          <StatCard
            title="Total de Arquivos"
            value={files.length.toString()}
            icon={FileArchive}
            color="secondary"
            description="Documentos disponíveis"
          />
          <StatCard
            title="Contratos"
            value={contracts.length.toString()}
            icon={FileArchive}
            color="success"
            description="Contratos ativos"
          />
          <StatCard
            title="Pagamentos Pendentes"
            value={totalPendente}
            icon={CreditCard}
            color="warning"
            description="Faturas em aberto"
          />
        </div>

        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  id={project.id}
                  title={project.titulo}
                  description={project.descricao}
                  status={project.status}
                  progress={project.progresso}
                  updatedAt={formatDateBR(project.atualizado_em)}
                  deadline={formatDateBR(project.prazo)}
                />              
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
                <CardDescription>Suas últimas atualizações.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        title={notification.titulo}
                        message={notification.mensagem}
                        date={new Date(notification.data_envio).toLocaleString("pt-BR")}
                        read={notification.lida}
                        onMarkAsRead={handleMarkAsRead}
                      />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Nenhuma notificação disponível.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
