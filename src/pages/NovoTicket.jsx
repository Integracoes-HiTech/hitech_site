import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NovoTicket = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
  
    if (!user) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/cliente-login", { replace: true });
      return;
    }
  
    setLoading(true);

    const { error } = await supabase.from("tickets_suporte").insert({
      id: crypto.randomUUID(),
      titulo,
      descricao,
      status: "Aberto",
      prioridade, // <- usado aqui
      criado_em: new Date(),
      atualizado_em: new Date(),
      usuario_id: user.id
    });

    setLoading(false);

    if (error) {
      toast.error("Erro ao enviar ticket.");
    } else {
      toast.success("Ticket enviado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPrioridade("Média");
    
      // 👇 Redireciona para a lista de tickets
    
      
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Ticket</h1>
          <p className="text-muted-foreground">
            Descreva com clareza seu problema ou solicitação. Nossa equipe vai te responder o mais breve possível.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                placeholder="Ex: Erro ao enviar imagens"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Textarea
                placeholder="Descreva o problema com detalhes..."
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
            <div className="pt-2 text-right">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Enviar Ticket"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NovoTicket;
