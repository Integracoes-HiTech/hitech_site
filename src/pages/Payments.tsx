import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentHistoryItem, { PaymentHistoryItemProps, PaymentStatus } from "@/components/payments/PaymentHistoryItem";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { supabase } from "@/supabaseClient";
import { formatDateBR } from "@/components/utils/date";

const Payments = () => {
  const [payments, setPayments] = useState<PaymentHistoryItemProps[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("pagamentos")
        .select("*")
        .eq("usuario_id", user.id);

      if (!error && data) {
        setPayments(data);
      } else {
        console.error("Erro ao buscar pagamentos:", error);
        return;
      }
      
    // Mapeia e normaliza os campos
    const mappedPayments = data.map(p => ({
      id: p.id,
      amount: Number(p.valor),
      status: p.status,
      description: p.descricao,
      dueDate: p.vencimento,
      date: p.data_pagamento,
      invoiceUrl: p.nota_fiscal_url,
      paymentMethods: {
        pix: {
          key: p.pix_key,
          qrCodeUrl: p.pix_qrcode
        },
        boleto: {
          code: p.boleto_codigo,
          url: p.boleto_url
        }
      }
    }));

    setPayments(mappedPayments);
  };
      

    fetchPayments();
  }, []);

  const getFilteredPayments = (status?: PaymentStatus) => {
    if (!status) return payments;
    return payments.filter(payment => payment.status === status);
  };

  const allPayments = getFilteredPayments();
  const pendingPayments = getFilteredPayments("Pendente");
  const paidPayments = getFilteredPayments("Pago");

  const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = pendingPayments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pagamentos</h1>
          <p className="text-muted-foreground">
            Histórico e status de pagamentos de seus projetos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {paidPayments.length} pagamentos efetuados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPending)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingPayments.length} pagamentos pendentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingPayments.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">
                  {formatDateBR(pendingPayments[0].dueDate)}
                    
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(pendingPayments[0].amount)} - {pendingPayments[0].description}
                  </p>
                </>
              ) : (
                <div className="text-muted-foreground">Nenhum pagamento pendente</div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="paid">Pagos</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allPayments.length > 0 ? (
                    allPayments.map(payment => (
                      <PaymentHistoryItem key={payment.id} {...payment} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Nenhum pagamento disponível.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pagamentos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pendingPayments.length > 0 ? (
                    pendingPayments.map(payment => (
                      <PaymentHistoryItem key={payment.id} {...payment} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Não há pagamentos pendentes.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card>
              <CardHeader>
                <CardTitle>Pagamentos Efetuados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {paidPayments.length > 0 ? (
                    paidPayments.map(payment => (
                      <PaymentHistoryItem key={payment.id} {...payment} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Nenhum pagamento efetuado.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
