
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Contract {
  id: string;
  title: string;
  project_id: string;
  client_id: string;
  status: string;
  date: string;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export const useContracts = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ["contracts", user?.id, isAdmin],
    queryFn: async (): Promise<Contract[]> => {
      if (!user) return [];

      let query = supabase.from("contracts").select("*");
      
      // A política RLS já fará a filtragem, mas podemos otimizar a consulta
      if (!isAdmin) {
        query = query.eq("client_id", user.id);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar contratos:", error);
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!user,
  });
};

export const useContract = (id: string | undefined) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["contract", id, user?.id],
    queryFn: async (): Promise<Contract | null> => {
      if (!id || !user) return null;

      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar contrato:", error);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!id && !!user,
  });
};
