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

export async function getAllPadres(): Promise<Padre[]> {
    return prisma.padre.findMany({
        include: {
            usuario: true,
            hijos: true
        }
    });
}

export async function updatePadre(id: string, data: Partial<Omit<Padre, 'id' | 'usuario' | 'hijos'>> & { usuario?: { usuario?: string; password?: string }, hijosIds?: string[] }): Promise<Padre> {
    const updateData: any = { ...data };

    if (data.usuario) {
        updateData.usuario = {
            update: {
                ...(data.usuario.usuario && { usuario: data.usuario.usuario }),
                ...(data.usuario.password && { password: data.usuario.password })
            }
        };
    }

    if (data.hijosIds) {
        updateData.hijos = {
            set: data.hijosIds.map(id => ({ id }))
        };
    }

    return prisma.padre.update({
        where: { id },
        data: updateData,
        include: {
            usuario: true,
            hijos: true 
        }
    });
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