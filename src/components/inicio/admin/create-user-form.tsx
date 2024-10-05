'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { sendUser } from '@/lib/actions';
import { Curso, Materia } from "../../../../prisma/interfaces";

export default function CreateUserForm( {materias, cursos}: {materias: Materia[], cursos: Curso[]}) {
  //Utilizar server action
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(sendUser, initialState);

  const [hijos, setHijos] = useState([''])
  const [formData, setFormData] = useState({
    user: '',
    curso: '',
    materia: '',
    hijos: hijos,
  })
  
  const handleUserChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, user: value }))
  }

  const handleCursoChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, curso: value }))
  }

  const handleMateriaChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, materia: value }))
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
    <form action={dispatch} className="flex flex-col space-y-8 m-6">
      <div className="flex align-middle">
        <Label className="mr-2 mt-2 w-44" htmlFor="name">Nombre y apellido: *</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="dni">DNI: *</Label>
        <Input id="dni" name="dni" required type="number" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="address">Dirección: *</Label>
        <Input id="address" name="address" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="phone">Num. Teléfono: *</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="email">Correo Electrónico: *</Label>
        <Input id="email" name ="email" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="userType">Tipo de Usuario: *</Label>
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

      {/*Seccion condicional según tipo de usuario*/}
      {formData.user === 'docente' && (
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:space-x-6 justify-evenly">
            <div className="flex gap-6 align-top mb-6 md:mb-0">
              <Label className="text-lg font-semibold">Curso/s *:</Label>
              <div className="flex flex-col space-y-2 border border-gray-600 rounded p-4 pr-5">
                {cursos.map((curso, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={curso.id} name={'cursos[]'} value={curso.id}/>
                    <Label htmlFor={curso.id}>{curso.nombre}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex">
                <Label htmlFor="matricula" className="mr-4 mt-2 w-36">Matrícula: *</Label>
                <Input id="matricula" name="matricula" placeholder="Ingresar la matrícula" required/>
              </div>
              <div className="flex">
                <Label className="mr-4 mt-2 w-36">Materia:</Label>
                <div className="flex flex-col space-y-2 w-full">
									<Select name="materia" required onValueChange={handleMateriaChange} value={formData.materia}>
										<SelectTrigger id="materia" className="w-full">
											<SelectValue placeholder="Materia" />
										</SelectTrigger>
										<SelectContent>
											{materias.map((materia, index) => (
												<SelectItem key={index} value={materia.id}>{materia.nombre}</SelectItem>
											))}
										</SelectContent>
									</Select>
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
              <Label htmlFor="curso" className="text-lg font-semibold">Curso *</Label>
              <RadioGroup name="curso" onValueChange={handleCursoChange} className="flex flex-col space-y-1 border border-gray-600 rounded p-4 pr-5" required>
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
                <Label htmlFor="matricula" className="mr-2 mt-2 w-40">Matrícula: *</Label>
                <Input
                  id="matricula"
                  name="matricula"
                  placeholder="Ingresar la matrícula"
									required
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
                  id={`hijo-${index}`}
                  name="hijos[]"
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
      
      <div className="flex align-center">
        <p >(*) Campos OBLIGATORIOS</p>
        <Button type="submit" className="w-60 ml-auto">Crear</Button>
      </div>

      {
      state?.message && (
        <p className={`mt-4 text-center ${state.errors? 'text-red-600' : 'text-green-600'}`}>
          {state.message}
        </p>
      )}
    </form >
  )
}