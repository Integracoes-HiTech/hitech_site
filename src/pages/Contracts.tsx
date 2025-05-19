import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supabase = createClient(
  "https://hfjosywhuxsjgdnlvuse.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
);

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contracts, setContracts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContracts = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Usuário não autenticado:", userError);
        return;
      }
      const { data, error } = await supabase
        .from("contratos")
        .select("*")
        .eq("usuario_id", user.id)
        .order("data_contrato", { ascending: false });

      if (error) {
        console.error("Erro ao buscar contratos:", error);
      } else {
        setContracts(data);
      }
    };

    fetchContracts();
  }, []);

  const filteredContracts = contracts.filter(contract =>
    contract.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.projeto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (contract) => {
    window.open(contract.url, "_blank");
  };

  const handleDownload = (contract) => {
    toast({
      title: "Download iniciado",
      description: `${contract.titulo} está sendo baixado.`,
    });

    const link = document.createElement("a");
    link.href = contract.url;
    link.setAttribute("download", `${contract.titulo}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Ativo": return "text-green-600";
      case "Concluído": return "text-blue-600";
      case "Cancelado": return "text-red-600";
      default: return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contratos</h1>
          <p className="text-muted-foreground">
            Veja todos os contratos relacionados aos seus projetos.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Seus Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar contratos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredContracts.length > 0 ? (
  <>
    {/* Tabela para desktop */}
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contrato</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContracts.map(contract => (
            <TableRow key={contract.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{contract.titulo}</span>
                </div>
              </TableCell>
              <TableCell>{contract.projeto}</TableCell>
              <TableCell>{new Date(contract.data_contrato).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell className={getStatusStyle(contract.status)}>
                {contract.status}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(contract)}>
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(contract)}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Cards para mobile */}
    <div className="md:hidden space-y-4">
      {filteredContracts.map(contract => (
        <div
          key={contract.id}
          className="rounded-md border p-4 shadow-sm bg-white space-y-2"
        >
          <div className="flex items-center gap-2 font-medium">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {contract.titulo}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Projeto: </span>{contract.projeto}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Data: </span>{new Date(contract.data_contrato).toLocaleDateString("pt-BR")}
          </div>
          <div className={`text-sm font-semibold ${getStatusStyle(contract.status)}`}>
            Status: {contract.status}
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" onClick={() => handleView(contract)}>
              Visualizar
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDownload(contract)}>
              <Download className="h-4 w-4 mr-1" />
              Baixar
            </Button>
          </div>
        </div>
      ))}
    </div>
  </>
) : (
  <div className="text-center text-muted-foreground py-6">
    Nenhum contrato encontrado. Tente outra busca.
  </div>
)}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Contracts;