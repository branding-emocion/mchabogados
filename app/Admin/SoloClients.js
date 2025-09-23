import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import { use } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";

export default function SoloClientes({ user }) {
  console.log("user", user);
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image */}
      <div className="flex-1 relative">
        {/* TODO: Replace with your legal office image */}
        <Image
          src="/InicioCliente.jpg"
          alt="Legal office background"
          fill
          className="object-cover"
        />
        {/* Floating document cards overlay */}
        <div className="absolute inset-0 p-8">
          <div className="relative h-full">
            {/* Document cards */}
            <div className="absolute top-12 left-8 w-20 h-24 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2">
              <div className="space-y-1">
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
              </div>
            </div>

            <div className="absolute top-8 left-32 w-24 h-32 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3">
              <div className="space-y-1">
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
              </div>
            </div>

            <div className="absolute top-24 right-16 w-20 h-28 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2">
              <div className="space-y-1">
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/60 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
                <div className="h-1 bg-white/40 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Main interface */}
      <div className="flex-1 bg-slate-900 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and header */}
          <div className="text-center space-y-4">
            {/* TODO: Replace with your MCH ABOGADOS logo */}
            <div className="flex justify-center mb-4">
              <div className="   rounded-full flex items-center justify-center">
                <Image
                  src="/LOGO.png"
                  alt="logo"
                  width={372}
                  height={97}
                  className="object-cover"
                />{" "}
              </div>
            </div>
          </div>

          {/* Main title */}
          <div className="text-center space-y-2">
            <h2 className="text-[#b39306] text-3xl font-bold tracking-wider">
              MESA DE PARTES AURUS
            </h2>
            <p className="text-amber-400 text-lg uppercase">
              Bienvenido: {user?.displayName}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="space-y-4">
            <Link href="/Admin/Solicitudes" className="block">
              <Button className="w-full bg-[#b39306] hover:bg-amber-600 hover:cursor-pointer hover:text-white text-black font-semibold py-6 text-lg rounded-lg flex items-center justify-between">
                SOLICITUDES DE ARBITRAJE
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/Admin/Escritos" className="block">
              <Button
                variant="outline"
                className="w-full border-[#b39306] text-[#b39306] hover:cursor-pointer hover:text-white hover:bg-[#b39306]/10 font-semibold py-6 text-lg rounded-lg flex items-center justify-between bg-transparent"
              >
                ESCRITOS
                <div className="w-3 h-3 bg-[#b39306] rounded-full"></div>
              </Button>
            </Link>

            <Link href="/Admin/Expedientes" className="block">
              <Button
                variant="outline"
                className="w-full border-[#b39306] text-[#b39306] hover:cursor-pointer hover:text-white hover:bg-[#b39306]/10 font-semibold py-6 text-lg rounded-lg flex items-center justify-between bg-transparent"
              >
                EXPEDIENTES ARBITRALES
                <div className="w-3 h-3 bg-[#b39306] rounded-full"></div>
              </Button>
            </Link>
          </div>

          {/* Bottom buttons */}
          <div className="flex gap-4 pt-8">
            <Button
              onClick={() => signOut(auth)}
              variant="outline"
              className="flex-1 border-[#b39306] hover:text-white text-[#b39306] hover:bg-[#b39306]/10 py-6 bg-transparent uppercase"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#b39306] text-[#b39306] hover:cursor-pointer hover:text-white hover:bg-[#b39306]/10 py-6 bg-transparent"
            >
              <Settings className="w-4 h-4 mr-2" />
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
