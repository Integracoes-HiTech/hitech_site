import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
    

const TicketDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<any>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      const { data, error } = await supabase
        .from("tickets_suporte")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        toast.error("Erro ao buscar ticket.");
        navigate("/cliente-suporte");
        return;
      }

      setTicket(data);
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setPrioridade(data.prioridade);
      setStatus(data.status);
      setLoading(false);
    };

    fetchTicket();
  }, [id, navigate]);

  const handleUpdate = async () => {
    console.log("Enviando status:", status); // ajuda a debugar
  
    setLoading(true);
  
    const { error } = await supabase
      .from("tickets_suporte")
      .update({
        titulo,
        descricao,
        prioridade,
        status,
        atualizado_em: new Date()
      })
      .eq("id", id);
  
    setLoading(false);
  
    if (error) {
      console.error("Erro Supabase:", error); // log completo do erro
      toast.error("Erro ao atualizar o status do ticket.");
    } else {
      toast.success("Status atualizado com sucesso!");
      navigate("/support");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-muted-foreground">
          Carregando dados do ticket...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detalhes do Ticket</h1>
          <p className="text-muted-foreground">Veja e edite os detalhes deste ticket de suporte.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Editar Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Textarea
                rows={6}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prioridade</label>
              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                disabled
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

              <div className="pt-4 flex justify-end gap-2 flex-wrap">
                <Button variant="outline" onClick={() => navigate("/Support")}>
                     Cancelar
                </Button>
                <Button onClick={handleUpdate}  disabled={loading} >
                {loading ? "Salvando..." : "Salvar Alterações"}
                </Button>
</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TicketDetalhes;
