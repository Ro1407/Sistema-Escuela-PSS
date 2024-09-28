'use client'

import { Metadata } from "next"
import CursosDropdown from "@/components/inicio/docente/drop-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const metadata: Metadata = {
  title: 'Inicio Docente',
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

    return (lastSegment === "Docente" ? "Inicio" : lastSegment);
  };

  return (
    <div className="h-screen flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{getTitle()}</h2>
          <h2 className="text-md">{fechaActual}</h2>
        </div>
        <CursosDropdown />
      </div>
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
      <div className="flex flex-col mt-auto">
        <div className="flex flex-row justify-between">
          <InfoCurso />
          <Button variant="outline">Mensajes</Button>
        </div>
      </div>
    </div>
  );
}

function InfoCurso() {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" > Información del curso</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/docente/trabajos-practicos"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/docente/trabajos-practicos' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Trabajos Prácticos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/docente/notas"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/docente/notas' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Notas Exámenes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/docente/asistencias"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/docente/asistencias' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Asistencias
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/docente/amonestaciones"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/docente/amonestaciones' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Amonestaciones
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/docente/boletines"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/docente/boletines' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Boletines
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