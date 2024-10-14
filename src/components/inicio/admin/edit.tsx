'use client'

import EditUserForm from "@/components/inicio/admin/edit-user-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchUser } from "@/lib/actions"
import { User } from "@/lib/definitions"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { Curso, Materia } from "../../../../prisma/interfaces"


export default function Edit( { materias, cursos }: { materias: Materia[], cursos: Curso[] }) {
	const [userType, setUserType] = useState('')
  const [dni, setDni] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [mensajeUsuario, setMensajeUsuario] = useState('')

	const handleSearch = async (event: any) => {
    event.preventDefault()
		setMensajeUsuario('')
		setUser(null)
    if (userType && dni) {
      const result = await searchUser(userType, dni)
      if (result) {
        setUser(result)
      } else {
        setMensajeUsuario('Usuario no encontrado')
      }
    }
  }

	const handleUserChange = (value: string) => {
		setUserType(value)
		setUser(null)
	}

	return (
		<div className="flex flex-col p-5 align-center h-full">
			<form className="flex gap-6" onSubmit={handleSearch}>
				<div className="flex w-2/6">
					<Label className="mr-2 mt-2 w-48" htmlFor="userType">Tipo de Usuario: *</Label>
					<Select name="userType" required onValueChange={(value) => handleUserChange(value)}>
						<SelectTrigger id="userType" className="w-full">
							<SelectValue placeholder="Seleccione un tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="padre">Padre</SelectItem>
							<SelectItem value="alumno">Alumno</SelectItem>
							<SelectItem value="docente">Docente</SelectItem>
							<SelectItem value="administrador">Administrador</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-4/6 max-w-3xl mx-auto">
					<div className="flex flex-col sm:flex-row items-center gap-2">
						<label htmlFor="search" className="text-sm font-medium text-muted-foreground whitespace-nowrap mb-2 sm:mb-0">
							Buscar usuario:
						</label>
						<div className="relative w-4/5">
							<Input
								id="search"
                placeholder="Ingrese el DNI del usuario"
                className="w-full pr-10"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
							/>
							<Button
								type="submit"
								size="sm"
								className="absolute right-0 top-0 h-full rounded-l-none"
							>
								<SearchIcon className="h-4 w-4" />
								<span className="sr-only">Buscar usuario</span>
							</Button>
							
						</div>
					</div>
					{mensajeUsuario && <p className="text-red-500 text-center">{mensajeUsuario}</p>}
				</div>
			</form >
			{user && <EditUserForm user={user} materias={materias} cursos={cursos} setUser={setUser} />}
		</div >
	)
}