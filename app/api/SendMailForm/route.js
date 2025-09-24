import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: "mail.brandingemocion.net",
    port: 465,
    secure: true,
    auth: {
      user: "notificacion@brandingemocion.net",
      pass: "noti@2024",
    },
  });

  // Mapeo dinámico de las filas de la tabla
  const generateTableRows = (data) =>
    Object.entries(data)
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>${key}:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${value}</td>
        </tr>
      `
      )
      .join(""); // Join para unir todas las filas en un solo string

  const mailOptions = {
    from: '"MCH ABOGADOS - Notificaciones" <notificacion@brandingemocion.net>',
    to: `mchabogados@legalmch.com`, // Enviar a la empresa y al cliente
    subject: `Nuevo contacto recibido - ${data?.Nombre || ""}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Formulario de Contacto MCHABOGADOS</h2>
        <p style="text-align: center; color: #333;">
          Hemos recibido de contacto a continuación, los detalles de su solicitud:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${generateTableRows(
            data
          )}  <!-- Aquí se insertan las filas generadas -->
        </table>
         <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
            Este correo ha sido generado automáticamente. Por favor, no lo responda directamente.
          </p>
      </div>
    `,
  };

  console.log("mailOptions", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Reclamo enviado con éxito" });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { message: "Error al enviar el reclamo", error },
      { status: 500 }
    );
  }
}
