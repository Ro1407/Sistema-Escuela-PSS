import prisma from '../prismaClientInitialization';
import { Alumno } from '../interfaces';
import { Rol } from '@prisma/client'; 

function stripTime(date: Date): Date {
    return new Date(date.toISOString().split('T')[0]);
}

export async function createAlumno(data: Omit<Alumno, 'id' | 'usuario' | 'materias'> & { usuario: { usuario: string; password: string }, materiasIds: string[] }): Promise<Alumno> {
    const { fechaNacimiento, materiasIds, ...rest } = data;

    return prisma.alumno.create({
        data: {
            ...rest,
            fechaNacimiento: stripTime(fechaNacimiento),
            usuario: {
                create: {
                    usuario: data.usuario.usuario,
                    password: data.usuario.password,
                    rol: Rol.ALUMNO
                }
            },
            materias: {
                connect: materiasIds.map((id) => ({ id }))
            }
        },
        include: {
            usuario: true,
            materias: true 
        }
    });
}

export async function getAlumno(id: string): Promise<Alumno | null> {
    const alumno = await prisma.alumno.findUnique({
        where: { id },
        include: {
            usuario: true,
            materias: true
        }
    });
    
    if (alumno) {
        alumno.fechaNacimiento = stripTime(alumno.fechaNacimiento);
    }

    return alumno;
}

export async function getAllAlumnos(): Promise<Alumno[]> {
    const alumnos = await prisma.alumno.findMany({
        include: {
            usuario: true,
            materias: true
        }
    });
    return alumnos.map((alumno) => ({
        ...alumno,
        fechaNacimiento: stripTime(alumno.fechaNacimiento),
    }));
}

export async function updateAlumno(id: string, data: Partial<Omit<Alumno, 'id' | 'usuario'>> & { usuario?: { usuario?: string; password?: string } }): Promise<Alumno> {
    const { fechaNacimiento, ...rest } = data;
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
            ...updateData,
            ...(fechaNacimiento && { fechaNacimiento: stripTime(fechaNacimiento) })
        },
        include: {
            usuario: true, 
            materias: true
        }
    });
}

export async function deleteAlumno(id: string): Promise<Alumno> {
    return prisma.alumno.delete({
        where: { id },
        include: {
            usuario: true,
            materias: true
        }
    });
}
