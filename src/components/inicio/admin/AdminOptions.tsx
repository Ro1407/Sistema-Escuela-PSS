'use client'

import { Button } from "@/components/ui/button"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminOptions() {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Link
        href="/incio/admin"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}
        >
        Crear Usuario
      </Link>
      <Link
        href="/incio/admin/modificar"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin/modificar' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}>
        Modificar Usuario
      </Link>
      <Link
        href="/incio/admin/cursado"
        className={clsx(
          "w-full gap-3 rounded-lg px-3 py-2 text-white text-sm",
          pathname === '/inicio/admin/cursado' ? 'bg-blue-700 text-white' : 'bg-gray-900'
        )}>
        Crear Cursado
      </Link>
    </div>
  )
}