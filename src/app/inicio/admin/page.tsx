'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from 'lucide-react'
import { Metadata } from "next";
import { useState } from "react";
import { useFormState } from "react-dom";

const metadata: Metadata = {
  title: 'Inicio Admin',
}

export default function InicioAdmin({ nombre }: { nombre: string }) {
  //Utilizar server action
  //const [state, formAction] = useFormState(registerUser, null)
  const [formData, setFormData] = useState({
    user: '',
    curso: '',
  })
  const [materias, setMaterias] = useState([''])
  const [hijos, setHijos] = useState([''])

  const handleUserChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, user: value }))
    if (value !== 'option3') {
      setMaterias([''])
    }
  }

  const handleCursoChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, curso: value }))
  }

  const handleAddMateria = () => {
    setMaterias([...materias, ''])
  }

  const handleMateriaChange = (index: number, value: string) => {
    const newMaterias = [...materias]
    newMaterias[index] = value
    setMaterias(newMaterias)
  }

  const handleAddHijo = () => {
    setHijos([...hijos, ''])
  }

  const handleHijoChange = (index: number, value: string) => {
    const newHijos = [...hijos]
    newHijos[index] = value
    setHijos(newHijos)
  }

  return (
    <form /*action={formAction}*/ className="flex flex-col space-y-8 m-6">
      <div className="flex align-middle">
        <Label className="mr-2 mt-2 w-40" htmlFor="name">Nombre y apellido:</Label>
        <Input id="name" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-40" htmlFor="dni">DNI:</Label>
        <Input id="dni" required type="number" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-40" htmlFor="address">Dirección:</Label>
        <Input id="address" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-40" htmlFor="phone">Num. Teléfono:</Label>
        <Input id="phone" type="tel" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-40" htmlFor="email">Correo Electrónico:</Label>
        <Input id="email" type="email" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-40" htmlFor="userType">Tipo de Usuario:</Label>
        <Select name="userType" required onValueChange={handleUserChange} value={formData.user}>
          <SelectTrigger id="userType" className="w-full">
            <SelectValue placeholder="Tipo Usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="padre">Padre</SelectItem>
            <SelectItem value="alumno">Alumno</SelectItem>
            <SelectItem value="docente">Docente</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.user === 'docente' && (
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:space-x-6 justify-evenly">
            <div className="flex gap-6 align-top mb-6 md:mb-0">
              <Label className="text-lg font-semibold">Curso/s</Label>
              <div className="flex flex-col space-y-2 border border-gray-600 rounded p-4 pr-5">
                {['Curso 1', 'Curso 2', 'Curso 3'].map((curso, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`curso-${index}`} name={`curso-${index}`} />
                    <Label htmlFor={`curso-${index}`}>{curso}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex">
                <Label htmlFor="matricula" className="mr-4 mt-2 w-30">Matrícula:</Label>
                <Input id="matricula" placeholder="Ingresar la matrícula" />
              </div>
              <div className="flex">
                <Label className="mr-4 mt-2 w-30">Materia/s:</Label>
                <div className="flex flex-col space-y-2">
                  {materias.map((materia, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={materia}
                        onChange={(e) => handleMateriaChange(index, e.target.value)}
                        placeholder={`Materia ${index + 1}`}
                      />
                      {index === materias.length - 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleAddMateria}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.user === 'alumno' && (
        <div className="mt-8 space-y-6">
          <div className="flex w-full space-x-8 space-y-4 justify-evenly">
            <div className="flex gap-6 align-top">
              <Label htmlFor="curso" className="text-lg font-semibold">Curso</Label>
              <RadioGroup onValueChange={handleCursoChange} className="flex flex-col space-y-1 border border-gray-600 rounded p-4 pr-5">
                {['curso1', 'curso2', 'curso3'].map((curso) => (
                  <div key={curso} className="flex items-center space-x-2">
                    <RadioGroupItem value={curso} id={curso} />
                    <Label htmlFor={curso}>{curso.charAt(0).toUpperCase() + curso.slice(1)}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <Label htmlFor="padreTutor" className="mr-2 mt-2 w-40">Padre/Tutor:</Label>
                <Input
                  id="padreTutor"
                  name="padreTutor"
                  placeholder="Ingresar padre/tutor"
                />
              </div>
              <div className="flex">
                <Label htmlFor="matricula" className="mr-2 mt-2 w-40">Matrícula:</Label>
                <Input
                  id="matricula"
                  name="matricula"
                  placeholder="Ingresar la matrícula"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.user === 'padre' && (
        <div className="flex ml-auto">
          <Label className="mr-4 mt-2 w-30">Hijo/s:</Label>
          <div className="flex flex-col space-y-2">
            {hijos.map((hijo, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={hijo}
                  onChange={(e) => handleHijoChange(index, e.target.value)}
                  placeholder={`Hijo ${index + 1}`}
                />
                {index === hijos.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleAddHijo}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )
      }

      <Button type="submit" className="w-60 ml-auto mt-6">Crear</Button>

      {/*
      {state?.message && (
        <p className={`mt-4 text-center ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}
      */}
    </form >


  )
}