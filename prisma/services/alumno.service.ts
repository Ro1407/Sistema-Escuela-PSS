import prisma from '../prismaClientInitialization';
import { Alumno, Tipo } from '@prisma/client'; 
import { Rol } from '@prisma/client';

export async function createAlumno(data: Omit<Alumno, 'id' | 'usuario'> & { usuario: { usuario: string; password: string } }): Promise<Alumno> {
    return prisma.alumno.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            numeroMatricula: data.numeroMatricula,
            direccion: data.direccion,
            telefono: data.telefono,
            correoElectronico: data.correoElectronico,
            usuario: {
                create: {
                    usuario: data.usuario.usuario,
                    password: data.usuario.password,
                    rol: Rol.ALUMNO
                }
            },
            curso: {
                connect: { id: data.cursoId }
            },
            padre: data.padreId ? { connect: { id: data.padreId } } : undefined
        },
        include: {
            usuario: true,
            curso: true,
            padre: true,
            amonestaciones: true, 
            asistencia: true,
            notas: true,
            boletin: true
        }
    });
}

export async function getAlumno(id: string): Promise<Alumno | null> {
    return prisma.alumno.findUnique({
        where: { id },
        include: {
            usuario: true,
            amonestaciones: true,
            asistencia: true,
            notas: true,
            boletin: true
        }
    });
}

export async function getAlumnosByName(nombres: string[]): Promise<Alumno[]> {
    return prisma.alumno.findMany({
        where: {
            nombre: {
                in: nombres
            }
        }
    });
}

export async function getAlumnosByDNI(dnis: string[]): Promise<Alumno[]> {
    return prisma.alumno.findMany({
        where: {
            dni: {
                in: dnis
            }
        }
    });
}

export async function getAllAlumnos(): Promise<Alumno[]> {
    const alumnos = await prisma.alumno.findMany({
        include: {
            usuario: true
        }
    });
    return alumnos.map((alumno) => ({
        ...alumno
    }));
}

export async function getAlumnosSinPadre(): Promise<{ id: string, nombre: string, apellido:string, correoElectronico:string }[]> {
    return prisma.alumno.findMany({
        where: {
            padreId: null
        },
        select: {
            id: true,
            nombre: true,
            apellido: true,
            correoElectronico: true,
        }
    });
}

export async function updateAlumno(id: string, data: Partial<Omit<Alumno, 'id' | 'usuario'>> & { usuario?: { usuario?: string; password?: string } }): Promise<Alumno> {
    const { ...rest } = data;
    const updateData: any = { ...rest };

    if (data.usuario) {
        updateData.usuario = {
            update: {
                ...(data.usuario.usuario && { usuario: data.usuario.usuario }),
                ...(data.usuario.password && { password: data.usuario.password })
            }
        };
    }

    return prisma.alumno.update({
        where: { id },
        data: {
            ...updateData
        },
        include: {
            usuario: true
        }
    });
}

export async function deleteAlumno(id: string): Promise<Alumno> {
    return prisma.alumno.delete({
        where: { id },
        include: {
            usuario: true
        }
    });
}
