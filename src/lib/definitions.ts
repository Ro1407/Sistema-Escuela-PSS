
export type State = {
    errors?: string | null;
    message?: string | null;
  };
  /*
  export interface Materia {
    id: string;
    nombre: string;
    docenteId: string;
    alumnos?: Alumno[];
}

export type Alumno = {
    nbre : string, 
    dni : number,
    direccion : string,
    tel : number,
    email : string,
    curso : string,
    tutor : string,
    matricula : number
  }

  */

  export interface Alumno {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    curso: string;
    numeroMatricula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    usuario: {
      usuario: string,
      password: string
    }
    materiasIds : string[]
}

export interface Materia {
  id: string;
  nombre: string;
  docenteId: string;
  alumnos?: Alumno[];
}

export interface Padre {
  usuario: {
    usuario: string,
    password: string
  }
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  correoElectronico: string;
  hijos : string[]
}