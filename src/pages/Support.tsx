import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import SupportTicketItem from "@/components/support/SupportTicketItem";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/supabaseClient";


const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("tickets_suporte")
        .select("*")
        .eq("usuario_id", user.id);

      if (error) {
        console.error("Erro ao buscar tickets:", error);
      } else {
        const mapped = data.map(ticket => ({
          id: ticket.id,
          title: ticket.titulo,
          description: ticket.descricao,
          status: ticket.status,
          priority: ticket.prioridade,
          createdAt: ticket.criado_em,
          updatedAt: ticket.atualizado_em,
        }));
        setTickets(mapped);
      }
    };

    fetchTickets();
  }, []);

  const filterTickets = (status) =>
    tickets.filter((ticket) => {
      const matchSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = !status || ticket.status === status;
      return matchSearch && matchStatus;
    });

  const allTickets = filterTickets();
  const openTickets = filterTickets("Aberto");
  const inProgressTickets = filterTickets("Em atendimento");
  const resolvedTickets = filterTickets("Resolvido");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Suporte</h1>
            <p className="text-muted-foreground">
              Solicite ajuda e acompanhe suas conversas com nossa equipe de suporte.
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = "/NovoTicket")}
            className="text-sm px-6 py-5 sm:text-base sm:px-4 sm:py-2"
          >
            
            Novo Ticket
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar tickets..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos ({allTickets.length})</TabsTrigger>
            <TabsTrigger value="open">Abertos ({openTickets.length})</TabsTrigger>
            <TabsTrigger value="in-progress">Em atendimento ({inProgressTickets.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolvidos ({resolvedTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2">
              {allTickets.length > 0 ? (
                allTickets.map((ticket) => <SupportTicketItem key={ticket.id} {...ticket} />)
              ) : (
                <div className="col-span-full p-6 text-center text-muted-foreground">
                  Nenhum ticket encontrado. Tente outra busca.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="open">
            <div className="grid gap-4 md:grid-cols-2">
              {openTickets.length > 0 ? (
                openTickets.map((ticket) => <SupportTicketItem key={ticket.id} {...ticket} />)
              ) : (
                <div className="col-span-full p-6 text-center text-muted-foreground">
                  Nenhum ticket aberto.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="in-progress">
            <div className="grid gap-4 md:grid-cols-2">
              {inProgressTickets.length > 0 ? (
                inProgressTickets.map((ticket) => <SupportTicketItem key={ticket.id} {...ticket} />)
              ) : (
                <div className="col-span-full p-6 text-center text-muted-foreground">
                  Nenhum ticket em atendimento.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div className="grid gap-4 md:grid-cols-2">
              {resolvedTickets.length > 0 ? (
                resolvedTickets.map((ticket) => <SupportTicketItem key={ticket.id} {...ticket} />)
              ) : (
                <div className="col-span-full p-6 text-center text-muted-foreground">
                  Nenhum ticket resolvido.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Support;
