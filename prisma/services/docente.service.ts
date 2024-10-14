import prisma from '../prismaClientInitialization'
import { Docente, Materia } from '../interfaces'
import { Rol, Usuario } from '@prisma/client';

export async function createDocente(data: Omit<Docente, 'id' | 'usuario' | 'cursos'> & { usuario: { usuario: string; password: string }, cursosIds: string[] }): Promise<Docente | null> {
    try {

        const materiaConDocente = await prisma.materia.findUnique({
            where: { id: data.materiaId },
            select: { docente: true }
        });

        if (materiaConDocente?.docente) {
            throw new Error('La materia ya tiene un docente asignado');
        }

        return await prisma.docente.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                dni: data.dni,
                direccion: data.direccion,
                matricula: data.matricula,
                numeroTelefono: data.numeroTelefono,
                correoElectronico: data.correoElectronico,
                cursos: data.cursosIds ? { connect: data.cursosIds.map(id => ({ id })) } : undefined,
                usuario: {
                    create: {
                        usuario: data.usuario.usuario,
                        password: data.usuario.password,
                        rol: Rol.DOCENTE,
                    }
                },
                materia: {
                    connect: { id: data.materiaId }
                },
            },
            include: {
                usuario: true,
                cursos: true,
                materia: true,
            }
        });
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : 'Error en la base de datos al registrar el docente');
    }
}

export async function getDocente(id: string): Promise<Docente | null> {
    return prisma.docente.findUnique({
        where: { id },
        include: {
            usuario: true, 
            materia: true 
        }
    });
}

export async function getDocenteByDNI(dni: string): Promise<Docente & { materia: Materia} | null> {
    return prisma.docente.findUnique({
        where: { dni },
        include: {
            materia: true,
            cursos: true
        }
    });
}

export async function getAllDocentes(): Promise<Docente[]> {
    return prisma.docente.findMany({
        include: {
            usuario: true,
            materia: true 
        }
    });
}

export async function updateDocente(id: string, data: Omit<Docente, 'id' | 'usuario' | 'cursos'> & { usuario: { usuario: string; password?: string }, cursosIds: string[] }): Promise<Docente | null> {
    try {
        // Verifica si la materia tiene asignado otro docente, si es necesario
        const materiaConDocente = await prisma.materia.findUnique({
            where: { id: data.materiaId },
            select: { docente: true }
        });

        if (materiaConDocente?.docente && materiaConDocente.docente.id !== id) {
            throw new Error('La materia ya tiene otro docente asignado');
        }

        return await prisma.docente.update({
            where: { id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                dni: data.dni,
                direccion: data.direccion,
                matricula: data.matricula,
                numeroTelefono: data.numeroTelefono,
                correoElectronico: data.correoElectronico,
                cursos: data.cursosIds ? {
                    set: data.cursosIds.map(id => ({ id }))  // Actualiza la relación de cursos
                } : undefined,
                usuario: {
                    update: {
                        usuario: data.usuario.usuario,
                        ...(data.usuario.password && { password: data.usuario.password })  // Solo actualiza si la password está presente
                    }
                },
                materia: {
                    connect: { id: data.materiaId }
                },
            },
            include: {
                usuario: true,
                cursos: true,
                materia: true,
            }
        });
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : 'Error en la base de datos al actualizar el docente');
    }
}


export async function deleteDocente(id: string): Promise<Docente> {
    return prisma.docente.delete({
        where: { id },
        include: {
            usuario: true,
            materia: true
        }
    });
}