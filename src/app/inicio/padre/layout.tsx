import LogoutButton from "@/components/inicio/LogoutButton";
import Title from "@/components/inicio/Title";
import InfoHijos from "@/components/inicio/padre/InfoHijos";
import HijosDropdown from "@/components/inicio/padre/drop-down";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUserSession } from "@/lib/actions";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPadreConAlumnos } from "../../../../prisma/services/padre.service";
import { StateProvider } from "@/components/inicio/padre/stateContext";

const metadata: Metadata = {
  title: 'Inicio Padre',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await fetchUserSession()

  if (!session || session.rol !== 'PADRE') {
    redirect('/login')
  }
  const userId = session?.id
  const padre = await getPadreConAlumnos(userId as string)

  return (
    <StateProvider>
      <div className="h-screen flex flex-col p-5">
        <div className="flex flex-row justify-between">
          <Title />
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <div className="flex items-center space-x-2">
                    <p>{padre?.nombre + " " + padre?.apellido}</p>
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
            <HijosDropdown hijos={padre?.hijos} />
          </div>
        </div>
        <main className="flex-1 overflow-auto p-6">{children}</main>
        <div className="flex flex-col mt-auto">
          <div className="flex flex-row justify-between">
            <InfoHijos />
            <Button variant="outline">Mensajes</Button>
          </div>
        </div>
      </div>
    </StateProvider>
  );
}

