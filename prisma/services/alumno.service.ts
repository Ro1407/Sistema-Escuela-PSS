import prisma from '../prismaClientInitialization';
import { Alumno } from '../interfaces';

function stripTime(date: Date): Date {
    return new Date(date.toISOString().split('T')[0]);
}

export async function createAlumno(data: Omit<Alumno, 'id'>): Promise<Alumno> {
    const { fechaNacimiento, ...rest } = data;
    return prisma.alumno.create({
        data: {
            ...rest,
            fechaNacimiento: stripTime(fechaNacimiento),
        },
    });
}

export async function getAlumno(id: string): Promise<Alumno | null> {
    const alumno = await prisma.alumno.findUnique({ where: { id } });
    if (alumno) {
        alumno.fechaNacimiento = stripTime(alumno.fechaNacimiento);
    }
    return alumno;
}

export async function updateAlumno(id: string, data: Partial<Omit<Alumno, 'id'>>): Promise<Alumno> {
    const { fechaNacimiento, ...rest } = data;
    return prisma.alumno.update({
        where: { id },
        data: {
            ...rest,
            ...(fechaNacimiento && { fechaNacimiento: stripTime(fechaNacimiento) }),
        },
    });
}

export async function deleteAlumno(id: string): Promise<Alumno> {
    return prisma.alumno.delete({ where: { id } });
}

