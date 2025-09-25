"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Users,
  Save,
  X,
  Upload,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { nominaService } from "@/lib/NominaService";
import { Button } from "@/components/ui/button";

export default function NominaAdminDashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    cvFile: null,
    cvUrl: "",
    cvFileName: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadEmpleados();
    loadTotalEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      const result = await nominaService.getEmpleados(50, null, searchTerm);
      setEmpleados(result.empleados);
    } catch (error) {
      console.error("Error loading empleados:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTotalEmpleados = async () => {
    try {
      const total = await nominaService.getTotalEmpleados();
      setTotalEmpleados(total);
    } catch (error) {
      console.error("Error loading total empleados:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEmpleados();
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!editingEmpleado && !formData.cvFile) {
      errors.cvFile = "El CV es obligatorio";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (editingEmpleado) {
        await nominaService.updateEmpleado(editingEmpleado.id, {
          ...formData,
          oldCvUrl: editingEmpleado.cvUrl,
        });
      } else {
        await nominaService.addEmpleado(formData);
      }

      setIsModalOpen(false);
      setEditingEmpleado(null);
      setFormData({
        nombre: "",
        cvFile: null,
        cvUrl: "",
        cvFileName: "",
        apellido: "",
      });
      setFormErrors({});
      loadEmpleados();
      loadTotalEmpleados();
    } catch (error) {
      console.error("Error saving empleado:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (empleado) => {
    setEditingEmpleado(empleado);
    setFormData({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      cvFile: null,
      cvUrl: empleado.cvUrl || "",
      cvFileName: empleado.cvFileName || "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este empleado?")
    ) {
      try {
        await nominaService.deleteEmpleado(id);
        loadEmpleados();
        loadTotalEmpleados();
      } catch (error) {
        console.error("Error deleting empleado:", error);
      }
    }
  };

  const openAddModal = () => {
    setEditingEmpleado(null);
    setFormData({
      nombre: "",
      cvFile: null,
      cvUrl: "",
      cvFileName: "",
      apellido: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, cvFile: file });
      setFormErrors({ ...formErrors, cvFile: null });
    } else {
      alert("Por favor seleccione un archivo PDF válido");
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#a57f3e] shadow-sm border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Nómina</h1>
                <p className="text-white">
                  Total de empleados: {totalEmpleados}
                </p>
              </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openAddModal}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar normina de arbitros
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingEmpleado
                      ? "Editar arbitro"
                      : "Agregar Nuevo arbitro"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="apellido">Apellido *</Label>
                    <Input
                      id="apellido"
                      type="text"
                      value={formData.apellido}
                      onChange={(e) =>
                        setFormData({ ...formData, apellido: e.target.value })
                      }
                      className={formErrors.apellido ? "border-red-500" : ""}
                      placeholder="Ingrese el apellido completo"
                    />
                    {formErrors.apellido && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.apellido}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className={formErrors.nombre ? "border-red-500" : ""}
                      placeholder="Ingrese el nombre completo"
                    />
                    {formErrors.nombre && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvFile">CV (PDF) *</Label>
                    <div className="space-y-2">
                      <Input
                        id="cvFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className={formErrors.cvFile ? "border-red-500" : ""}
                      />
                      {formData.cvFileName && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Upload className="h-4 w-4 mr-2" />
                          Archivo actual: {formData.cvFileName}
                        </div>
                      )}
                      {formErrors.cvFile && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.cvFile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {submitting ? "Guardando..." : "Guardar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearchSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o archivo CV..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <Button type="submit" variant="outline">
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Empleados Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Empleados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando empleados...</p>
              </div>
            ) : empleados.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No se encontraron empleados</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apellidos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CV
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {empleados.map((empleado, index) => (
                      <tr key={empleado.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {empleado.apellido}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {empleado.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {empleado.cvUrl ? (
                            <a
                              href={empleado.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              {empleado.cvFileName || "CV.pdf"}
                            </a>
                          ) : (
                            <span className="text-gray-400">Sin CV</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(empleado.fechaCreacion)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(empleado)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(empleado.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
