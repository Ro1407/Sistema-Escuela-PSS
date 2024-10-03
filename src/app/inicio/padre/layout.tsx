'use client'

import { Metadata } from "next"
import HijosDropdown from "@/components/inicio/padre/drop-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const metadata: Metadata = {
  title: 'Inicio Padre',
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

    return (lastSegment === "Padre" ? "Inicio" : lastSegment);
  };

  return (
    <div className="h-screen flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{getTitle()}</h2>
          <h2 className="text-md">{fechaActual}</h2>
        </div>
        <HijosDropdown />
      </div>
      <main className="flex-1 overflow-auto p-6">{children}</main>
      <div className="flex flex-col mt-auto">
        <div className="flex flex-row justify-between">
          <InfoHijos />
          <Button variant="outline">Mensajes</Button>
        </div>
      </div>
    </div>
  );
}

function InfoHijos() {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Información del Hijo/s</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/padre/amonestaciones"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/padre/amonestaciones' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Amonestaciones
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/padre/boletines"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/padre/boletines' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Boletines
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/padre/notas"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/padre/notas' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Notas Exámenes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/inicio/padre/asistencias"
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/padre/asistencias' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Asistencias
          </Link>
        </DropdownMenuItem >
        <DropdownMenuItem asChild><Link
          href="/inicio/padre/trabajos-practicos"
          className={clsx(
            "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
            pathname === '/inicio/padre/trabajos-practicos' ? 'bg-blue-700 text-white' : 'bg-white'
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