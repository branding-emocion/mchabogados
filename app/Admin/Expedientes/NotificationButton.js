"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ExpedienteNotificationButton({ expediente }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendNotification = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/NotificarMails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expediente),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la notificación");
      }

      const result = await response.json();

      toast(
        `El expediente ${expediente.numeroExpediente} ha sido enviado exitosamente a ${expediente.correos.length} destinatario(s).`
      );

      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast(
        "No se pudo enviar la notificación. Por favor, inténtelo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full md:w-auto hover:cursor-pointer"
          size="lg"
        >
          <Mail className="mr-2 h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Confirmar Envío de Notificación
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              ¿Está seguro de que desea enviar la notificación del expediente{" "}
              <strong>{expediente.numeroExpediente}</strong> por correo
              electrónico?
            </p>
            <div className="bg-muted p-3 rounded-md mt-3">
              <p className="text-sm font-medium mb-1">Detalles del envío:</p>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Expediente:</strong> {expediente.numeroExpediente}
                </li>
                <li>
                  • <strong>Tipo:</strong> {expediente.tipoServicio}
                </li>
                <li>
                  • <strong>Destinatarios:</strong>{" "}
                  {expediente.correos.join(", ")}
                </li>
                <li>
                  • <strong>Archivos:</strong> {expediente.archivos.length}{" "}
                  documento(s)
                </li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSendNotification}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Sí, Enviar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
