import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. URL de tu webhook de n8n (Debe ir en tu archivo .env)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    // Si no configuraste la URL aún, igual permitimos que el código siga
    // para no bloquearle la compra a la usuaria en la página principal.
    if (!n8nWebhookUrl) {
      console.warn("Falta N8N_WEBHOOK_URL en el .env, pero los datos llegaron:", data);
      return NextResponse.json({ success: true, warning: 'Webhook URL no configurada' });
    }

    // 2. Formateamos los datos para enviarlos a n8n
    const payload = {
      timestamp: new Date().toISOString(),
      evento: 'Oasis Literario SP',
      tipo_registro: data.type, // 'novo_checkout' o 'lista_espera'
      dados_cliente: {
        nome: data.nome || 'N/A',
        telefone: data.telefone || 'N/A',
        email: data.email || 'N/A',
        canal: data.canal || 'N/A',
        data_futura_interesse: data.dataFutura || 'N/A'
      }
    };

    // 3. Disparamos la información a n8n
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error enviando a n8n: ${response.statusText}`);
    }

    // Respuesta exitosa al frontend
    return NextResponse.json({ success: true, message: 'Datos enviados a n8n correctamente' });

  } catch (error: any) {
    console.error("Error en el Webhook Interno:", error);
    // Devolvemos 200 en lugar de 500 para evitar que el navegador aborte el proceso
    // y permita que la redirección a Mercado Pago siga funcionando.
    return NextResponse.json({ success: false, error: error.message }, { status: 200 });
  }
}