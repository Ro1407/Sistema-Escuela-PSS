import prisma from '../prismaClientInitialization';
import { Padre } from '../interfaces';
import { Rol } from '@prisma/client';

export async function createPadre(data: Omit<Padre, 'id' | 'usuario' | 'hijos'> & { usuario: { usuario: string; password: string }, hijosIds: string[] }): Promise<Padre> {
    return prisma.padre.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            direccion: data.direccion,
            numeroTelefono: data.numeroTelefono,
            correoElectronico: data.correoElectronico,
            usuario: {
                create: {
                    usuario: data.usuario.usuario,
                    password: data.usuario.password,
                    rol: Rol.PADRE
                }
            },
            hijos: {
                connect: data.hijosIds.map(id => ({ id }))
            }
        },
        include: {
            usuario: true,
            hijos: true
        }
    });
}

export async function getPadre(id: string): Promise<Padre | null> {
    return prisma.padre.findUnique({
        where: { id },
        include: {
            usuario: true,
            hijos: true
        }
    });
}

export async function getPadreByDNI(dni: string): Promise<Padre | null> {
    return prisma.padre.findUnique({
        where: { dni },
        include: {
            hijos: true
        }
    });
}

export async function getAllPadres(): Promise<Padre[]> {
    return prisma.padre.findMany({
        include: {
            usuario: true,
            hijos: true
        }
    });
}

export async function getAlumnosSinPadre(): Promise<{ id: string, nombre: string }[]> {
    return prisma.alumno.findMany({
        where: {
            padreId: null
        },
        select: {
            id: true,
            nombre: true
        }
    });
}


export async function updatePadre(id: string, data: Omit<Padre, 'id' | 'usuario' | 'hijos'> & { usuario: { usuario: string; password?: string }, hijosIds: string[] }): Promise<Padre> {
    try {
        return await prisma.padre.update({
            where: { id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                dni: data.dni,
                direccion: data.direccion,
                numeroTelefono: data.numeroTelefono,
                correoElectronico: data.correoElectronico,
                hijos: {
                    set: data.hijosIds.map(id => ({ id }))  // Reemplaza la relación con los nuevos hijos
                },
                usuario: {
                    update: {
                        usuario: data.usuario.usuario,
                        ...(data.usuario.password && { password: data.usuario.password })  // Solo actualiza si se proporciona la nueva contraseña
                    }
                }
            },
            include: {
                usuario: true,
                hijos: true
            }
        });
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : 'Error en la base de datos al actualizar el padre');
    }
}


export async function deletePadre(id: string): Promise<Padre> {
    return prisma.padre.delete({
        where: { id },
        include: {
            usuario: true,
            hijos: true
        }
    });
}