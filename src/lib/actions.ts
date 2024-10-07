'use server'

import { getUser } from '../../prisma/services/autenticacion.service';
import { createAlumno } from "../../prisma/services/alumno.service";
import { Administrador, Docente, State } from "./definitions";
import { Alumno, Padre } from "./definitions"
import { createPadre } from '../../prisma/services/padre.service';
import { createDocente } from '../../prisma/services/docente.service';
import { createSession, deleteSession, getSession } from './session';
import { redirect } from 'next/navigation';
import { createAdministrativo } from '../../prisma/services/administrativo.service';


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

    await createSession(user);

    return { error: null, redirectPath };
  } catch (error) {
    console.error('Error validating user:', error);
    return { error: 'Ocurrió un error durante la validación', redirectPath: null };
  }
}

export async function fetchUserSession() {
  const session = await getSession()
  return session
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function sendUser(prevState: State, formData: FormData): Promise<State> {
  const userTy = formData.get('userType')
  let state: State = { errors: "error de formulario", message: "error recuperando formulario" }
  switch (userTy) {
    case 'alumno':
      state = await sendAlumno(formData);
      break;
    case 'docente':
      state = await sendDocente(formData);
      break;
    case 'padre':
      state = await sendPadre(formData);
      break;
    case 'administrador':
      state = await sendAdministrador(formData);
      break;
    default:
      break;
  }
  return state;
}

async function sendAlumno(formData: FormData): Promise<State> {
  let alumno: Alumno | undefined;
  const dni = formData.get('dni')?.toString() || ''
  const correoElectronico = formData.get('email')?.toString() || ''
  alumno = {
    nombre: getNombre(formData.get('name')?.toString()) || 'null',
    apellido: getApellido(formData.get('name')?.toString()) || 'null',
    direccion: formData.get('address')?.toString() || 'null',
    telefono: formData.get('phone')?.toString() || 'null',
    correoElectronico: formData.get('email')?.toString() || 'null',
    cursoId: formData.get('curso')?.toString() || 'null',
    dni: dni,
    numeroMatricula: formData.get('matricula')?.toString() || 'null',
    usuario: {
      usuario: correoElectronico,
      password: dni
    }
  }

  if (alumno && await registrarAlumno(alumno))
    return {
      message: "Usuario Registrado"
    }
  else
    return {
      errors: "Datos de alumno inválidos / db",
      message: "Error creando usuario"
    }

}


async function sendDocente(formData: FormData): Promise<State> {
  let docente: Docente | undefined;
  const dni = formData.get('dni')?.toString() || '';
  const correoElectronico = formData.get('email')?.toString() || '';

  const cursos = formData.getAll('cursos[]').map(curso => curso.toString());

  docente = {
    nombre: getNombre(formData.get('name')?.toString()) || 'null',
    apellido: getApellido(formData.get('name')?.toString()) || 'null',
    direccion: formData.get('address')?.toString() || 'null',
    numeroTelefono: formData.get('phone')?.toString() || 'null',
    correoElectronico: correoElectronico || 'null',
    matricula: formData.get('matricula')?.toString() || 'null',
    materiaId: formData.get('materia')?.toString() || 'null',
    dni: dni,
    cursosIds: formData.getAll('cursos[]').map(curso => curso.toString()),
    usuario: {
      usuario: correoElectronico,
      password: dni
    }
  };

  const result = await registrarDocente(docente);
  
  if (result.success) {
    return {
      message: "Usuario Registrado",
      errors: null
    };
  } else {
    return {
      message: "Error creando usuario",
      errors: result.error || "Datos de docente invalidos"
    };
  }
}

async function sendPadre(formData: FormData): Promise<State> {
  let padre: Padre | undefined;
  const dni = formData.get('dni')?.toString() || ''
  padre = {
    nombre: getNombre(formData.get('name')?.toString()) || 'null',
    apellido: getApellido(formData.get('name')?.toString()) || 'null',
    direccion: formData.get('address')?.toString() || 'null',
    numeroTelefono: formData.get('phone')?.toString() || 'null',
    correoElectronico: formData.get('email')?.toString() || 'null',
    usuario: {
      usuario: dni,
      password: dni
    },
    hijos: formData.getAll('hijos[]').map(hijo => hijo.toString()) //id para identificar a los hijos en la BD
  }
  /*
  
  if(padre && await registrarPadre(padre))
  return {
      message: "Usuario Registrado"
    }
  else
  return {
      errors: "datos de alumno invalidos / db",
      message: "Error creando usuario"
    }
      */
  return {
    message: "Usuario Registrado"
  }
}

async function sendAdministrador(formData: FormData): Promise<State> {
  let administrador: Administrador | undefined;
  const dni = formData.get('dni')?.toString() || ''
  const correoElectronico = formData.get('email')?.toString() || ''
  administrador = {
    nombre: getNombre(formData.get('name')?.toString()) || 'null',
    apellido: getApellido(formData.get('name')?.toString()) || 'null',
    direccion: formData.get('address')?.toString() || 'null',
    numeroTelefono: formData.get('phone')?.toString() || 'null',
    correoElectronico: correoElectronico,
    dni: dni,
    usuario: {
      usuario: correoElectronico,
      password: dni
    }
  }
  if (administrador && await registrarAdministrador(administrador))
    return {
      message: "Usuario Registrado"
    }
    else
      return {
        errors: "Datos de administrador inválidos / db",
        message: "Error creando usuario"
      }
}
  

async function registrarAlumno(alumno: Alumno) {
  try {
    await createAlumno(alumno)
    return true;
  }
  catch (e) {
    console.log(e)
    return false
  }
}


async function registrarDocente(docente: Docente): Promise<{ success: boolean, error?: string }> {
  try {
    await createDocente(docente);
    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return { success: false, error: e.message };
    } else {
      return { success: false, error: "Ocurrió un error desconocido" };
    }
  }
}


/*
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

*/

async function registrarAdministrador(administrador: Administrador): Promise<{ success: boolean, error?: string }> {
  try {
    await createAdministrativo(administrador);
    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return { success: false, error: e.message };
    } else {
      return { success: false, error: "Ocurrio un error desconocido" };
    }
  }
}

function getNombre(fullName: string | undefined) {
  if (!fullName) return null;
  // Dividimos el nombre completo por los espacios en blanco
  const parts = fullName.split(' ');
  // Retornamos la primera parte como el nombre
  console.log("nombre: " + parts[0])
  return parts[0] || null;
}

function getApellido(fullName: string | undefined) {
  if (!fullName) return null;
  // Dividimos el nombre completo por los espacios en blanco
  const parts = fullName.split(' ');
  // Retornamos la última parte como el apellido (si existe)
  console.log("apll: " + parts[parts.length - 1])
  return parts[parts.length - 1] || null;
}