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
    direccion: string;
    numeroTelefono: string;
    correoElectronico: string;
}

export interface Alumno {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    curso: string;
    numeroMatricula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    materias?: Materia[];
}

export interface Docente {
    id: string;
    nombre: string;
    apellido: string;
    direccion: string;
    matricula: string;
    numeroTelefono: string;
    correoElectronico: string;
    materias?: Materia[];
}

export interface Administrativo {
    id: string;
    nombre: string;
    apellido: string;
    direccion: string;
    numeroTelefono: string;
    correoElectronico: string;
}

export interface Materia {
    id: string;
    nombre: string;
    docenteId: string;
    alumnos?: Alumno[];
}