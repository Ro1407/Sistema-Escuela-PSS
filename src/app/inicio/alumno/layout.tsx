'use client'

import { Metadata } from "next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const metadata: Metadata = {
  title: 'Inicio Alumno',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const fechaActual = formatearFecha(new Date())
  const pathname = usePathname();

  const getTitle = () => {
    const segments = pathname.split('/');
    var lastSegment = segments[segments.length - 1];

    // Eliminar guiones y poner la primera letra en mayúscula
    lastSegment = lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (lastSegment === "Alumno" ? "Inicio" : lastSegment);
  };

  return (
    <div className="h-screen flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{getTitle()}</h2>
          <h2 className="text-md">{fechaActual}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="flex items-center space-x-2">
                <p>Nombre alumno</p>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Button variant="outline" size="sm" className="cursor-pointer border-none w-full">Cerrar Sesión</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
      <div className="flex flex-col mt-auto">
        <div className="flex flex-row justify-between">
          <InfoEscolar />
          <Button variant="outline">Mensajes</Button>
        </div>
      </div>
    </div>
  );
}

function InfoEscolar() {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Información Escolar</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/alumno/amonestaciones"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/alumno/amonestaciones' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Amonestaciones
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/alumno/boletines"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/alumno/boletines' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Boletines
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/alumno/notas"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/alumno/notas' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Notas Exámenes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/alumno/asistencias"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/alumno/asistencias' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Asistencias
          </Link>
        </DropdownMenuItem >
        <DropdownMenuItem asChild><Link
          href="/inicio/alumno/trabajos-practicos"
          className={clsx(
            "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
            pathname === '/inicio/alumno/trabajos-practicos' ? 'bg-blue-700 text-white' : 'bg-white'
          )}
        >
          Trabajos Prácticos
        </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function formatearFecha(fecha: Date) {
  const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11, así que se suma 1
  const año = fecha.getFullYear();
  // Construye la fecha en el formato dd/mm/aaaa
  const fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada
}