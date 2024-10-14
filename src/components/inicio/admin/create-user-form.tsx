'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendUser, validateGeneral } from '@/lib/actions';
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

  const [formErrors, setFormErrors] = useState<string[]>([]);

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

    const errors: string[] = [];
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Check required fields
    const requiredFields = [
      { name: 'name', label: 'Nombre y apellido' },
      { name: 'dni', label: 'DNI' },
      { name: 'address', label: 'Dirección' },
      { name: 'phone', label: 'Num. Teléfono' },
      { name: 'email', label: 'Correo Electrónico' },
    ];

    requiredFields.forEach(field => {
      const input = form.elements.namedItem(field.name) as HTMLInputElement;
      if (!input || !input.value) {
        errors.push(`Por favor, complete el campo ${field.label}`);
      }
    });

    const userType = form.elements.namedItem('userType') as HTMLInputElement;
    if(!userType || !userType.value) {
        errors.push('Por favor, seleccione un Tipo de Usuario');
    }

    // Check user type specific fields
    if (userType && userType.value === 'docente') {
      const matricula = form.elements.namedItem('matricula') as HTMLInputElement;
      const materia = form.elements.namedItem('materia') as HTMLInputElement;
      const cursos = form.elements.namedItem('cursos[]') as unknown as NodeListOf<HTMLInputElement>;

      if (!matricula || !matricula.value) {
        errors.push('Por favor, ingrese la matrícula');
      }
      if (!materia || !materia.value) {
        errors.push('Por favor, seleccione una materia');
      }
      if (!Array.from(cursos).some(curso => curso.checked)) {
        errors.push('Por favor, seleccione al menos un curso');
      }
    } else if (userType && userType.value === 'alumno') {
      const curso = form.elements.namedItem('curso') as HTMLInputElement;
      const matricula = form.elements.namedItem('matricula') as HTMLInputElement;

      if (!curso || !curso.value) {
        errors.push('Por favor, seleccione un curso');
      }
      if (!matricula || !matricula.value) {
        errors.push('Por favor, ingrese la matrícula');
      }
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      setProgress(0);
      return;
    }

    try {
      const result = await validateGeneral(formData);
      state.errors = result.errors;
      state.message = result.message;
      setProgress(100);
    } catch (error) {
      state.errors = {description: "Ocurrió un error durante la validación" };
      state.message = "Ocurrió un error durante la validación";
      console.error("Error during validation:", error);
    } finally {
      setTimeout(() => setIsSubmitting(false), 500);
    }

    await dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col space-y-8 m-6">
      <div className="flex align-middle">
        <Label className="mr-2 mt-2 w-44" htmlFor="name">Nombre y apellido: *</Label>
        <Input id="name" name="name" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="dni">DNI: *</Label>
        <Input id="dni" name="dni" type="number" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="address">Dirección: *</Label>
        <Input id="address" name="address" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="phone">Num. Teléfono: *</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="email">Correo Electrónico: *</Label>
        <Input id="email" name="email" />
      </div>
      <div className="flex">
        <Label className="mr-2 mt-2 w-44" htmlFor="userType">Tipo de Usuario: *</Label>
        <Select name="userType" required onValueChange={handleUserChange} value={formData.user}>
          <SelectTrigger id="userType" className="w-full">
            <SelectValue placeholder="Seleccione un tipo" />
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
      <div className="mt-4">
        {formErrors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <ul className="list-disc list-inside">
                {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
        )}
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
