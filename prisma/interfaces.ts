// TypeScript interfaces for Prisma models
import { Usuario as PrismaUsuario, Tipo as PrismaTipo, TipoAsistencia as PrismaTipoAsistencia, Periodo as PrismaPeriodo } from '@prisma/client';

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
    amonestaciones?: Amonestacion[];
    asistencia?: Asistencia[];
    notas?: Nota[];
    boletin?: Boletin[];
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
    notas?: Nota[];
}

export interface Curso {
    id: string;
    nombre: string;
    materias?: Materia[];
    docentes?: Docente[];
    alumnos?: Alumno[];
}

export interface Amonestacion {
    id: string;
    tipo: PrismaTipo;
    fecha: Date;
    descripcion: string;
    firma: boolean;
    alumnoId: string;
}

export interface Asistencia {
    id: string;
    fecha: Date;
    tipo_asistencia: PrismaTipoAsistencia;
    alumnoId: string;
}

export interface Nota {
    id: string;
    calificacion: string;
    alumnoId: string;
    materiaId: string;
    boletinId: string;
}

export interface Boletin {
    id: string;
    periodo: PrismaPeriodo;
    anio: string;
    alumnoId: string;
    notas?: Nota[];
}