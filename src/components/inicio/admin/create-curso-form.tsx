'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { sendCurso } from '@/lib/actions';
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";


export default function CreateCursoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { errors: null, message: null };
  const [state, dispatch] = useFormState(sendCurso, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estadoVisible, setEstadoVisible] = useState(false)

  const [materias, setMaterias] = useState(['']);

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
      setMaterias([''])
    }

    const timer = setTimeout(() => {
      setEstadoVisible(false);
    }, 7000);

    return () => clearTimeout(timer);

  }, [state.errors, state.message]);

  const handleAddMateria = () => {
    setMaterias([...materias, ''])
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

    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col w-full flex-grow overflow-y-auto">
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
              required
              className="w-20"
              placeholder="1A"
            />
          </div>
        </div>
        <div className="border px-10 pb-4 border-gray-300 border-dashed rounded-2xl">
          <div className="text-center mt-4 mb-6">
            <Label className="w-30 font-bold">Materias: *</Label>
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
              </div>
            ))}
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

      <div className="flex align-center mt-auto">
        <p>(*) Campos OBLIGATORIOS</p>
        <Button type="submit" className="w-60 ml-auto" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Crear Curso"}
        </Button>
      </div>

    </form>

  )
}