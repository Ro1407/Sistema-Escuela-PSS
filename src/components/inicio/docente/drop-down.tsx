"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Curso } from "../../../../prisma/interfaces"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { useStateContext } from "./stateContext"

interface CursosDropdownProps {
  cursos: Curso[] | undefined;
}

export default function CursosDropdown({cursos}: CursosDropdownProps) {
	console.log("CURSOS DROP DOWN: ", cursos)
  const router = useRouter()
  const searchParams = useSearchParams()
	const {cursoSeleccionado, setCursoSeleccionado} = useStateContext()

  // Update URL when a course is selected
  const handleCursoSelect = useCallback((curso: Curso) => {
    setCursoSeleccionado(curso)
    const params = new URLSearchParams(searchParams.toString())
    params.set('curso', curso.id.toString())
    router.push(`?${params.toString()}`)
  }, [router, searchParams, setCursoSeleccionado])

  // Set initial state based on URL params
  useEffect(() => {
    const cursoId = searchParams.get('curso')
    if (cursoId && cursos) {
      const curso = cursos.find(c => c.id.toString() === cursoId)
      if (curso) {
        setCursoSeleccionado(curso)
      }
    }
  }, [cursos, searchParams, setCursoSeleccionado])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center">
            <span>
              {cursoSeleccionado ? (
                cursoSeleccionado.nombre
              ) : (
                "Seleccione un curso"
              )}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {cursos?.map((curso) => (
          <DropdownMenuItem
            key={curso.id}
            onSelect={() => handleCursoSelect(curso)}
            className="flex items-center transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
          >
            {curso.nombre}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}