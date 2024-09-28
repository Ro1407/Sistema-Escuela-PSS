/* These files contain CRUD functions. They use the Prisma client to interact with the database.*/

import prisma from '../prismaClientInitialization'
import { Padre } from '../interfaces'

export async function createPadre(data: Omit<Padre, 'id'>): Promise<Padre> {
    return prisma.padre.create({ data })
}

export async function getPadre(id: string): Promise<Padre | null> {
    return prisma.padre.findUnique({ where: { id } })
}

export async function getAllPadres(): Promise<Padre[]> {
    return prisma.padre.findMany();
}

export async function updatePadre(id: string, data: Partial<Omit<Padre, 'id'>>): Promise<Padre> {
    return prisma.padre.update({ where: { id }, data })
}

export async function deletePadre(id: string): Promise<Padre> {
    return prisma.padre.delete({ where: { id } })
}