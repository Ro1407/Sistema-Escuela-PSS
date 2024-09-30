'use server'

import { createAlumno } from "../../prisma/services/alumno.service";
import { State } from "./definitions";
import { Alumno} from "./definitions"


export async function sendUser(prevState : State, formData : FormData) : Promise<State>{
    const userTy = formData.get('userType')
    let alumno: Alumno | undefined;
    if(userTy == "alumno"){
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