import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FileCard from "@/components/files/FileCard";

// Inicializa o Supabase diretamente (se não estiver usando .env)
const supabase = createClient(
  "https://hfjosywhuxsjgdnlvuse.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
);

const Files = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("arquivos")
        .select("*")
        .eq("usuario_id", user.id)
        .order("criado_em", { ascending: false });

      if (error) {
        console.error("Erro ao buscar arquivos:", error);
      } else {
        setFiles(data);
      }
    };

    fetchFiles();
  }, []);

  const filterFiles = (files, category) => {
    return files.filter(file => {
      const matchesSearch = file.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !category || file.categoria === category;
      return matchesSearch && matchesCategory;
    });
  };

  const briefingFiles = filterFiles(files, "Briefing");
  const contractFiles = filterFiles(files, "Contrato");
  const deliveryFiles = filterFiles(files, "Entrega");
  const docsFiles = filterFiles(files, "Documentação");
  const filteredAllFiles = filterFiles(files);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Arquivos</h1>
          <p className="text-muted-foreground">
            Acesse todos os arquivos relacionados aos seus projetos.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar arquivos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-4">
  {/* TabsList responsiva */}
  <TabsList className="w-full overflow-x-auto flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-5 sm:w-auto sm:gap-0">
    <TabsTrigger value="all" className="whitespace-nowrap px-4 py-2 text-sm">Todos</TabsTrigger>
    <TabsTrigger value="briefings" className="whitespace-nowrap px-4 py-2 text-sm">Briefings</TabsTrigger>
    <TabsTrigger value="contracts" className="whitespace-nowrap px-4 py-2 text-sm">Contratos</TabsTrigger>
    <TabsTrigger value="deliveries" className="whitespace-nowrap px-4 py-2 text-sm">Entregas</TabsTrigger>
    <TabsTrigger value="documents" className="whitespace-nowrap px-4 py-2 text-sm">Documentação</TabsTrigger>
  </TabsList>

  <TabsContent value="all">
    <Grid files={filteredAllFiles} vazio="Nenhum arquivo encontrado." />
  </TabsContent>

  <TabsContent value="briefings">
    <Grid files={briefingFiles} vazio="Nenhum briefing encontrado." />
  </TabsContent>

  <TabsContent value="contracts">
    <Grid files={contractFiles} vazio="Nenhum contrato encontrado." />
  </TabsContent>

  <TabsContent value="deliveries">
    <Grid files={deliveryFiles} vazio="Nenhuma entrega encontrada." />
  </TabsContent>

  <TabsContent value="documents">
    <Grid files={docsFiles} vazio="Nenhuma documentação encontrada." />
  </TabsContent>
</Tabs>
      </div>
    </DashboardLayout>
  );
};

const Grid = ({ files, vazio }) => (
  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {files.map(file => (
      <FileCard key={file.id} {...{
        id: file.id,
        name: file.nome,
        type: file.tipo,
        size: file.tamanho,
        createdAt: new Date(file.criado_em).toLocaleDateString("pt-BR"),
        url: file.url,
        category: file.categoria
      }} />
    ))}
    {files.length === 0 && (
      <div className="col-span-full p-6 text-center text-muted-foreground">
        {vazio}
      </div>
    )}
  </div>
);

export default Files;