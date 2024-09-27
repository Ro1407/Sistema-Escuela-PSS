//TypeScript interfaces for Prisma models

export interface Padre {
    id: string
    usuario: string
    password: string
    nombre: string
    apellido: string
    direccion: string
    numeroTelefono: string
    correoElectronico: string
}

export interface Alumno {
    id: string;
    usuario: string;
    password: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    curso: string;
    numeroMatricula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
}

export interface Docente {
    id: string;
    usuario: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    matricula: string;
    numeroTelefono: string;
    correoElectronico: string;
}

export interface Administrativo {
    id: string;
    usuario: string;
    password: string;
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
}