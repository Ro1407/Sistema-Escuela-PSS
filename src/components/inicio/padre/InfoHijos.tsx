'use client'

import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function InfoHijos() {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const hijo = searchParams.get('hijo')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Información del Hijo/s</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Link
            href={`/inicio/padre/amonestaciones${hijo ? `?hijo=${hijo}` : ''}`}
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
            href={`/inicio/padre/boletines${hijo ? `?hijo=${hijo}` : ''}`}
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
            href={`/inicio/padre/notas${hijo ? `?hijo=${hijo}` : ''}`}
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
            href={`/inicio/padre/asistencias${hijo ? `?hijo=${hijo}` : ''}`}
            className={clsx(
              "w-full gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer",
              pathname === '/inicio/padre/asistencias' ? 'bg-blue-700 text-white' : 'bg-white'
            )}
          >
            Asistencias
          </Link>
        </DropdownMenuItem >
        <DropdownMenuItem asChild><Link
          href={`/inicio/padre/trabajos-practicos${hijo ? `?hijo=${hijo}` : ''}`}
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