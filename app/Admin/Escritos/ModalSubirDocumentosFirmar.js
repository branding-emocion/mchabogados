// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Upload, Download, CheckCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, updateDoc } from "firebase/firestore";
// import { db, storage } from "@/firebase/firebaseClient";

// export default function ModalSubirDocumentosFirmar({
//   expediente,
//   onClose,
//   isOpen,
// }) {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setUploading(true);
//     try {
//       // 📂 Subir a Firebase Storage
//       const storageRef = ref(
//         storage,
//         `expedientes/firmados/${Date.now()}-${file.name}`
//       );
//       await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(storageRef);

//       // 📌 Actualizar en Firestore
//       const docRef = doc(db, "expedientes", expediente.id);
//       await updateDoc(docRef, {
//         estado: "FIRMADO",
//         documentosFirmados: [
//           ...(expediente.documentosFirmados || []),
//           { name: file.name, url, size: file.size, type: file.type },
//         ],
//       });

//       alert("Documento subido y estado actualizado ✅");
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert("Error al subir el documento ❌");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogTrigger asChild>
//         <Button variant="default">📑 Documentos</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Documentos para firmar</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           {/* Lista de documentos para firmar */}
//           <div>
//             <h3 className="font-semibold mb-2">Pendientes:</h3>
//             <ul className="space-y-2">
//               {expediente.documentosParaFirmar?.map((doc, i) => (
//                 <li
//                   key={i}
//                   className="flex justify-between items-center border rounded-lg p-2"
//                 >
//                   <span>{doc.name}</span>
//                   <a
//                     href={doc.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-blue-600 hover:underline"
//                   >
//                     <Download size={16} /> Descargar
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Subir documento firmado */}
//           <div>
//             <h3 className="font-semibold mb-2">Subir documento firmado:</h3>
//             <Input
//               type="file"
//               onChange={handleFileChange}
//               accept="application/pdf,image/*"
//             />
//             <Button
//               onClick={handleUpload}
//               disabled={!file || uploading}
//               className="mt-2 w-full"
//             >
//               {uploading ? (
//                 "Subiendo..."
//               ) : (
//                 <>
//                   <Upload size={16} /> Subir y Firmar
//                 </>
//               )}
//             </Button>
//           </div>

//           {/* Estado actual */}
//           <div className="flex items-center gap-2 mt-4">
//             <CheckCircle
//               className={
//                 expediente.estado === "FIRMADO"
//                   ? "text-green-500"
//                   : "text-yellow-500"
//               }
//             />
//             <span>Estado: {expediente.estado}</span>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";

export default function ModalSubirDocumentosFirmar({
  expediente,
  onClose,
  isOpen,
}) {
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const handleUpload = async (file, index) => {
    if (!file) return;
    setUploadingIndex(index);
    try {
      // 📂 Subir archivo a Firebase Storage
      const storageRef = ref(
        storage,
        `expedientes/firmados/${expediente.id}/${Date.now()}-${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // 📌 Actualizar Firestore: marcar solo el documento correspondiente como firmado
      const updatedDocs = expediente.documentosParaFirmar.map((doc, i) =>
        i === index
          ? { ...doc, firmado: true, firmadoUrl: url, firmadoName: file.name }
          : doc
      );

      // 📌 Revisar si todos están firmados
      const allSigned = updatedDocs.every((d) => d.firmado);

      const docRef = doc(db, "expedientes", expediente.id);
      await updateDoc(docRef, {
        documentosParaFirmar: updatedDocs,
        estado: allSigned ? "FIRMADO" : "PENDIENTE_FIRMA",
      });

      alert(
        allSigned
          ? "Todos los documentos fueron firmados ✅"
          : "Documento firmado ✅"
      );
    } catch (err) {
      console.error(err);
      alert("Error al subir el documento ❌");
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="default">📑 Documentos</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Documentos para firmar</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lista de documentos */}
          <ul className="space-y-4">
            {expediente.documentosParaFirmar?.map((doc, i) => (
              <li key={i} className="border rounded-lg p-3 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{doc.name}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Download size={16} /> Descargar
                  </a>
                </div>

                {doc.firmado ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={18} />
                    <a
                      href={doc.firmadoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {doc.firmadoName}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleUpload(e.target.files[0], i)
                      }
                      disabled={uploadingIndex === i}
                    />
                    {uploadingIndex === i && (
                      <span className="text-sm text-gray-500">Subiendo...</span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Estado general */}
          <div className="flex items-center gap-2">
            <CheckCircle
              className={
                expediente.estado === "FIRMADO"
                  ? "text-green-500"
                  : "text-yellow-500"
              }
            />
            <span>Estado: {expediente.estado}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
