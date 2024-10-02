import prisma from '../prismaClientInitialization';
import { Rol } from '@prisma/client'; 
import { Administrativo } from '../interfaces';

export async function createAdministrativo(
    data: Omit<Administrativo, 'id' | 'usuario'> & { usuario: { usuario: string; password: string } }
): Promise<Administrativo> {
    return await prisma.administrativo.create({
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
                    rol: Rol.ADMINISTRATIVO 
                }
            }
        },
        include: {
            usuario: true 
        }
    });
}

export async function getAdministrativo(id: string): Promise<Administrativo | null> {
    return prisma.administrativo.findUnique({
        where: { id },
        include: {
            usuario: true
        }
    });
}

export async function getAllAdministrativos(): Promise<Administrativo[]> {
    return prisma.administrativo.findMany({
        include: {
            usuario: true
        }
    });
}

export async function updateAdministrativo(
    id: string,
    data: Partial<Omit<Administrativo, 'id' | 'usuario'>> & { usuario?: { usuario?: string; password?: string } }
): Promise<Administrativo> {
    const updateData: any = { ...data };

    if (data.usuario) {
        updateData.usuario = {
            update: {
                ...(data.usuario.usuario && { usuario: data.usuario.usuario }),
                ...(data.usuario.password && { password: data.usuario.password })
            }
        };
    }

    return prisma.administrativo.update({
        where: { id },
        data: updateData,
        include: {
            usuario: true
        }
    });
}

export async function deleteAdministrativo(id: string): Promise<Administrativo> {
    return prisma.administrativo.delete({
        where: { id },
        include: {
            usuario: true
        }
    });
}