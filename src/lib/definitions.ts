
export type State = {
  errors?: {
    description?: string | null 
    childField?: Record<number, string> | null;
  } | null;
  message?: string | null;
};

export interface UsuarioJWT {
  id: string;
  usuario: string,
  rol: string
}

export interface AlumnoForm {
  nombre: string;
  apellido: string;
  cursoId: string;
  dni: string;
  numeroMatricula: string;
  direccion: string;
  telefono: string;
  correoElectronico: string;
  padreId: string | null;
  usuario: {
    usuario: string,
    password: string
  }
}

export interface Materia {
  id: string;
  nombre: string;
  docenteId: string;
  alumnos?: AlumnoForm[];
}

export interface DocenteForm {
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

export interface PadreForm {
  usuario: {
    usuario: string,
    password: string
  }
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  correoElectronico: string;
  dni: string;
  hijosIds: string[]
}

export interface AdministradorForm {
  usuario: {
    usuario: string,
    password: string
  }
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  numeroTelefono: string;
  correoElectronico: string;
}


export interface UsuarioBase {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  numeroTelefono: string;
  correoElectronico: string;
}

export interface Padre extends UsuarioBase {
  hijos: Alumno[];
  tipo: 'PADRE'
}

export interface Alumno extends UsuarioBase {
  numeroMatricula: string;
  padreId?: string | null; 
  cursoId: string;
  tipo: 'ALUMNO'
}

export interface Docente extends UsuarioBase {
  matricula: string;
  materiaId: string;
  materia: MateriaBasica;
  cursos?: Curso[];
  tipo: 'DOCENTE'	
}

export interface Administrativo extends UsuarioBase {
  tipo: 'ADMINISTRATIVO'
}

export type User = Alumno | Docente | Padre | Administrativo

export interface MateriaBasica {
  id: string;
  nombre: string;
}

export interface Curso {
  id: string;
  nombre: string;
}
