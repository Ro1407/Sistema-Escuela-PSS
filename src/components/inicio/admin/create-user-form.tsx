'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendUser } from '@/lib/actions';
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Curso, Materia } from "../../../../prisma/interfaces";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: 'Administrar',
}

export default function CreateUserForm({ materias, cursos }: { materias: Materia[], cursos: Curso[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(sendUser, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estadoVisible, setEstadoVisible] = useState(false);

  const [hijos, setHijos] = useState(['']);
  const [formData, setFormData] = useState({
    user: '',
    curso: '',
    materia: '',
    hijos: hijos,
  });

  useEffect(() => {
    if (isSubmitting) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) {
            return prev + 5;
          }
          return prev;
        });
      }, 100);
      return () => clearInterval(progressInterval);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting && (state.errors || state.message)) {
      setProgress(100);
      setIsSubmitting(false);
      setEstadoVisible(true)
    }

    if (state.message && !state.errors) {
      formRef.current?.reset();
      setFormData({
        user: '',
        curso: '',
        materia: '',
        hijos: ['']
      });
    }

    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);

    return () => clearTimeout(timer);

  }, [state.errors, state.message, isSubmitting]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setProgress(10);

    state.errors = null;
    state.message = null;

    const formDataToSubmit = new FormData(event.currentTarget as HTMLFormElement);
    await dispatch(formDataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col space-y-8 m-6">
      <div className="flex align-middle">
        <Label className="mr-2 mt-2 w-44" htmlFor="name">Nombre y apellido: *</Label>
        <Input id="name" name="name" required/>
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="dni">DNI: *</Label>
        <Input id="dni" name="dni" type="number" required />
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
        <Input id="email" name="email" required />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="userType">Tipo de Usuario: *</Label>
        <Select name="userType" required onValueChange={handleUserChange} value={formData.user}>
          <SelectTrigger id="userType" className="w-full">
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ninguno"></SelectItem> 
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
                    <Checkbox id={curso.id} name={'cursos[]'} value={curso.id} />
                    <Label htmlFor={curso.id}>{curso.nombre}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex">
                <Label htmlFor="matricula" className="mr-4 mt-2 w-36">Matrícula: *</Label>
                <Input id="matricula" name="matricula" placeholder="Ingresar la matrícula" required />
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
                {cursos.map((curso) => (
                  <div key={curso.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={curso.id} id={curso.id} />
                    <Label htmlFor={curso.id}>{curso.nombre}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-col space-y-2">
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
          <div className="flex flex-col space-y-2">
            <Label className="mr-4 mt-2 w-30">Hijo/s:</Label>
            <span className="text-xs mr-2">(Ingrese su DNI)</span>
          </div>
          <div className="flex flex-col space-y-2">
            {hijos.map((hijo, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Input
                    id={`hijo-${index}`}
                    name="hijos[]"
                    type="number"
                    onChange={(e) => handleHijoChange(index, e.target.value)}
                    placeholder={`DNI hijo ${index + 1}`}
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
                {state?.errors?.childField?.[index] && (
                  <p className="text-red-600 text-xs">
                    {state.errors.childField[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mostrar mensajes de éxito y error */}
      {estadoVisible &&
          <div className="mt-4">
            {state?.errors && (
              <p className="text-red-600 text-center">
                {state.message ? state.message : state.errors.description}
              </p>
            )}
            {state?.message && !state.errors && (
              <p className="text-green-600 text-center">
                {state.message}
              </p>
            )}
          </div>
        }

      <div className="flex align-center">
        <p>(*) Campos OBLIGATORIOS</p>
        <Button type="submit" className="w-60 ml-auto" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Crear"}
        </Button>
      </div>

      {/* Barra de carga */}
      {isSubmitting && <Progress className="mt-4" value={progress} />}
    </form >
  );
}
