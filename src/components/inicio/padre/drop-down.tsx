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

interface Hijo {
  id: number
  name: string
}

const hijos: Hijo[] = [
  { id: 1, name: "Hijo 1"},
  { id: 2, name: "Hijo 2"},
  { id: 3, name: "Hijo 3"},
  { id: 4, name: "Hijo 4"},
]

export default function HijosDropdown() {
  const [hijoSeleccionado, setHijoSeleccionado] = useState<Hijo>(hijos[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center">
            <span>{hijoSeleccionado.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {hijos.map((hijo) => (
          <DropdownMenuItem
            key={hijo.id}
            onSelect={() => setHijoSeleccionado(hijo)}
            className="flex items-center transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
          >
            {hijo.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}