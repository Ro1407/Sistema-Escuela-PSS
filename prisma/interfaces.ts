// TypeScript interfaces for Prisma models
import { Usuario as PrismaUsuario } from '@prisma/client';

export interface Usuario extends PrismaUsuario {
    padre?: Padre | null;
    alumno?: Alumno | null;
    docente?: Docente | null;
    administrativo?: Administrativo | null;
}

export interface Padre {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    direccion: string;
    numeroTelefono: string;
    correoElectronico: string;
    hijos: Alumno[];
}

export interface Alumno {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    numeroMatricula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    padreId?: string | null; 
    cursoId: string;
}

export interface Docente {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    direccion: string;
    matricula: string;
    numeroTelefono: string;
    correoElectronico: string;
    cursos?: Curso[];
    materiaId: string;
}

export interface Administrativo {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    direccion: string;
    numeroTelefono: string;
    correoElectronico: string;
}

export interface Materia {
    id: string;
    nombre: string;
    docente?: Docente | null;
    cursos?: Curso[];
}

export interface Curso {
    id: string;
    nombre: string;
    materias?: Materia[];
    docentes?: Docente[];
    alumnos?: Alumno[];
}