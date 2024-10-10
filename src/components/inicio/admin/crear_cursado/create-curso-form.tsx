'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { sendCurso } from '@/lib/actions';


export default function CreateCursoForm() {
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(sendCurso, initialState);

  const [materias, setMaterias] = useState(['']);

  const handleAddMateria = () => {
    setMaterias([...materias, ''])
  }

  const handleMateriaChange = (index: number, value: string) => {
    const newMaterias = [...materias]
    newMaterias[index] = value
    setMaterias(newMaterias)
  }

  return (

    <form className="flex flex-col w-full flex-grow overflow-y-auto">
      <div className="flex flex-col space-y-8 w-full md:w-1/2 mx-auto">
        <div className="flex space-x-2">
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
            <div className="flex flex-col">
              <p>Identificador Curso: *</p>
              <span className="text-xs text-gray-500">(número o letra del curso)</span>
            </div>
          </Label>
          <div className="mt-1">
            <Input
              type="text"
              name="name"
              id="name"
              className="w-20"
              placeholder="1A"
            />
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

      <div className="flex align-center mt-auto">
        <p>(*) Campos OBLIGATORIOS</p>
        <Button type="submit" className="w-60 ml-auto">
          Crear Curso
        </Button>
      </div>

    </form>

  )
}