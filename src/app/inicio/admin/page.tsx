import { Button } from "@/components/ui/button";
import { Metadata } from "next";

const metadata: Metadata = {
  title: 'Inicio Admin',
}

export default async function InicioAdminPage() {
  const nbre = "Rodrigo Perez"
  return (
    <>
      <InicioAdmin nombre = {nbre}/>
    </>
  );
}

async function InicioAdmin({nombre} : {nombre:string}) {
  return (
    <div className = "p-5">
      <div className="flex flex-row justify-end">
        <div className="flex flex-col items-center">
          {nombre}
          <Button variant="outline">Administrativo</Button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-2 ml-10">
          <div className = "flex flex-row space-x-2">
            <Button variant="outline">Docente</Button>
            <Button variant="outline">Alumno</Button>
            <Button variant="outline">Padres</Button>
          </div>
          <div className = "flex flex-row space-x-2">
            <Button variant="outline">Alta Usuario</Button>
            <Button variant="outline">Baja Usuario</Button>
            <Button variant="outline">Modificación Usuario</Button>
          </div>
        </div>
      </div>
    </div>
  )
}