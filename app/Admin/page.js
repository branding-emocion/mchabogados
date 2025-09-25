"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";
import { FileText, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  const [{ user, claims }, loading, error] = useAuthState(auth);

  return (
    <main className="flex-1 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Bienvenido, {user?.displayName}
          </h2>
          <p className="text-lg text-slate-600">
            Plataforma Digital - MC Abogados
          </p>
        </div>

        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Su Confianza, Nuestro Compromiso
            </h3>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Bienvenido a nuestra plataforma digital. Gestione sus escritos y
              solicitudes de manera segura y eficiente.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/Admin/Escritos">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-amber-600 text-white h-16 text-lg font-semibold hover:cursor-pointer"
                >
                  <FileText className="w-6 h-6 mr-3" />
                  Acceder a Escritos
                </Button>
              </Link>
              <Link href="/Admin/Solicitudes">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-amber-600 text-white h-16 text-lg font-semibold hover:cursor-pointer"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Ver Solicitudes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
