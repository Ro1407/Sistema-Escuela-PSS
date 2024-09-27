import { Button } from "@/components/ui/button";
import { Metadata } from "next";

const metadata: Metadata = {
  title: 'Inicio Alumno',
}

export default async function InicioAlumnoPage() {
  const nbre = "Lautaro Gonzales"
  return (
    <>
      <InicioAlumno nombre = {nbre}/>
    </>
  );
}

async function InicioAlumno({nombre} : {nombre:string}) {
  return (
    <div className = "p-5">
      <div className="flex flex-row justify-end">
        <div className="flex flex-col">
          {nombre}
          <Button variant="outline">Alumno</Button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-2 ml-10">
          <Button variant="outline">Visualizar Amonestaciones</Button>
          <Button variant="outline">Boletines</Button>
          <Button variant="outline">Notas de Examenes</Button>
          <Button variant="outline">Mensajeria</Button>
          <Button variant="outline">Visualizar asistencia</Button>
          <Button variant="outline">Materias</Button>
        </div>
      </div>
    </div>
  )
}