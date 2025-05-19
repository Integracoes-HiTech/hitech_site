
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  client_id: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
  deadline: string | null;
}

export const useProjects = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ["projects", user?.id, isAdmin],
    queryFn: async (): Promise<Project[]> => {
      if (!user) return [];

      let query = supabase.from("projects").select("*");
      
      // A política RLS já fará a filtragem, mas podemos otimizar a consulta
      if (!isAdmin) {
        query = query.eq("client_id", user.id);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar projetos:", error);
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!user,
  });
};

export const useProject = (id: string | undefined) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["project", id, user?.id],
    queryFn: async (): Promise<Project | null> => {
      if (!id || !user) return null;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar projeto:", error);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!id && !!user,
  });
};
