'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUsuario } from '@/lib/actions';
import { Alumno, State, User } from "@/lib/definitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Materia } from "@prisma/client";
import { cx } from "class-variance-authority";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Curso } from "../../../../prisma/interfaces";
import { DeleteUser } from "./DeleteOptions";


export default function EditUserForm({ user, materias, cursos, setUser }: { user: User, materias: Materia[], cursos: Curso[], setUser: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { errors: null, message: null };
  const updateTypeUser = updateUsuario.bind(null, user.tipo, user.id);
  const [state, dispatch] = useFormState(updateTypeUser, initialState);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estadoVisible, setEstadoVisible] = useState(false);

  const [hijosActuales, setHijosActuales] = useState<{ alumno: Alumno, eliminado: boolean }[]>([]);
  const [newHijos, setNewHijos] = useState<string[]>([]);

  useEffect(() => {
    if (user.tipo === 'PADRE') {
      setHijosActuales(user.hijos.map((hijo) => ({ alumno: hijo, eliminado: false })));
    }
  }, [user]);

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
    
    if (state.errors) {
      formRef.current?.reset();
      setNewHijos([]);
    }

    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);

    return () => clearTimeout(timer);

  }, [state.errors, state.message, isSubmitting]);

  const handleHijoChange = (id: string) => {
    const hijoCambiado = hijosActuales.find((hijo) => hijo.alumno.id === id);
    if (hijoCambiado) {
      setHijosActuales(hijosActuales.map((hijo) => {
        if (hijo.alumno.id === id) {
          return { alumno: hijo.alumno, eliminado: !hijo.eliminado };
        }
        return hijo;
      }));
    }
  };

  const handleAddHijo = () => {
    setNewHijos([...newHijos, '']);
  };

  const handleDeleteResult = (result: State) => {
    setEstadoVisible(true)
    if (result.errors) {
      state.errors = result.errors;
      state.message = result.message;
    } else {
      setUser(null)
      formRef.current?.reset();
      state.message = result.message;
    }
    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  };

  const verifyCurso = (id: string, cursos?: Curso[]) => {
    return cursos?.some(curso => curso.id === id);
  };

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
    <div className="flex w-full flex-grow overflow-y-auto">
      <div className="flex flex-col align-center flex-grow w-1/5">
        <DeleteUser id={user.id} userType={user.tipo} onDelete={handleDeleteResult} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
      </div>
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col flex-grow w-4/5 space-y-8 m-6">
        <div className="flex align-middle">
          <Label className="mr-2 mt-2 w-44" htmlFor="name">Nombre y apellido: *</Label>
          <Input id="name" name="name" defaultValue={user.nombre + " " + user.apellido} />
        </div>
        <div className="flex">
          <Label className="mr-2 mt-2 w-44" htmlFor="dni">DNI: *</Label>
          <Input id="dni" name="dni" type="number" defaultValue={user.dni} />
        </div>
        <div className="flex">
          <Label className="mr-2 mt-2 w-44" htmlFor="address">Dirección: *</Label>
          <Input id="address" name="address" defaultValue={user.direccion} />
        </div>

        <div className="flex">
          <Label className="mr-2 mt-2 w-44" htmlFor="phone">Num. Teléfono: *</Label>
          <Input id="phone" name="phone" type="tel" defaultValue={user.numeroTelefono} />
        </div>
        <div className="flex">
          <Label className="mr-2 mt-2 w-44" htmlFor="email">Correo Electrónico: *</Label>
          <Input id="email" name="email" defaultValue={user.correoElectronico} />
        </div>
        {/* Campos dependientes de si el usuario es Alumno */}
        {user.tipo === 'ALUMNO' &&
          <div className="mt-8 space-y-6">
            <div className="flex w-full space-x-8 space-y-4 justify-evenly">
              <div className="flex gap-6 align-top">
                <Label htmlFor="curso" className="text-lg font-semibold">Curso *</Label>
                <RadioGroup name="curso" defaultValue={user.cursoId} className="flex flex-col space-y-1 border border-gray-600 rounded p-4 pr-5" required>
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
                    defaultValue={user.numeroMatricula}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

        }

        {user.tipo === 'DOCENTE' &&
          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:space-x-6 justify-evenly">
              <div className="flex gap-6 align-top mb-6 md:mb-0">
                <Label className="text-lg font-semibold">Curso/s *:</Label>
                <div className="flex flex-col space-y-2 border border-gray-600 rounded p-4 pr-5">
                  {cursos.map((curso, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={curso.id} name={'cursos[]'} value={curso.id} defaultChecked={verifyCurso(curso.id, user.cursos)} />
                      <Label htmlFor={curso.id}>{curso.nombre}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex">
                  <Label htmlFor="matricula" className="mr-4 mt-2 w-36">Matrícula: *</Label>
                  <Input id="matricula" name="matricula" placeholder="Ingresar la matrícula" required defaultValue={user.matricula} />
                </div>
                <div className="flex">
                  <Label className="mr-4 mt-2 w-36">Materia:</Label>
                  <div className="flex flex-col space-y-2 w-full">
                    <Select name="materia" required defaultValue={user.materiaId}>
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
        }

        {user.tipo === 'PADRE' &&
          <div className="flex ml-auto">
            <div className="flex flex-col space-y-2">
              <Label className="mr-4 mt-2 w-30">Hijo/s:</Label>
              <span className="text-xs mr-2">(Ingrese su DNI)</span>
            </div>
            <div className="flex flex-col space-y-2">
              {hijosActuales.map((hijoAct, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <Input
                      id={`hijo-${index}`}
                      type="number"
                      value={hijoAct.alumno.dni}
                      placeholder={`DNI hijo ${index + 1}`}
                      disabled
                      className={cx("w-full", hijoAct.eliminado && ("line-through text-red-600"))}
                    />
                    {!hijoAct.eliminado &&
                      <Input
                        type="hidden"
                        name="hijosConservados[]"
                        value={hijoAct.alumno.id}
                      />
                    }
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleHijoChange(hijoAct.alumno.id)}
                    >
                      <TrashIcon className={cx("h-4 w-4", hijoAct.eliminado && ("text-red-600"))} />
                    </Button>
                  </div>
                  
                </div>
              ))}
              {newHijos.map((hijo, index) => (
                <div key={index} className="flex flex-row w-full items-center space-x-2">
                  <Input
                    id={`hijo-${index}`}
                    name="hijosNuevos[]"
                    type="text"
                    placeholder={`Escriba el DNI del hijo nuevo`}
                    className="w-full"
                  />
                  {state?.errors?.childField?.[index] && (
                    <p className="text-red-600 text-xs">
                      {state.errors.childField[index]}
                    </p>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleAddHijo}
                className="mt-2 mx-auto"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        }


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

        {/* Barra de carga */}
        {isSubmitting && <Progress className="mt-auto" value={progress} />}

        <div className="flex space-x-4 align-center mt-auto justify-end">
          <Link href="/inicio/admin" className={cx("w-40", buttonVariants({ variant: "outline" }))}>
            Descartar cambios
          </Link>
          <Button type="submit" className="w-60" disabled={isSubmitting || isDeleting}>
            {isSubmitting ? "Cargando..." : "Guardar cambios"}
          </Button>
        </div>
      </form >
    </div >
  )
}
