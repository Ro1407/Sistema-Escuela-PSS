import prisma from '../prismaClientInitialization';
import { Alumno } from '../interfaces';
import { Rol } from '@prisma/client'; 

function stripTime(date: Date): Date {
    return new Date(date.toISOString().split('T')[0]);
}

export async function createAlumno(data: Omit<Alumno, 'id' | 'usuario'> & { usuario: { usuario: string; password: string } }): Promise<Alumno> {
    const { padreId, usuario, ...rest } = data;

    const alumnoData: any = {
        ...rest,
        usuario: {
            create: {
                usuario: usuario.usuario,
                password: usuario.password,
                rol: Rol.ALUMNO
            }
        },
        cursoId: data.cursoId
    };

    if (padreId) {
        alumnoData.padreId = padreId;
    }

    return prisma.alumno.create({
        data: alumnoData,
        include: {
            usuario: true
        }
    });
}

export async function getAlumno(id: string): Promise<Alumno | null> {
    const alumno = await prisma.alumno.findUnique({
        where: { id },
        include: {
            usuario: true
        }
    });

    return alumno;
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
