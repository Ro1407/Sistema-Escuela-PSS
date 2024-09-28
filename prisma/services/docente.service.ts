import prisma from '../prismaClientInitialization'
import { Docente } from '../interfaces'
import { Rol } from '@prisma/client'; 

export async function createDocente(data: Omit<Docente, 'id' | 'usuario'> & { usuario: { usuario: string; password: string }, materiasIds: string[] }): Promise<Docente> {
    return prisma.docente.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            direccion: data.direccion,
            matricula: data.matricula,
            numeroTelefono: data.numeroTelefono,
            correoElectronico: data.correoElectronico,
            usuario: {
                create: {
                    usuario: data.usuario.usuario,
                    password: data.usuario.password,
                    rol: Rol.DOCENTE
                }
            },
            materias: {
                connect: data.materiasIds.map((id) => ({ id })) 
            }
        },
        include: {
            usuario: true,
            materias: true 
        }
    });
}

export async function getDocente(id: string): Promise<Docente | null> {
    return prisma.docente.findUnique({
        where: { id },
        include: {
            usuario: true, 
            materias: true 
        }
    });
}

export async function getAllDocentes(): Promise<Docente[]> {
    return prisma.docente.findMany({
        include: {
            usuario: true,
            materias: true 
        }
    });
}

export async function updateDocente(id: string, data: Partial<Omit<Docente, 'id' | 'usuario'>> & { usuario?: { usuario?: string; password?: string }, materiasIds?: string[] }): Promise<Docente> {
    const updateData: any = { ...data };

    if (data.usuario) {
        updateData.usuario = {
            update: {
                ...(data.usuario.usuario && { usuario: data.usuario.usuario }),
                ...(data.usuario.password && { password: data.usuario.password })
            }
        };
    }

    if (data.materiasIds) {
        updateData.materias = {
            set: data.materiasIds.map((id) => ({ id })) 
        };
    }

    return prisma.docente.update({
        where: { id },
        data: updateData,
        include: {
            usuario: true, 
            materias: true
        }
    });
}

export async function deleteDocente(id: string): Promise<Docente> {
    return prisma.docente.delete({
        where: { id },
        include: {
            usuario: true,
            materias: true
        }
    });
}