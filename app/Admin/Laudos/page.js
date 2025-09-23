"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { laudosService } from "@/lib/LaudosService";

export default function AdminDashboard() {
  const [laudos, setLaudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLaudo, setEditingLaudo] = useState(null);
  const [formData, setFormData] = useState({
    contratista: "",
    entidad: "",
    controversia: "",
    laudo: null,
  });

  useEffect(() => {
    loadLaudos();
  }, []);

  const loadLaudos = async () => {
    try {
      setLoading(true);
      const laudosData = await laudosService.getAllLaudos();
      setLaudos(laudosData);
    } catch (error) {
      console.error("Error cargando laudos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLaudos = laudos.filter(
    (laudo) =>
      laudo.contratista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.entidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.controversia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLaudo = async () => {
    try {
      await laudosService.addLaudo(
        {
          contratista: formData.contratista,
          entidad: formData.entidad,
          controversia: formData.controversia,
        },
        formData.laudo
      );

      await loadLaudos();
      setFormData({
        contratista: "",
        entidad: "",
        controversia: "",
        laudo: null,
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error agregando laudo:", error);
      alert("Error al agregar el laudo");
    }
  };

  const handleEditLaudo = async () => {
    try {
      await laudosService.updateLaudo(
        editingLaudo.id,
        {
          contratista: formData.contratista,
          entidad: formData.entidad,
          controversia: formData.controversia,
        },
        formData.laudo
      );

      await loadLaudos();
      setFormData({
        contratista: "",
        entidad: "",
        controversia: "",
        laudo: null,
      });
      setIsEditModalOpen(false);
      setEditingLaudo(null);
    } catch (error) {
      console.error("Error editando laudo:", error);
      alert("Error al editar el laudo");
    }
  };

  const handleDeleteLaudo = async (laudo) => {
    try {
      await laudosService.deleteLaudo(laudo.id, laudo.pdfFileName);
      await loadLaudos();
    } catch (error) {
      console.error("Error eliminando laudo:", error);
      alert("Error al eliminar el laudo");
    }
  };

  const openEditModal = (laudo) => {
    setEditingLaudo(laudo);
    setFormData({
      contratista: laudo.contratista,
      entidad: laudo.entidad,
      controversia: laudo.controversia,
      laudo: null,
    });
    setIsEditModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, laudo: file });
  };

  const handleDownload = (laudo) => {
    if (laudo.pdfUrl) {
      window.open(laudo.pdfUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="text-lg">Cargando laudos...</div>
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="    ">
        <header className="bg-[#a57f3e]  shadow-md">
          <div className="container  w-full  mx-auto px-5 py-11 flex items-center justify-between ">
            <h1 className="text-4xl font-bold text-white tracking-wide uppercase ">
              Banco de Laudos{" "}
            </h1>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 "
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Laudo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Laudo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contratista">Contratista</Label>
                    <Input
                      id="contratista"
                      value={formData.contratista}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contratista: e.target.value,
                        })
                      }
                      placeholder="Nombre del contratista"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entidad">Entidad</Label>
                    <Input
                      id="entidad"
                      value={formData.entidad}
                      onChange={(e) =>
                        setFormData({ ...formData, entidad: e.target.value })
                      }
                      placeholder="Nombre de la entidad"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="controversia">Controversia</Label>
                    <Textarea
                      id="controversia"
                      value={formData.controversia}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          controversia: e.target.value,
                        })
                      }
                      placeholder="Descripción de la controversia"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="laudo">Archivo PDF del Laudo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="laudo"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddLaudo}
                    className="bg-blue-700 hover:bg-blue-800"
                  >
                    Agregar Laudo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        {/* Controles */}

        {/* Tabla */}
        <div className="container py-4 mx-auto  rounded-lg shadow overflow-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar laudos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contratista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Controversia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Laudo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLaudos.map((laudo, index) => (
                  <tr key={laudo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {laudo.contratista}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {laudo.entidad}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {laudo.controversia}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {laudo.fechaCreacion
                        ? laudo.fechaCreacion.toLocaleDateString("es-ES")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#a5803d] hover:text-blue-800"
                        onClick={() => handleDownload(laudo)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Descargar PDF
                      </Button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(laudo)}
                          className="text-[#a5803d] hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará
                                permanentemente el laudo del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteLaudo(laudo)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Laudo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-contratista">Contratista</Label>
                <Input
                  id="edit-contratista"
                  value={formData.contratista}
                  onChange={(e) =>
                    setFormData({ ...formData, contratista: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-entidad">Entidad</Label>
                <Input
                  id="edit-entidad"
                  value={formData.entidad}
                  onChange={(e) =>
                    setFormData({ ...formData, entidad: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-controversia">Controversia</Label>
                <Textarea
                  id="edit-controversia"
                  value={formData.controversia}
                  onChange={(e) =>
                    setFormData({ ...formData, controversia: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-laudo">Nuevo Archivo PDF (opcional)</Label>
                <Input
                  id="edit-laudo"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditLaudo}
                className="bg-blue-700 hover:bg-blue-800"
              >
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
