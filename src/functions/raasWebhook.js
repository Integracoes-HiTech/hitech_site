// 🔧 Arquivo: `functions/raasWebhook.js`
// Suba esse endpoint como uma função Edge ou via Vercel/Cloudflare etc.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://hfjosywhuxsjgdnlvuse.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
  );
  
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const payload = req.body;

  try {
    const { id: pagamentoId, status } = payload;

    // Raas envia status como "pago" (string minúscula)
    if (status === 'pago') {
      const { error } = await supabase
        .from('pagamentos')
        .update({
          status: 'Pago',
          data_confirmacao: new Date(),
        })
        .eq('id', pagamentoId);

      if (error) throw error;

      return res.status(200).json({ message: 'Pagamento atualizado com sucesso.' });
    }

    return res.status(200).json({ message: 'Status ignorado.' });
  } catch (err) {
    console.error('Erro no webhook:', err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
}

// ✅ Lembre-se de configurar a URL dessa função na Raas como Webhook de confirmação
// Exemplo: https://seusite.com/api/raasWebhook
