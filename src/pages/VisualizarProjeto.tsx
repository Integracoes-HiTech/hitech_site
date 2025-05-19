import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function VisualizarProjeto() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projetos")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProject(data);
    };

    if (id) fetchProject();
  }, [id]);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-muted-foreground">Carregando projeto...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{project.titulo}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">{project.descricao}</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <span>Status:</span>
              <Badge variant="outline">{project.status}</Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progresso:</span>
                <span>{project.progresso || 0}%</span>
              </div>
              <Progress value={project.progresso || 0} />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prazo:</span>
              <span>{new Date(project.prazo).toLocaleDateString("pt-BR")}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Última atualização:</span>
              <span>{new Date(project.atualizado_em).toLocaleDateString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
