import { Metadata } from "next"
import CursosDropdown from "@/components/inicio/docente/drop-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Title from "@/components/inicio/Title";
import InfoCurso from "@/components/inicio/docente/InfoCurso";
import LogoutButton from "@/components/inicio/LogoutButton";
import { fetchUserSession } from "@/lib/actions";
import { getDocente } from "../../../../prisma/services/docente.service";
import { redirect } from "next/navigation";

const metadata: Metadata = {
  title: 'Inicio Docente',
}

export default async function Layout({ children }: { children: React.ReactNode }) {

  const session = await fetchUserSession()

  if (!session || session.rol !== 'DOCENTE') {
    redirect('/login')
  }
  const userId = session?.id
  const docente = await getDocente(userId as string)

  return (
    <div className="h-screen flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <Title />
        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <div className="flex items-center space-x-2">
                  <p>{docente?.nombre + " " + docente?.apellido}</p>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CursosDropdown />
        </div>
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
