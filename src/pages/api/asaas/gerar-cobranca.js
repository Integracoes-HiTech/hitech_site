// pages/api/asaas/gerar-cobranca.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    const { name, email, amount, description } = req.body;
  
    if (!name || !email || !amount || !description) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }
  
    try {
      // Criar cliente no Asaas (ou verificar se existe)
      const customerRes = await fetch('https://sandbox.asaas.com/api/v3/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmU2NGM2MmRiLTQ3NDgtNGQ3ZC1iOWFhLWRkNDFiYzgzYmNhZDo6JGFhY2hfMDdhOWM3MmYtY2RkZi00MmJmLTlhOTctZDg4NGVlODIzYTFh`,
        },
        body: JSON.stringify({ name, email })
      });
  
      const customer = await customerRes.json();
      if (!customer.id) throw new Error(customer.errors?.[0]?.description || 'Erro ao criar cliente');
  
      // Criar pagamento via PIX
      const paymentRes = await fetch('https://sandbox.asaas.com/api/v3/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmU2NGM2MmRiLTQ3NDgtNGQ3ZC1iOWFhLWRkNDFiYzgzYmNhZDo6JGFhY2hfMDdhOWM3MmYtY2RkZi00MmJmLTlhOTctZDg4NGVlODIzYTFh`,
        },
        body: JSON.stringify({
          customer: customer.id,
          billingType: 'PIX',
          value: amount,
          description,
          dueDate: new Date().toISOString().split('T')[0],
        })
      });
  
      const payment = await paymentRes.json();
      if (!payment.id) throw new Error(payment.errors?.[0]?.description || 'Erro ao gerar pagamento');
  
      return res.status(200).json({
        success: true,
        qrCodeUrl: payment.pixQrCodeImageUrl,
        copyPasteKey: payment.pixCopyPasteKey,
        paymentId: payment.id
      });
  
    } catch (err) {
      console.error('Erro ao gerar cobrança:', err);
      return res.status(500).json({ error: err.message || 'Erro interno.' });
    }
  }
  