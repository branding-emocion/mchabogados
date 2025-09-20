"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileTextIcon } from "lucide-react";
import useAuthState from "@/lib/useAuthState";
import { auth, db } from "@/firebase/firebaseClient";

export function EscritosDataTable() {
  const [{ user }, loading] = useAuthState(auth);
  const [escritos, setEscritos] = useState([]);
  const [expedientes, setExpedientes] = useState([]);
  const [filteredEscritos, setFilteredEscritos] = useState([]);
  const [selectedExpediente, setSelectedExpediente] = useState("all"); // Updated default value
  const [dateFilter, setDateFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load expedientes for filter
  useEffect(() => {
    if (!user?.email) return;

    const loadExpedientes = async () => {
      try {
        const q = query(
          collection(db, "expedientes"),
          where("correos", "array-contains", user.email)
        );
        const snapshot = await getDocs(q);
        const expedientesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpedientes(expedientesData);
      } catch (error) {
        console.error("Error loading expedientes:", error);
      }
    };

    loadExpedientes();
  }, [user]);

  // Load escritos
  useEffect(() => {
    if (!user?.email) return;

    const loadEscritos = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, "escritos"),
          where("userEmail", "==", user.email),
          orderBy("fechaCreacion", "desc")
        );
        const snapshot = await getDocs(q);
        const escritosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEscritos(escritosData);
        setFilteredEscritos(escritosData);
      } catch (error) {
        console.error("Error loading escritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEscritos();
  }, [user]);

  // Apply filters
  useEffect(() => {
    let filtered = [...escritos];

    if (selectedExpediente !== "all") {
      filtered = filtered.filter(
        (escrito) => escrito.expedienteId === selectedExpediente
      );
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((escrito) => {
        const escritoDate = new Date(escrito.fechaCreacion.toDate());
        return escritoDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredEscritos(filtered);
  }, [escritos, selectedExpediente, dateFilter]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getExpedienteNumber = (expedienteId) => {
    const expediente = expedientes.find((exp) => exp.id === expedienteId);
    return expediente?.numero || expedienteId;
  };

  if (loading || isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Historial de Escritos
        </CardTitle>

        {/* Filters */}
        <div className="flex gap-4 mt-4">
          <Select
            value={selectedExpediente}
            onValueChange={setSelectedExpediente}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por expediente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los expedientes</SelectItem>{" "}
              {/* Updated value prop */}
              {expedientes.map((expediente) => (
                <SelectItem key={expediente.id} value={expediente.id}>
                  {expediente.numero}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-[200px]"
            placeholder="Filtrar por fecha"
          />
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>N° Expediente</TableHead>
              <TableHead>N° Escrito</TableHead>
              <TableHead>Parte Procesal</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Documentos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEscritos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron escritos
                </TableCell>
              </TableRow>
            ) : (
              filteredEscritos.map((escrito) => (
                <TableRow key={escrito.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      {formatDate(escrito.fechaCreacion)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getExpedienteNumber(escrito.expedienteId)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {escrito.numeroEscrito}
                  </TableCell>
                  <TableCell>{escrito.parteProcesal}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {escrito.descripcion || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {escrito.documentos?.length || 0} archivos
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
