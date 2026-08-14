import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura tu Access Token (búscalo en el panel de desarrollador de MP)
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Extraemos el precio que mandó tu página web ("R$ 800,00" o "R$ 1.000,00")
    const precioRecibido = body.preco; 
    
    // 2. Lo transformamos a un número limpio para que Mercado Pago lo procese
    const precioFinal = precioRecibido === "R$ 800,00" ? 800.00 : 1000.00;

    // Creamos la preferencia de pago
    const preference = new Preference(client);
    
    const result = await preference.create({
      body: {
        items: [
          {
            id: 'passaporte-oasis-01',
            title: 'Passaporte Oásis Literário SP',
            description: 'Retiro de leitura all-inclusive (16 a 18 de outubro)',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: precioFinal, // AQUÍ CONECTAMOS EL PRECIO DINÁMICO
          }
        ],
        back_urls: {
          success: 'https://tusitio.com/sucesso',
          failure: 'https://tusitio.com/falha',
          pending: 'https://tusitio.com/pendente'
        },
        auto_return: 'approved',
        notification_url: 'https://tu-webhook-url.com/webhook/mercadopago', 
      }
    });

    // Devolvemos la URL del checkout al frontend
    return NextResponse.json({ init_point: result.init_point });
    
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}