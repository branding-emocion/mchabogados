"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const ModalUsuarios = ({ OpenModal, setOpenModal }) => {
  const [InputValues, setInputValues] = useState({});
  const [Loading, setLoading] = useState(false);

  console.log("OpenModal", OpenModal);

  const closeModal = () => {
    setOpenModal({
      Visible: false,
      InfoEditar: {},
    });
    setInputValues({});
  };

  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value) => {
    setInputValues({
      ...InputValues,
      role: value,
    });
  };

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!Object.keys(InputValues).length) {
        toast({
          title: "Alerta",
          description: "No hay información para editar",
        });
        return;
      }

      const endpoint = "/api/Usuario";
      const method = OpenModal?.InfoEditar?.uid ? "PUT" : "POST";

      const Send = {
        uid: OpenModal?.InfoEditar?.uid,
        ...InputValues,
      };

      console.log("method", method);

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Send),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast("Error Interno");
        return;
      }

      toast(responseData.body);
      setInputValues({});
      closeModal();
    } catch (err) {
      console.error("Error:", err);
      toast("Contacte con soporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={OpenModal?.Visible} onOpenChange={closeModal}>
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModal?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            un usuario
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreCompleto" className="">
                Nombre Completo
              </Label>
              <Input
                id="NombreCompleto"
                name="NombreCompleto"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModal?.InfoEditar?.displayName}
                required={OpenModal?.InfoEditar?.uid ? false : true}
                autoComplete="off"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Correo" className="">
                Correo
              </Label>
              <Input
                id="Correo"
                name="Correo"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModal?.InfoEditar?.email}
                required={OpenModal?.InfoEditar?.uid ? false : true}
                autoComplete="off"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Pass" className="">
                Contraseña
              </Label>
              <Input
                id="Pass"
                name="Pass"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModal?.InfoEditar?.password}
                required={OpenModal?.InfoEditar?.uid ? false : true}
                autoComplete="off"
                type="text"
                pattern=".{6,}"
                title="6 caracteres mínimo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="">
                Tipo de Usuario
              </Label>
              <Select
                onValueChange={handleRoleChange}
                defaultValue={OpenModal?.InfoEditar?.role || "cliente"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="superAdmin">
                    Super Administrador
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            disabled={Loading}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUsuarios;
