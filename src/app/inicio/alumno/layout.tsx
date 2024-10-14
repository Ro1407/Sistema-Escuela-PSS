import { Metadata } from "next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LogoutButton from "@/components/inicio/LogoutButton";
import Title from "@/components/inicio/Title";
import InfoEscolar from "@/components/inicio/alumno/InfoEscolar";
import { fetchUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { getAlumno } from "../../../../prisma/services/alumno.service";

const metadata: Metadata = {
  title: 'Inicio Alumno',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await fetchUserSession()

  if (!session || session.rol !== 'ALUMNO') {
    redirect('/login')
  }
  const userId = session?.id
  const alumno = await getAlumno(userId as string)
  return (
    <div className="h-screen flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <Title />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="flex items-center space-x-2">
                <p>{alumno?.nombre + " " + alumno?.apellido}</p>
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



