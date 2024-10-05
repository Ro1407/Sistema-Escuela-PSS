
export type State = {
  errors?: string | null;
  message?: string | null;
};


/*
export type Alumno = {
  nbre: string,
  dni: number,
  direccion: string,
  tel: number,
  email: string,
  curso: string,
  tutor: string,
  matricula: number
}

  */

export interface UsuarioJWT {
  id: string;
  usuario: string,
  rol: string
}

export interface Alumno {
  nombre: string;
  apellido: string;
  cursoId: string;
  dni: string;
  numeroMatricula: string;
  direccion: string;
  telefono: string;
  correoElectronico: string;
  usuario: {
    usuario: string,
    password: string
  }
}

export interface Materia {
  id: string;
  nombre: string;
  docenteId: string;
  alumnos?: Alumno[];
}

export interface Docente {
  usuario: {
    usuario: string,
    password: string
  }
  nombre: string;
  apellido: string;
  direccion: string;
  matricula: string;
  numeroTelefono: string;
  correoElectronico: string;
  dni: string;
  materiaId: string
  cursosIds: string[]
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
  hijos: string[]
}
