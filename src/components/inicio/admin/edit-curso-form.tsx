'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { sendCurso } from '@/lib/actions';
import { Curso } from "../../../../prisma/interfaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Materia } from "@prisma/client";


export default function EditCursoForm({ cursos }: { cursos: Curso[] }) {
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(sendCurso, initialState);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [idCursoSelected, setIdCursoSelected] = useState<string>('');


  const handleAddMateria = () => {
    //setMaterias([...materias, ''])
  }

  const handleMateriaChange = (index: number, value: string) => {
    const newMaterias = [...materias]
    newMaterias[index].nombre = value
    setMaterias(newMaterias)
  }

  const handleCursoSelected = (value: string) => {
    setIdCursoSelected(value)
    setMaterias(cursos.find(curso => curso.id === value)?.materias || [])
  }

  return (

    <form className="flex flex-col w-full flex-grow overflow-y-auto">
      <div className="flex space-x-4 w-full mx-auto">
        <div className="flex mt-2">
          <Label className="mr-4 mt-2 w-36">Curso:</Label>
          <div className="flex flex-col space-y-2 w-full">
            <Select name="curso" required onValueChange={handleCursoSelected}>
              <SelectTrigger id="curso" className="w-full">
                <SelectValue placeholder="Curso" />
              </SelectTrigger>
              <SelectContent>
                {cursos.map((curso, index) => (
                  <SelectItem key={index} value={curso.id}>{curso.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="border px-10 pb-4 border-gray-300 border-dashed rounded-2xl">
          <div className="text-center mt-4 mb-6">
            <Label className="w-30 font-bold">Materias:</Label>
          </div>
          <div className="flex flex-col space-y-2">
            {materias.map((materia, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex flex-col items-center space-x-2">
                  <div className="flex flex-row w-full items-center space-x-2">
                    <Label htmlFor={`materia-${index}`} className="block text-sm font-medium text-gray-700 w-40">
                      Nombre materia:
                    </Label>
                    <Input
                      id={`materia-${index}`}
                      name="materias[]"
                      type="text"
                      onChange={(e) => handleMateriaChange(index, e.target.value)}
                      value={materia.nombre}
                      placeholder={`Matemática`}
                    />
                  </div>
                  {index === materias.length - 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleAddMateria}
                      className="mt-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {state?.errors?.childField?.[index] && (
                  <p className="text-red-600 text-xs">
                    {state.errors.childField[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 align-center mt-auto justify-end">
        <Button type="button" variant="outline" className="w-40">
          Descartar cambios
        </Button>
        <Button type="submit" className="w-60">
          Guardar cambios
        </Button>
      </div>

    </form >

  )
}
