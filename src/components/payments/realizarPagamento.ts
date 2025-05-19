import axios from "axios";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";

const RASS_API_KEY = "831f9091-56f7-41d6-a7bc-74a93a66d340";

export async function realizarPagamento(valor, userId) {
  try {
    // 1. Cria cobrança via Receba.AI
    const response = await axios.post(
      "https://api.receba.ai/v1/pix/cobrar",
      {
        valor,
        descricao: "Pagamento HiTech",
      },
      {
        headers: {
          Authorization: `Bearer ${RASS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { id, pix, link, expiracao } = response.data;

    // 2. Salva no Supabase
    const { error } = await supabase.from("pagamentos").insert({
      id, // usa o mesmo id da cobrança da Raas
      user_id: userId,
      valor,
      metodo_pagamento: "Pix",
      status: "pendente",
      data_criacao: new Date(),
    });

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      toast.error("Erro ao salvar cobrança.");
      return null;
    }

    // 3. Retorna QR Code e link de pagamento
    return { qrCode: pix, link };
  } catch (err) {
    console.error("Erro na cobrança:", err);
    toast.error("Erro ao gerar cobrança.");
    return null;
  }
}
