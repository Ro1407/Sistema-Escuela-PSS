import prisma from '../prismaClientInitialization'
import { Materia } from '../interfaces'

export async function createMateria(data: Omit<Materia, 'id'>): Promise<Materia> {
    return prisma.materia.create({ data })
}

export async function getMateria(id: string): Promise<Materia | null> {
    return prisma.materia.findUnique({ where: { id } })
}

export async function getAllMaterias(): Promise<Materia[]> {
    return prisma.materia.findMany();
}

export async function updateMateria(id: string, data: Partial<Omit<Materia, 'id'>>): Promise<Materia> {
    return prisma.materia.update({ where: { id }, data })
}

export async function deleteMateria(id: string): Promise<Materia> {
    return prisma.materia.delete({ where: { id } })
}