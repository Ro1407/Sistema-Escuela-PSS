import { Metadata } from "next"
import HijosDropdown from "@/components/inicio/padre/drop-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Title from "@/components/inicio/Title";
import InfoHijos from "@/components/inicio/padre/InfoHijos";
import { fetchUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { getPadre } from "../../../../prisma/services/padre.service";
import LogoutButton from "@/components/inicio/LogoutButton";

const metadata: Metadata = {
  title: 'Inicio Padre',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await fetchUserSession()

  if (!session || session.rol !== 'PADRE') {
    redirect('/login')
  }
  const userId = session?.id
  const padre = await getPadre(userId as string)

  return (
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
          <HijosDropdown />
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
  );
}

