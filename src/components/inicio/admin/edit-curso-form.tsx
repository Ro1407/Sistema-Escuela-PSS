'use client'

import { DeleteCurso } from "@/components/inicio/admin/DeleteOptions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateCurso } from '@/lib/actions';
import { State } from "@/lib/definitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Materia } from "@prisma/client";
import { cx } from "class-variance-authority";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Curso } from "../../../../prisma/interfaces";


export default function EditCursoForm({ cursos }: { cursos: Curso[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(updateCurso, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estadoVisible, setEstadoVisible] = useState(false)

   
  const [materiasActuales, setMateriasActuales] = useState<{ materia: Materia, eliminada: boolean }[]>([]);
  const [newMaterias, setNewMaterias] = useState<string[]>([]);
  const [cursoId, setCursoId] = useState<string | undefined>(undefined);

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
      setCursoId(undefined)
      setMateriasActuales([])
      setNewMaterias([])
    }

    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);

    return () => clearTimeout(timer);

  }, [state.errors, state.message, isSubmitting]);


  const handleAddMateria = () => {
    setNewMaterias([...newMaterias, ''])
  }

  const handleMateriaChange = (id: string) => {
    const materiaCambiada = materiasActuales.find(materiaAct => materiaAct.materia.id === id)
    if (materiaCambiada) {
      setMateriasActuales(materiasActuales.map(materiaAct => {
        if (materiaAct.materia.id === id) {
          return { materia: materiaCambiada.materia, eliminada: !materiaCambiada.eliminada }
        }
        return materiaAct
      }))
    }
  }

  const handleCursoSelected = (id: string) => {
    const cursoSeleccionado = cursos.find(curso => curso.id === id)
    setCursoId(id)
    setMateriasActuales(cursoSeleccionado?.materias?.map(materia => ({ materia, eliminada: false })) || [])
  }

  const handleDeleteResult = (result: State) => {
    setEstadoVisible(true)
    if (result.errors) {
      state.errors = result.errors;
      state.message = result.message;
    } else {
      setCursoId(undefined)
      formRef.current?.reset();
      state.message = result.message;
    }
    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
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
        <DeleteCurso id={cursoId} onDelete={handleDeleteResult} isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
      </div>
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col flex-grow w-4/5">
        <div className="flex space-x-4 w-full mx-auto">
          <div className="flex mt-2">
            <Label className="mr-4 mt-2 w-36">Curso:</Label>
            <div className="flex flex-col space-y-2 w-full">
              <Select name="cursoId" required onValueChange={handleCursoSelected} value={cursoId || ''}>
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
              {!cursoId && <p className="text-center italic text-gray-600">Seleccione un curso para ver las materias asociadas</p>}
              {materiasActuales?.map((matAct, index) => (
                <div key={index} className="flex flex-row w-full items-center space-x-2">
                  <Label htmlFor={`materia-${index}`} className="block text-sm font-medium text-gray-700 w-44">
                    Nombre materia:
                  </Label>
                  <Input
                    id={`materia-${index}`}
                    type="text"
                    value={matAct.materia.nombre}
                    placeholder={`Matemática`}
                    className={cx("w-full", matAct.eliminada && ("line-through text-red-600"))}
                    disabled
                  />
                  {matAct.eliminada &&
                    <Input
                      type="hidden"
                      name="materiasEliminadas[]"
                      value={matAct.materia.id}
                    />
                  }
                  {!matAct.eliminada &&
                    <Input
                      type="hidden"
                      name="materiasConservadas[]"
                      value={matAct.materia.nombre}
                    />
                  }
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMateriaChange(matAct.materia.id)}
                  >
                    <TrashIcon className={cx("h-4 w-4", matAct.eliminada && ("text-red-600"))} />
                  </Button>
                </div>
              ))}
              {newMaterias.map((materia, index) => (
                <div key={index} className="flex flex-row w-full items-center space-x-2">
                  <Label htmlFor={`materia-${index}`} className="block text-sm font-medium text-gray-700 w-[158px]">
                    Nombre materia:
                  </Label>
                  <Input
                    id={`materia-${index}`}
                    name="materiasNuevas[]"
                    type="text"
                    placeholder={`Escriba el nombre de la nueva materia`}
                    className="w-full"
                  />
                </div>

              ))}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleAddMateria}
                className="mt-2 mx-auto"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

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
          <Button type="submit" className="w-60" disabled={!cursoId || isSubmitting || isDeleting}>
            {isSubmitting ? "Cargando..." : "Guardar cambios"}
          </Button>
        </div>
      </form >
    </div >
  )
}
