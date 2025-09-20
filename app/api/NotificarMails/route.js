import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: "mail.brandingemocion.net",
  port: 465,
  secure: true,
  auth: {
    user: "notificacion@brandingemocion.net",
    pass: "noti@2024",
  },
});

// Función para generar el HTML del email
function generateEmailHTML(expediente) {
  const formatFileSize = (bytes) => {
    return (bytes / 1024).toFixed(1) + " KB";
  };

  const generateFileLink = (archivo) => {
    const linkUrl = expediente.LinkURL || archivo.LinkURL;

    if (linkUrl && linkUrl.length > 0) {
      return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #1e40af; text-decoration: none; font-weight: 500; cursor: pointer;" class="external-link">${archivo.name} 🔗</a>`;
    }
    // Si no tiene LinkURL, usar la URL normal del archivo
    else if (archivo.url) {
      return `<a href="${archivo.url}" target="_blank" rel="noopener noreferrer" style="color: #1e40af; text-decoration: none; font-weight: 500; cursor: pointer;">${archivo.name}</a>`;
    }
    // Si no tiene ninguna URL, mostrar solo el nombre
    else {
      return `<span style="color: #374151; font-weight: 500;">${archivo.name}</span>`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notificación de Expediente</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #1e40af;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 10px;
            }
            .subtitle {
                color: #6b7280;
                font-size: 14px;
            }
            .expediente-info {
                background-color: #f1f5f9;
                border-left: 4px solid #1e40af;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
            }
            .expediente-number {
                font-size: 20px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 15px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 20px 0;
            }
            .info-item {
                margin-bottom: 10px;
            }
            .info-label {
                font-weight: bold;
                color: #374151;
                display: block;
                margin-bottom: 2px;
            }
            .info-value {
                color: #6b7280;
            }
            .files-section {
                margin: 25px 0;
                padding: 20px;
                background-color: #fefefe;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
            }
            .files-title {
                font-weight: bold;
                color: #374151;
                margin-bottom: 15px;
                font-size: 16px;
            }
            .file-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                margin: 5px 0;
                background-color: #f9fafb;
                border-radius: 6px;
                border-left: 3px solid #10b981;
            }
            .file-name {
                font-weight: 500;
                color: #374151;
            }
            /* Estilos para enlaces de archivos clickeables */
            .file-name a {
                color: #1e40af !important;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.2s ease;
            }
            .file-name a:hover {
                color: #1d4ed8 !important;
                text-decoration: underline;
            }
            .file-size {
                color: #6b7280;
                font-size: 12px;
            }
            /* Indicador visual para archivos externos */
            .external-link {
                position: relative;
            }
            .external-link::after {
                content: "";
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%231e40af" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15,3 21,3 21,9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>');
                background-size: contain;
                background-repeat: no-repeat;
                vertical-align: middle;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
            }
            .important-notice {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
            }
            .important-notice strong {
                color: #92400e;
            }
            @media (max-width: 600px) {
                .info-grid {
                    grid-template-columns: 1fr;
                }
                .file-item {
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">⚖️ Despacho de Abogados mchabogados </div>
                <div class="subtitle">Notificación de Expediente</div>
            </div>

            <div class="expediente-info">
                <div class="expediente-number">Expediente: ${
                  expediente.numeroExpediente
                }</div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Tipo de Servicio:</span>
                        <span class="info-value">${
                          expediente.tipoServicio || "No especificado"
                        }</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Fecha de Presentación:</span>
                        <span class="info-value">${formatDate(
                          expediente.fechaPresentacion
                        )}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Hora de Presentación:</span>
                        <span class="info-value">${
                          expediente.horaPresentacion || "No especificada"
                        }</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Tribunal Arbitral:</span>
                        <span class="info-value">${
                          expediente.tribunalArbitral || "No especificado"
                        }</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Secretario General:</span>
                        <span class="info-value">${
                          expediente.secretarioGeneral || "No especificado"
                        }</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Secretario:</span>
                        <span class="info-value">${
                          expediente.secretario || "No especificado"
                        }</span>
                    </div>
                    ${
                      expediente.tribunalUnico
                        ? `
                    <div class="info-item">
                        <span class="info-label">Tribunal Único:</span>
                        <span class="info-value">${expediente.tribunalUnico}</span>
                    </div>
                    `
                        : ""
                    }
                </div>

                <!-- Agregar información adicional del expediente -->
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">ID del Expediente:</span>
                            <span class="info-value" style="font-family: monospace; font-size: 12px;">${
                              expediente.id || "No disponible"
                            }</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fecha de Creación:</span>
                            <span class="info-value">${formatDateTime(
                              expediente.creacion
                            )}</span>
                        </div>
                        ${
                          expediente.updatedAt
                            ? `
                        <div class="info-item">
                            <span class="info-label">Última Actualización:</span>
                            <span class="info-value">${formatDateTime(
                              new Date(
                                expediente.updatedAt.seconds * 1000
                              ).toISOString()
                            )}</span>
                        </div>
                        `
                            : ""
                        }
                        <div class="info-item">
                            <span class="info-label">Destinatarios:</span>
                            <span class="info-value">${expediente.correos.join(
                              ", "
                            )}</span>
                        </div>
                    </div>
                </div>
            </div>

            ${
              expediente.archivos && expediente.archivos.length > 0
                ? `
            <div class="files-section">
                <div class="files-title">📎 Documentos Adjuntos (${
                  expediente.archivos.length
                })</div>
                ${expediente.archivos
                  .map(
                    (archivo, index) => `
                    <div class="file-item">
                        <div style="flex: 1;">
                            <div class="file-name">
                                ${generateFileLink(archivo)}
                            </div>
                            <div class="file-size">
                                Tamaño: ${formatFileSize(archivo.size)} | 
                                Subido: ${formatDateTime(archivo.uploadedAt)}
                                ${
                                  archivo.storagePath
                                    ? ` | Ruta: ${archivo.storagePath
                                        .split("/")
                                        .pop()}`
                                    : ""
                                }
                            </div>
                        </div>
                        <div style="color: #6b7280; font-size: 12px; margin-left: 10px;">
                            #${index + 1}
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            `
                : `
            <div class="files-section">
                <div class="files-title">📎 Documentos Adjuntos</div>
                <div style="text-align: center; color: #6b7280; padding: 20px;">
                    No hay documentos adjuntos en este expediente.
                </div>
            </div>
            `
            }

            <!-- Mejorar el aviso importante con más información -->
            <div class="important-notice">
                <strong>Aviso Importante:</strong> Esta notificación ha sido generada automáticamente por el sistema de gestión de expedientes. Para cualquier consulta o aclaración, por favor contacte directamente con nuestro despacho.
                <br><br>
                <strong>Sobre los documentos:</strong> 
                • Los nombres de los documentos son enlaces clickeables que se abrirán en una nueva pestaña para su visualización.
                • Los archivos con el ícono 🔗 son enlaces externos (ej. Google Drive, OneDrive, etc.).
                • Los archivos sin enlace externo se abren directamente desde nuestro sistema de almacenamiento seguro.
                ${
                  expediente.LinkURL && expediente.LinkURL.length > 0
                    ? `
                <br><br>
                <strong>Enlace principal del expediente:</strong> <a href="${expediente.LinkURL}" target="_blank" rel="noopener noreferrer" style="color: #1e40af;">Acceder al expediente completo 🔗</a>
                `
                    : ""
                }
            </div>

            <div class="footer">
                <p><strong>Despacho de Abogados</strong></p>
                <p>Este es un correo automático, por favor no responda a esta dirección.</p>
                <p>Fecha de envío: ${new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export async function POST(request) {
  try {
    const expediente = await request.json();

    console.log("expediente", expediente);

    // Validar que el expediente tenga los datos necesarios
    if (
      !expediente.numeroExpediente ||
      !expediente.correos ||
      expediente.correos.length === 0
    ) {
      return NextResponse.json(
        { error: "Datos del expediente incompletos" },
        { status: 400 }
      );
    }

    // Generar el HTML del email
    const htmlContent = generateEmailHTML(expediente);

    // Configurar el email
    const mailOptions = {
      from: {
        name: "Despacho de Abogados - Sistema de Notificaciones",
        address: "notificacion@brandingemocion.net",
      },
      to: expediente.correos,
      subject: `Notificación de Expediente ${expediente.numeroExpediente} - ${expediente.tipoServicio}`,
      html: htmlContent,
      // Agregar texto plano como alternativa
      text: `
        Notificación de Expediente: ${expediente.numeroExpediente}
        
        Tipo de Servicio: ${expediente.tipoServicio || "No especificado"}
        Fecha de Presentación: ${formatDate(expediente.fechaPresentacion)}
        Hora de Presentación: ${
          expediente.horaPresentacion || "No especificada"
        }
        Tribunal Arbitral: ${expediente.tribunalArbitral || "No especificado"}
        Secretario General: ${expediente.secretarioGeneral || "No especificado"}
        Secretario: ${expediente.secretario || "No especificado"}
        
        ${
          expediente.archivos && expediente.archivos.length > 0
            ? `Documentos adjuntos: ${expediente.archivos.length} archivo(s)`
            : "Sin documentos adjuntos"
        }
        
        Este es un correo automático del sistema de gestión de expedientes.
      `,
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email enviado:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Notificación enviada exitosamente",
      messageId: info.messageId,
      recipients: expediente.correos,
    });
  } catch (error) {
    console.error("Error al enviar email:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor al enviar la notificación",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

// Declare formatDate function before using it in the text part of mailOptions
function formatDate(dateString) {
  if (!dateString) return "No especificada";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
