// src/components/dashboard/PaymentHistoryItem.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatDateBR } from "@/components/utils/date";
import { supabase } from "@/supabaseClient";

export type PaymentStatus = 'Pago' | 'Pendente' | 'Atrasado' | 'Processando';

export interface PaymentHistoryItemProps {
  id: string;
  description: string;
  date: string;
  dueDate: string;
  amount: number;
  status: PaymentStatus;
  invoiceUrl: string;
  userId: string;
  userEmail: string;
  userName: string;
}

const getStatusClass = (status: PaymentStatus) => {
  switch (status) {
    case 'Pago': return 'bg-green-100 text-green-800 border-green-200';
    case 'Pendente': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Atrasado': return 'bg-red-100 text-red-800 border-red-200';
    case 'Processando': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return '';
  }
};

const PaymentHistoryItem = ({
  id,
  description,
  date,
  dueDate,
  amount,
  status,
  invoiceUrl,
  userId,
  userEmail,
  userName
}: PaymentHistoryItemProps) => {
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(value);

  const getOrCreateCustomer = async () => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("asaas_customer_id")
      .eq("id", userId)
      .single();

    if (profile?.asaas_customer_id) return profile.asaas_customer_id;

    const response = await fetch("/api/asaas/gerar-cobranca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmU2NGM2MmRiLTQ3NDgtNGQ3ZC1iOWFhLWRkNDFiYzgzYmNhZDo6JGFhY2hfMDdhOWM3MmYtY2RkZi00MmJmLTlhOTctZDg4NGVlODIzYTFh`
      },
      body: JSON.stringify({ name: userName, email: userEmail })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result?.errors?.[0]?.description || "Erro ao criar cliente");

    await supabase.from("profiles").update({ asaas_customer_id: result.id }).eq("id", userId);
    return result.id;
  };

  const handleRealizarPagamento = async () => {
    try {
      setLoading(true);
      const customerId = await getOrCreateCustomer();

      const response = await fetch("https://sandbox.asaas.com/api/v3/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmU2NGM2MmRiLTQ3NDgtNGQ3ZC1iOWFhLWRkNDFiYzgzYmNhZDo6JGFhY2hfMDdhOWM3MmYtY2RkZi00MmJmLTlhOTctZDg4NGVlODIzYTFh`
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          amount,
          description,
          supabasePaymentId: id
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.errors?.[0]?.description || "Erro ao gerar cobrança.");

      await supabase.from("pagamentos").update({
        metodo_pagamento: "PIX",
        status: "Pendente",
        data_confirmacao: null,
        url_comprovante: result.invoiceUrl || result.pixQrCodeImageUrl
      }).eq("id", id);

      setPaymentMethods({
        pix: {
          qrCodeUrl: result.pixQrCodeImageUrl,
          key: result.pixCopyPasteKey
        }
      });

      toast({ title: "Pagamento gerado", description: "Escaneie o QR Code do PIX para concluir." });
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-full mt-1">
              <CircleDollarSign className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium">{description}</h4>
              <div className="text-sm text-muted-foreground">{date}</div>
            </div>
          </div>
          <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>
        </div>

        <div className="mt-4 text-lg font-semibold">{formatCurrency(amount)}</div>
        <div className="mt-1 text-xs text-muted-foreground">Vencimento: {formatDateBR(dueDate)}</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(status === 'Pendente' || status === 'Atrasado') && !paymentMethods ? (
            <Button variant="default" size="sm" onClick={handleRealizarPagamento} disabled={loading}>
              {loading ? "Gerando..." : "Realizar pagamento"}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => window.open(invoiceUrl, "_blank")}>
              Ver comprovante
            </Button>
          )}
        </div>

        {paymentMethods?.pix && (
          <div className="mt-4 border-t pt-4 space-y-4">
            <h5 className="font-medium text-sm">PIX</h5>
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 border rounded-md">
                <img src={paymentMethods.pix.qrCodeUrl} alt="QR Code PIX" className="w-24 h-24" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Chave PIX:</div>
                <div className="flex gap-2">
                  <code className="text-xs bg-gray-100 p-1 rounded flex-1 overflow-hidden text-ellipsis">
                    {paymentMethods.pix.key}
                  </code>
                  <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => {
                    navigator.clipboard.writeText(paymentMethods.pix.key);
                    toast({ title: "Chave PIX copiada", description: "A chave foi copiada com sucesso." });
                  }}>Copiar</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryItem;
