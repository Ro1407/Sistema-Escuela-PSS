"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Alumno } from "../../../../prisma/interfaces"
import { useRouter, useSearchParams } from "next/navigation"
import { useStateContext } from "./stateContext"

export default function HijosDropdown( {hijos} : {hijos: Alumno[] | undefined}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {hijoSeleccionado, setHijoSeleccionado} = useStateContext()

  const handleHijoSelect = useCallback((hijo: Alumno) => {
    setHijoSeleccionado(hijo)
    const params = new URLSearchParams(searchParams.toString())
    params.set('hijo', hijo.id.toString())
    router.push(`?${params.toString()}`)
  }, [router, searchParams, setHijoSeleccionado])

  useEffect(() => {
    const hijoId = searchParams.get('hijo')
    if (hijoId && hijos) {
      const hijo = hijos.find(h => h.id.toString() === hijoId)
      if (hijo) {
        setHijoSeleccionado(hijo)
      }
    }
  }, [hijos, searchParams, setHijoSeleccionado])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center">
            <span>{hijoSeleccionado ? (
                hijoSeleccionado.nombre + " " + hijoSeleccionado.apellido
              ) : (
                "Seleccione un hijo"
              )}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {hijos?.map((hijo) => (
          <DropdownMenuItem
            key={hijo.id}
            onSelect={() => handleHijoSelect(hijo)}
            className="flex items-center transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
          >
            {hijo.nombre + " " + hijo.apellido}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}