import { Metadata } from "next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button" 

const metadata: Metadata = {
  title: 'Inicio Padre',
}

export default async function InicioPadrePage() {
  let nombre = "Nombre del padre"
  return (
    <>
       <InicioPadre nombre={nombre} />
    </>
  );
}

function InicioPadre({ nombre }: { nombre: string }) {
  const fechaActual = formatearFecha(new Date())
  return (
    <div className="h-screen flex flex-col p-5">
      <div className = "flex flex-row justify-between">
        <div className = "flex flex-col items-center">
          <h2 className="text-3xl font-semibold">Titulo Página</h2>
          <h2 className="text-md">{fechaActual}</h2>
        </div>
        <h2 className="text-xl">{nombre}</h2>
      </div>
      <div className="flex flex-col mt-auto">
        <div className = "flex flex-row justify-between">
          <InfoHijos />
          <Button variant="outline">Mensajes</Button>
        </div>
      </div>
    </div>
  );
}

async function InfoHijos(){
  return(
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Información del Hijo/s</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Amonestaciones</DropdownMenuItem>
    <DropdownMenuItem>Boletines</DropdownMenuItem>
    <DropdownMenuItem>Notas Exámenes</DropdownMenuItem>
    <DropdownMenuItem>Asistencias</DropdownMenuItem>
    <DropdownMenuItem>Trabajos Practicos</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

function formatearFecha(fecha : Date){
  const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11, así que se suma 1
  const año = fecha.getFullYear();
  // Construye la fecha en el formato dd/mm/aaaa
  const fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada
}