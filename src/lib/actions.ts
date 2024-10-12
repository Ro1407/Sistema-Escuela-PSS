'use server'

import {
    getUser,
    dniExists,
    matriculaDocenteExists,
    matriculaAlumnoExists,
    correoElectronicoExists
} from '../../prisma/services/autenticacion.service';
import {createAlumno, getAlumnosByDNI} from "../../prisma/services/alumno.service";
import {Administrador, Docente, State} from "./definitions";
import {Alumno, Padre} from "./definitions"
import {createPadre} from '../../prisma/services/padre.service';
import {createDocente} from '../../prisma/services/docente.service';
import {createSession, deleteSession, getSession} from './session';
import {redirect} from 'next/navigation';
import {createAdministrativo} from '../../prisma/services/administrativo.service';
import {capitalizeInitials, normalizeString} from './utils';
import {createMateria, getAllMaterias} from '../../prisma/services/materia.service';
import {createCurso} from '../../prisma/services/curso.service';


export type AuthState = {
    error: string | null;
    redirectPath: string | null;
};

export async function validateUser(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUser(username);

        if (!user || user.password !== password) {
            return {error: 'El usuario o contraseña ingresados son incorrectos', redirectPath: null};
        }

        let redirectPath = '';
        if (user.padre) redirectPath = '/inicio/padre';
        else if (user.alumno) redirectPath = '/inicio/alumno';
        else if (user.docente) redirectPath = '/inicio/docente';
        else if (user.administrativo) redirectPath = '/inicio/admin';
        else {
            return {error: 'User type not recognized', redirectPath: null};
        }

        await createSession(user);

        return {error: null, redirectPath};
    } catch (error) {
        console.error('Error validating user:', error);
        return {error: 'Ocurrió un error durante la validación', redirectPath: null};
    }
}

export async function fetchUserSession() {
    return await getSession()
}

export async function logout() {
    deleteSession()
    redirect('/login')
}

export async function validateGeneral(formData: FormData): Promise<State> {
    let state: State = {errors: {description: "error de formulario"}, message: "error recuperando formulario"};

    const form_dni = formData.get('dni') as string;
    const form_email = formData.get('email') as string;
    const form_userType = formData.get('userType') as string;

    try {
        if (await dniExists(form_dni)) {
            return {errors: {description: 'El DNI ya está registrado'}, message: "El DNI ya está registrado"};
        }
        if (await correoElectronicoExists(form_email)) {
            return {
                errors: {description: 'El correo electrónico ya está registrado'},
                message: "El correo electrónico ya está registrado"
            };
        }

        if (form_userType === 'alumno') {
            const form_matricula = formData.get('matricula') as string;
            if (await matriculaAlumnoExists(form_matricula)) {
                return {
                    errors: {description: 'La matrícula ya está registrada'},
                    message: "La matrícula ya está registrada"
                };
            }
        }

        if (form_userType === 'docente') {
            const form_matricula = formData.get('matricula') as string;
            if (await matriculaDocenteExists(form_matricula)) {
                return {
                    errors: {description: 'La matrícula ya está registrada'},
                    message: "La matrícula ya está registrada"
                };
            }
        }

    } catch (error) {
        console.error('Error validating user:', error);
        return {
            errors: {description: 'Ocurrió un error durante la validación'},
            message: "Ocurrió un error durante la validación"
        };
    }

    return state;
}

export async function sendUser(prevState: State, formData: FormData): Promise<State> {
    const userTy = formData.get('userType')
    let state: State = {errors: {description: "error de formulario"}, message: "error recuperando formulario"}
    switch (userTy){
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
        padreId: null,
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
            errors: {description: "Datos de alumno inválidos / db"},
            message: "Error creando usuario"
        }

}


async function sendDocente(formData: FormData): Promise<State> {
    let docente: Docente | undefined;
    const dni = formData.get('dni')?.toString() || '';
    const correoElectronico = formData.get('email')?.toString() || '';

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
            errors: {
                description: result.error || "Datos de docente invalidos"
            },
        };
    }
}

async function sendPadre(formData: FormData): Promise<State> {
    let padre: Padre | undefined;
    const dni = formData.get('dni')?.toString() || ''
    const correoElectronico = formData.get('email')?.toString() || ''

    const dnisHijos = formData.getAll('hijos[]').map(hijo => hijo.toString());

    const hijosExistentes = await getAlumnosByDNI(dnisHijos);
    const hijosExistentesDnis = hijosExistentes.map(hijo => hijo.dni);

    // Mapear errores a cada índice correspondiente
    const childFieldErrors: Record<number, string> = dnisHijos.reduce((acc, dni, index) => {
        if (!hijosExistentesDnis.includes(dni)) {
            acc[index] = `Alumno no encontrado`;
        }
        return acc;
    }, {} as Record<number, string>);

    // Si hay errores, retornarlos
    if (Object.keys(childFieldErrors).length > 0) {
        return {
            errors: {
                childField: childFieldErrors,
                description: null
            },
            message: "Error creando usuario"
        };
    }

    const hijosIds = hijosExistentes.map(hijo => hijo.id);

    padre = {
        nombre: getNombre(formData.get('name')?.toString()) || 'null',
        apellido: getApellido(formData.get('name')?.toString()) || 'null',
        direccion: formData.get('address')?.toString() || 'null',
        numeroTelefono: formData.get('phone')?.toString() || 'null',
        correoElectronico: correoElectronico,
        dni: dni,
        usuario: {
            usuario: dni,
            password: dni
        },
        hijosIds: hijosIds
    }

    if (padre && await registrarPadre(padre))
        return {
            message: "Usuario Registrado"
        }
    else
        return {
            errors: {
                description: "Datos de padre inválidos / db"
            },
            message: "Error creando el usuario"
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
            errors: {description: "Datos de administrador inválidos / db"},
            message: "Error creando el usuario"
        }
}


export async function sendCurso(prevState: State, formData: FormData): Promise<State> {

    const materias = formData.getAll('materias[]').map(materia => materia.toString())

    //Filtrar materias que tengan al menos una letra
    const filteredMaterias = materias.filter(materia => {
        return /^(?=.*[a-zA-ZáéíóúñÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/.test(materia);
    });

    //Enviar error si no hay materias filtradas
    if (filteredMaterias.length < materias.length) {
        return {
            errors: {
                description: "Materias inválidas"
            },
            message: "Debe ingresar nombres de materias válidos"
        };
    }

    //Enviar error si hay materias duplicadas
    if (new Set(filteredMaterias).size !== filteredMaterias.length) {
        return {
            errors: {
                description: "Materias duplicadas"
            },
            message: "No puede haber dos materias iguales en el mismo curso"
        };
    }

    const materiasExistentes = await getAllMaterias();

    const materiasCoincidentes = materiasExistentes.filter(materiaExiste => {
        return filteredMaterias.some(materia => normalizeString(materia) === normalizeString(materiaExiste.nombre));
    })

    const materiasNuevas = filteredMaterias.filter(materia => {
        return !materiasExistentes.some(materiaExiste => normalizeString(materia) === normalizeString(materiaExiste.nombre));
    })

    const materiasIds = materiasCoincidentes.map(materia => {
        return materia.id
    })

    for (const materiaNueva of materiasNuevas) {
        const materiaCreada = await createMateria({
            nombre: capitalizeInitials(materiaNueva),
        })
        materiasIds.push(materiaCreada.id)
    }

    const name = formData.get('name')?.toString() || ''

    const curso = {
        nombre: name,
        materiasIds: materiasIds
    }

    try {
        await createCurso(curso)
        return {
            message: "Curso Creado"
        }
    } catch (e) {
        console.log(e)
        return {
            errors: {description: "Error creando el curso"},
            message: "Error creando el curso"
        }
    }
}


async function registrarAlumno(alumno: Alumno) {
    try {
        await createAlumno(alumno)
        return true;
    } catch (e) {
        console.log(e)
        return false
    }
}


async function registrarDocente(docente: Docente): Promise<{ success: boolean, error?: string }> {
    try {
        await createDocente(docente);
        return {success: true};
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
            return {success: false, error: e.message};
        } else {
            return {success: false, error: "Ocurrió un error desconocido"};
        }
    }
}

async function registrarPadre(padre: Padre) {
    try {
        await createPadre(padre)
        return true;
    } catch (e) {
        console.log(e)
        return false
    }
}

async function registrarAdministrador(administrador: Administrador): Promise<{ success: boolean, error?: string }> {
    try {
        await createAdministrativo(administrador);
        return {success: true};
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
            return {success: false, error: e.message};
        } else {
            return {success: false, error: "Ocurrio un error desconocido"};
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

