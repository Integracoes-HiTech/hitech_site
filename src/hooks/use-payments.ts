
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Payment {
  id: string;
  description: string;
  contract_id: string;
  client_id: string;
  amount: number;
  status: string;
  date: string;
  due_date: string;
  invoice_url: string | null;
  pix_key: string | null;
  pix_qrcode_url: string | null;
  boleto_code: string | null;
  boleto_url: string | null;
  created_at: string;
  updated_at: string;
}

export const usePayments = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ["payments", user?.id, isAdmin],
    queryFn: async (): Promise<Payment[]> => {
      if (!user) return [];

      let query = supabase.from("payments").select("*");
      
      // A política RLS já fará a filtragem, mas podemos otimizar a consulta
      if (!isAdmin) {
        query = query.eq("client_id", user.id);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar pagamentos:", error);
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!user,
  });
};

export const usePayment = (id: string | undefined) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["payment", id, user?.id],
    queryFn: async (): Promise<Payment | null> => {
      if (!id || !user) return null;

      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar pagamento:", error);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!id && !!user,
  });
};
