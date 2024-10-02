
import AdminOptions from "@/components/inicio/admin/AdminOptions";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {Alumno} from "@/lib/definitions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
export const metadata: Metadata = {
  title: 'Administrar',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const nombre = "Rodrigo Perez"
  const currentDate = new Date().toLocaleDateString('es', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="flex h-screen fixed w-screen overflow-hidden">
      <aside className="w-64 bg-gray-100 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
        <p className="mb-6 text-gray-600">{currentDate}</p>
        <AdminOptions />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <div className="flex items-center space-x-2">
                  <p>Nombre admin</p>
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
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

