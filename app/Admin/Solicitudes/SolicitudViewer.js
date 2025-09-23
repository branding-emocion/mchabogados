// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { FileText, Download, Eye, Calendar, FileCheck } from "lucide-react";

// const TIPOS_DOCUMENTO_LABELS = {
//   carnet_extranjeria: "Carnet de extranjería",
//   dni: "DNI",
//   pasaporte: "Pasaporte",
//   ruc: "RUC",
// };

// const ESTADOS = {
//   Pendiente: { color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
//   "En revisión": { color: "bg-blue-100 text-blue-800", icon: "👁️" },
//   Aprobada: { color: "bg-green-100 text-green-800", icon: "✅" },
//   Rechazada: { color: "bg-red-100 text-red-800", icon: "❌" },
// };

// export function SolicitudViewer({ isOpen, onClose, solicitud }) {
//   if (!solicitud) return null;

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "-";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     return date.toLocaleDateString("es-ES", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getEstadoBadge = (estado) => {
//     const estadoConfig = ESTADOS[estado] || ESTADOS["Pendiente"];
//     return (
//       <Badge className={`${estadoConfig.color} border-0 text-sm`}>
//         {estadoConfig.icon} {estado}
//       </Badge>
//     );
//   };

//   const FilesList = ({ files, title, icon: Icon }) => {
//     if (!files || files.length === 0) {
//       return (
//         <div className="text-center py-8 text-muted-foreground">
//           <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
//           <p>No hay {title.toLowerCase()}</p>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-3">
//         {files.map((file, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon className="h-5 w-5 text-primary" />
//               <div>
//                 <p className="font-medium text-sm">{file.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => window.open(file.url, "_blank")}
//                 className="h-8 px-3"
//               >
//                 <Eye className="h-4 w-4 mr-1" />
//                 Ver
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => {
//                   const link = document.createElement("a");
//                   link.href = file.url;
//                   link.download = file.name;
//                   link.click();
//                 }}
//                 className="h-8 px-3"
//               >
//                 <Download className="h-4 w-4 mr-1" />
//                 Descargar
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-xl font-semibold">
//               Solicitud: {solicitud.materia}
//             </DialogTitle>
//             {getEstadoBadge(solicitud.estado)}
//           </div>
//           <p className="text-sm text-muted-foreground">ID: {solicitud.id}</p>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Basic Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <FileCheck className="h-5 w-5" />
//                 Información General
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground">
//                     Tipo de Servicio
//                   </label>
//                   <p className="font-medium">{solicitud.tipoServicio}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground">
//                     Materia
//                   </label>
//                   <p className="font-medium">{solicitud.materia}</p>
//                 </div>
//               </div>

//               {solicitud.descripcion && (
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground">
//                     Descripción
//                   </label>
//                   <p className="mt-1 text-sm leading-relaxed">
//                     {solicitud.descripcion}
//                   </p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Fecha de Creación
//                     </label>
//                     <p className="text-sm">
//                       {formatDate(solicitud.created_at)}
//                     </p>
//                   </div>
//                 </div>
//                 {solicitud.updated_at && (
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <label className="text-sm font-medium text-muted-foreground">
//                         Última Actualización
//                       </label>
//                       <p className="text-sm">
//                         {formatDate(solicitud.updated_at)}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {solicitud.comentarios && (
//                 <>
//                   <Separator />
//                   <div>
//                     <label className="text-sm font-medium text-muted-foreground">
//                       Comentarios del Administrador
//                     </label>
//                     <p className="mt-1 text-sm leading-relaxed bg-muted/50 p-3 rounded-lg">
//                       {solicitud.comentarios}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </CardContent>
//           </Card>

//           {/* Files */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="h-5 w-5" />
//                   Documentos ({solicitud.documentos?.length || 0})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FilesList
//                   files={solicitud.documentos}
//                   title="Documentos"
//                   icon={FileText}
//                 />
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="h-5 w-5" />
//                   Anexos ({solicitud.anexos?.length || 0})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FilesList
//                   files={solicitud.anexos}
//                   title="Anexos"
//                   icon={FileText}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  FileCheck,
  Users,
} from "lucide-react";

const TIPOS_DOCUMENTO_LABELS = {
  carnet_extranjeria: "Carnet de extranjería",
  dni: "DNI",
  pasaporte: "Pasaporte",
  ruc: "RUC",
};

const ESTADOS = {
  Pendiente: { color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  "En revisión": { color: "bg-blue-100 text-blue-800", icon: "👁️" },
  Aprobada: { color: "bg-green-100 text-green-800", icon: "✅" },
  Rechazada: { color: "bg-red-100 text-red-800", icon: "❌" },
};

export function SolicitudViewer({ isOpen, onClose, solicitud }) {
  if (!solicitud) return null;

  console.log("solicitud", solicitud);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEstadoBadge = (estado) => {
    const estadoConfig = ESTADOS[estado] || ESTADOS["Pendiente"];
    return (
      <Badge className={`${estadoConfig.color} border-0 text-sm`}>
        {estadoConfig.icon} {estado}
      </Badge>
    );
  };

  const FilesList = ({ files, title, icon: Icon }) => {
    if (!files || files.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No hay {title.toLowerCase()}</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(file.url, "_blank")}
                className="h-8 px-3"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Button>
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = file.url;
                  link.download = file.name;
                  link.click();
                }}
                className="h-8 px-3"
              >
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PartiesList = ({ partes }) => {
    if (!partes || partes.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No hay partes procesales registradas</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {partes.map((parte, index) => (
          <div
            key={index}
            className="p-4 bg-muted/30 rounded-lg border border-muted"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant={parte.tipo === "Demandante" ? "default" : "secondary"}
                className="text-sm"
              >
                {parte.tipo}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="font-medium text-muted-foreground">
                  Nombres:
                </label>
                <p className="font-medium">{parte.nombres}</p>
              </div>
              <div>
                <label className="font-medium text-muted-foreground">
                  Apellidos:
                </label>
                <p className="font-medium">{parte.apellidos}</p>
              </div>
              <div>
                <label className="font-medium text-muted-foreground">
                  Tipo de Documento:
                </label>
                <p>
                  {TIPOS_DOCUMENTO_LABELS[parte.tipoDocumento] ||
                    parte.tipoDocumento}
                </p>
              </div>
              <div>
                <label className="font-medium text-muted-foreground">
                  Número de Documento:
                </label>
                <p className="font-mono">{parte.numeroDocumento}</p>
              </div>
              {parte.telefono && (
                <div>
                  <label className="font-medium text-muted-foreground">
                    Teléfono:
                  </label>
                  <p>{parte.telefono}</p>
                </div>
              )}
              {parte.email && (
                <div>
                  <label className="font-medium text-muted-foreground">
                    Email:
                  </label>
                  <p>{parte.email}</p>
                </div>
              )}
              {parte.direccion && (
                <div className="md:col-span-2">
                  <label className="font-medium text-muted-foreground">
                    Dirección:
                  </label>
                  <p>{parte.direccion}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Solicitud: {solicitud.materia}
            </DialogTitle>
            {getEstadoBadge(solicitud.estado)}
          </div>
          <p className="text-sm text-muted-foreground">ID: {solicitud.id}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tipo de Servicio
                  </label>
                  <p className="font-medium">{solicitud.tipoServicio}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Materia
                  </label>
                  <p className="font-medium">{solicitud.materia}</p>
                </div>
              </div>

              {solicitud.descripcion && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Descripción
                  </label>
                  <p className="mt-1 text-sm leading-relaxed">
                    {solicitud.descripcion}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Fecha de Creación
                    </label>
                    <p className="text-sm">
                      {formatDate(solicitud.created_at)}
                    </p>
                  </div>
                </div>
                {solicitud.updated_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Última Actualización
                      </label>
                      <p className="text-sm">
                        {formatDate(solicitud.updated_at)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {solicitud.comentarios && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Comentarios del Administrador
                    </label>
                    <p className="mt-1 text-sm leading-relaxed bg-muted/50 p-3 rounded-lg">
                      {solicitud.comentarios}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Partes Procesales ({solicitud.partesContratantes?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PartiesList partes={solicitud.partesContratantes} />
            </CardContent>
          </Card>

          {/* Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentos ({solicitud.documentos?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilesList
                  files={solicitud.documentos}
                  title="Documentos"
                  icon={FileText}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Anexos ({solicitud.anexos?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilesList
                  files={solicitud.anexos}
                  title="Anexos"
                  icon={FileText}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
