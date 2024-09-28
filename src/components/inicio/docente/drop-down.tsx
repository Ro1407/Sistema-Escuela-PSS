"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface Curso {
  id: number
  name: string
}

const cursos: Curso[] = [
  { id: 1, name: "Curso 1"},
  { id: 2, name: "Curso 2"},
  { id: 3, name: "Curso 3"},
  { id: 4, name: "Curso 4"},
]

export default function CursosDropdown() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso>(cursos[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center">
            <span>{cursoSeleccionado.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {cursos.map((curso) => (
          <DropdownMenuItem
            key={curso.id}
            onSelect={() => setCursoSeleccionado(curso)}
            className="flex items-center transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
          >
            {curso.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}