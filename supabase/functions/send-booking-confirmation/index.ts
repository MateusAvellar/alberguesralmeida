import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  customerName: string;
  customerEmail: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, roomName, checkIn, checkOut, totalPrice, paymentMethod }: BookingEmailRequest = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    // Email para o albergue
    const hostelEmailHtml = `
      <h1>Nova Reserva Recebida</h1>
      <h2>Detalhes da Reserva:</h2>
      <p><strong>Cliente:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Quarto:</strong> ${roomName}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Valor Total:</strong> R$ ${totalPrice.toFixed(2)}</p>
      <p><strong>Forma de Pagamento:</strong> ${paymentMethod}</p>
      ${paymentMethod === "PIX" ? `<p><strong>Conta PIX:</strong> Banco do Brasil - 21999322372</p>` : ""}
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Albergue Almeida <onboarding@resend.dev>",
        to: ["mateus.25204708360027@faeterj-rio.edu.br"],
        subject: "Nova Reserva Recebida - Albergue Almeida",
        html: hostelEmailHtml,
      }),
    });

    // Email de confirmação para o cliente
    const customerEmailHtml = `
      <h1>Reserva Confirmada!</h1>
      <p>Olá ${customerName},</p>
      <p>Sua reserva no Albergue Almeida foi confirmada com sucesso!</p>
      <h2>Detalhes da sua Reserva:</h2>
      <p><strong>Quarto:</strong> ${roomName}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Valor Total:</strong> R$ ${totalPrice.toFixed(2)}</p>
      <p><strong>Forma de Pagamento:</strong> ${paymentMethod}</p>
      ${paymentMethod === "PIX" ? `
        <p><strong>Dados para Pagamento PIX:</strong></p>
        <p>Banco do Brasil</p>
        <p>Chave PIX: 21999322372</p>
      ` : ""}
      <p>Aguardamos você no Albergue Almeida!</p>
      <p>Em caso de dúvidas, entre em contato conosco.</p>
      <p>Atenciosamente,<br>Equipe Albergue Almeida</p>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Albergue Almeida <onboarding@resend.dev>",
        to: [customerEmail],
        subject: "Confirmação de Reserva - Albergue Almeida",
        html: customerEmailHtml,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
