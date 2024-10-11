'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminOptions() {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Link
        href="/inicio/admin"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}
        >
        Crear Usuario
      </Link>
      <Link
        href="/inicio/admin/modificar_usuario"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin/modificar_usuario' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}>
        Modificar Usuario
      </Link>
      <Link
        href="/inicio/admin/crear_cursado"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin/crear_cursado' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}>
        Crear Cursado
      </Link>
      <Link
        href="/inicio/admin/modificar_cursado"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin/modificar_cursado' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}>
        Modificar Cursado
      </Link>
    </div>
  )
}