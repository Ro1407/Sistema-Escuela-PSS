'use client'

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function InfoCurso() {
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