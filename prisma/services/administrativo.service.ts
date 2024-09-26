import prisma from '../prismaClientInitialization'
import { Administrativo } from '../interfaces'

export async function createAdministrativo(data: Omit<Administrativo, 'id'>): Promise<Administrativo> {
    return prisma.administrativo.create({ data })
}

export async function getAdministrativo(id: string): Promise<Administrativo | null> {
    return prisma.administrativo.findUnique({ where: { id } })
}

export async function updateAdministrativo(id: string, data: Partial<Omit<Administrativo, 'id'>>): Promise<Administrativo> {
    return prisma.administrativo.update({ where: { id }, data })
}

export async function deleteAdministrativo(id: string): Promise<Administrativo> {
    return prisma.administrativo.delete({ where: { id } })
}