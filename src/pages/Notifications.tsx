import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotificationItem from "@/components/dashboard/NotificationItem";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/supabaseClient";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("notificacoes")
        .select("*")
        .eq("usuario_id", user.id)
        .order("data_envio", { ascending: false });

      if (!error && data) {
        const mapped = data.map(n => ({
          id: n.id,
          title: n.titulo,
          message: n.mensagem,
          date: new Date(n.data_envio).toLocaleString("pt-BR"),
          read: !!n.lida // garante que read seja booleano
        }));
        setNotifications(mapped);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    // 1. Atualiza no banco
    const { error } = await supabase
      .from("notificacoes")
      .update({ lida: true })
      .eq("id", id);
  
    if (!error) {
      // 2. Atualiza no React
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } else {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
  
    if (unreadIds.length === 0) return;
  
    const { error } = await supabase
      .from("notificacoes")
      .update({ lida: true })
      .in("id", unreadIds);
  
    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
      toast({
        title: "Notificações marcadas como lidas",
        description: "Todas foram atualizadas com sucesso."
      });
    } else {
      console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notificações</h1>
            <p className="text-muted-foreground">
              Acompanhe atualizações e novidades sobre seus projetos.
            </p>
          </div>

          {unreadNotifications.length > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              className="self-start sm:self-auto text-sm px-3 py-1.5 sm:text-base sm:px-4 sm:py-2"
            >
              <Check className="mr-2 h-4 w-4" />
              Marcar como lidas
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="all">
              Todas ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas
              {unreadNotifications.length > 0 && ` (${unreadNotifications.length})`}
            </TabsTrigger>
            <TabsTrigger value="read">
              Lidas
              {readNotifications.length > 0 && ` (${readNotifications.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Todas */}
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Todas as notificações</CardTitle>
                <CardDescription>
                  Notificações de seus projetos e atividades recentes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                        read={notification.read}
                        onMarkAsRead={handleMarkAsRead}
                      />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Não há notificações no momento.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Não lidas */}
          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Notificações não lidas</CardTitle>
                <CardDescription>
                  Notificações que ainda não foram visualizadas.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        {...notification}
                        onMarkAsRead={handleMarkAsRead}
                      />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Não há notificações não lidas.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lidas */}
          <TabsContent value="read">
            <Card>
              <CardHeader>
                <CardTitle>Notificações lidas</CardTitle>
                <CardDescription>
                  Visualize novamente suas notificações já marcadas como lidas.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {readNotifications.length > 0 ? (
                    readNotifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        {...notification}
                        onMarkAsRead={() => {}}
                      />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Nenhuma notificação lida.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
