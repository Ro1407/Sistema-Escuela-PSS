'use server'

import { getUser } from '../../prisma/services/autenticacion.service';
import { createAlumno } from "../../prisma/services/alumno.service";
import { Docente, State } from "./definitions";
import { Alumno, Padre } from "./definitions"
import { createPadre } from '../../prisma/services/padre.service';
import { createDocente } from '../../prisma/services/docente.service';


export type AuthState = {
  error: string | null;
  redirectPath: string | null;
};

export async function validateUser(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const user = await getUser(username); 

    if (!user) {
      return { error: 'El usuario ingresado no está registrado', redirectPath: null };
    }

    if (user.password !== password) {
      return { error: 'La contraseña ingresada no se corresponde con el usuario', redirectPath: null };
    }

    let redirectPath = '';
    if (user.padre) redirectPath = '/inicio/padre';
    else if (user.alumno) redirectPath = '/inicio/alumno';
    else if (user.docente) redirectPath = '/inicio/docente';
    else if (user.administrativo) redirectPath = '/inicio/admin';
    else {
      return { error: 'User type not recognized', redirectPath: null };
    }

    return { error: null, redirectPath };
  } catch (error) {
    console.error('Error validating user:', error);
    return { error: 'Ocurrió un error durante la validación', redirectPath: null };
  }
}

export async function sendUser(prevState : State, formData : FormData) : Promise<State>{
  const userTy = formData.get('userType')
  let state : State = {errors: "error de formulario", message: "error recuperando formulario"}
  switch(userTy){
      case 'alumno': 
        state = await sendAlumno(formData);
        break;
      case 'docente': 
        state = await sendDocente(formData);
        break;
      case 'padre': 
        state = await sendPadre(formData);
        break;
  }
  return state;
}

async function sendAlumno(formData: FormData) : Promise<State>{
  let alumno: Alumno | undefined;
  const date = new Date();
  const dni = formData.get('dni')?.toString()  || ''
  alumno = {
      nombre : getNombre(formData.get('name')?.toString()) || 'null',
      apellido : getApellido(formData.get('name')?.toString()) || 'null',
      direccion : formData.get('address')?.toString() || 'null',
      telefono : formData.get('phone')?.toString() || 'null',
      correoElectronico : formData.get('email')?.toString() || 'null',
      curso : formData.get('curso')?.toString() || 'null',
      numeroMatricula: formData.get('matricula')?.toString() || 'null',
      fechaNacimiento: date,
      usuario: {
          usuario: dni,
          password: dni
      },
      materiasIds: ["89becd5b-e960-4da9-87b5-8497ea5aa4bd"]
  }
  
  if(alumno && await registrarAlumno(alumno))
  return {
      message: "Usuario Registrado"
    }
  else
  return {
      errors: "datos de alumno invalidos / db",
      message: "Error creando usuario"
    }
}


async function sendDocente(formData: FormData) : Promise<State>{
  let docente: Docente | undefined;
  const dni = formData.get('dni')?.toString()  || ''
  console.log(formData)
  const cursos = formData.getAll('cursos[]').map(curso => curso.toString())
  console.log(cursos)
  docente = {
      nombre : getNombre(formData.get('name')?.toString()) || 'null',
      apellido : getApellido(formData.get('name')?.toString()) || 'null',
      direccion : formData.get('address')?.toString() || 'null',
      numeroTelefono : formData.get('phone')?.toString() || 'null',
      correoElectronico : formData.get('email')?.toString() || 'null',
      matricula : formData.get('matricula')?.toString() || 'null',
      materias : formData.getAll('materias[]').map(materia => materia.toString()),
      cursos : formData.getAll('cursos[]').map(curso => curso.toString()),
      usuario: {
          usuario: dni,
          password: dni
      }
  }
  /*
  if(docente && await registrarDocente(docente))
  return {
      message: "Usuario Registrado"
    }
  else
  return {
      errors: "datos de docente invalidos / db",
      message: "Error creando usuario"
    }
  */
  return {
    message: "Usuario Registrado"
  }
}


async function sendPadre(formData: FormData) : Promise<State>{
  let padre: Padre | undefined;
  const dni = formData.get('dni')?.toString()  || ''
  padre = {
      nombre : getNombre(formData.get('name')?.toString()) || 'null',
      apellido : getApellido(formData.get('name')?.toString()) || 'null',
      direccion : formData.get('address')?.toString() || 'null',
      numeroTelefono : formData.get('phone')?.toString() || 'null',
      correoElectronico : formData.get('email')?.toString() || 'null',
      usuario: {
          usuario: dni,
          password: dni
      },
      hijos: formData.getAll('hijos[]').map(hijo => hijo.toString()) //id para identificar a los hijos en la BD
  }
  
  if(padre && await registrarPadre(padre))
  return {
      message: "Usuario Registrado"
    }
  else
  return {
      errors: "datos de alumno invalidos / db",
      message: "Error creando usuario"
    }
}


async function registrarAlumno(alumno : Alumno){
  try{
      await createAlumno(alumno)
      return true;
  }
  catch (e){
      console.log(e)
      return false
  }
}

/*
async function registrarDocente(docente : Docente){
  try{
      await createDocente(docente)
      return true;
  }
  catch (e){
      console.log(e)
      return false
  }
}
*/

async function registrarPadre(padre : Padre){
  try{
      await createPadre(padre)
      return true;
  }
  catch (e){
      console.log(e)
      return false
  }
}

function getNombre(fullName : string | undefined) {
    if (!fullName) return null;
    // Dividimos el nombre completo por los espacios en blanco
    const parts = fullName.split(' ');
    // Retornamos la primera parte como el nombre
    console.log("nombre: " + parts[0])
    return parts[0] || null;
}

function getApellido(fullName : string | undefined) {
    if (!fullName) return null;
    // Dividimos el nombre completo por los espacios en blanco
    const parts = fullName.split(' ');
    // Retornamos la última parte como el apellido (si existe)
    console.log("apll: " + parts[parts.length - 1])
    return parts[parts.length - 1] || null;
}