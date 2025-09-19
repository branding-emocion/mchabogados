import ExpedientesModule from "./ExpedientesModule";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Sistema de Gestión de Expedientes
      </h1>
      <ExpedientesModule />
    </div>
  );
}
