import prisma from '../prismaClientInitialization';
import { Padre } from '../interfaces';
import { Rol } from '@prisma/client';

export async function createPadre(data: Omit<Padre, 'id' | 'usuario'> & { usuario: { usuario: string; password: string } }): Promise<Padre> {
    return prisma.padre.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            direccion: data.direccion,
            numeroTelefono: data.numeroTelefono,
            correoElectronico: data.correoElectronico,
            usuario: {
                create: {
                    usuario: data.usuario.usuario,
                    password: data.usuario.password,
                    rol: Rol.PADRE
                }
            }
        },
        include: {
            usuario: true 
        }
    });
}

export async function getPadre(id: string): Promise<Padre | null> {
    return prisma.padre.findUnique({
        where: { id },
        include: {
            usuario: true
        }
    });
}

export async function getAllPadres(): Promise<Padre[]> {
    return prisma.padre.findMany({
        include: {
            usuario: true
        }
    });
}

export async function updatePadre(id: string, data: Partial<Omit<Padre, 'id' | 'usuario'>> & { usuario?: { usuario?: string; password?: string } }): Promise<Padre> {
    const updateData: any = { ...data };

    if (data.usuario) {
        updateData.usuario = {
            update: {
                ...(data.usuario.usuario && { usuario: data.usuario.usuario }),
                ...(data.usuario.password && { password: data.usuario.password })
            }
        };
    }

    return prisma.padre.update({
        where: { id },
        data: updateData,
        include: {
            usuario: true
        }
    });
}

export async function deletePadre(id: string): Promise<Padre> {
    return prisma.padre.delete({
        where: { id },
        include: {
            usuario: true
        }
    });
}
