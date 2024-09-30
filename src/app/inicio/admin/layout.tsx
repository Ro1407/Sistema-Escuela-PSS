
import AdminOptions from "@/components/inicio/admin/AdminOptions";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {Alumno} from "@/lib/definitions"
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
          <span className="mr-4 font-medium">{nombre}</span>
          <Button variant="outline">Administrativo</Button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

