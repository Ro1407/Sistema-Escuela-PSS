import prisma from '../prismaClientInitialization'
import { Docente } from '../interfaces'

export async function createDocente(data: Omit<Docente, 'id'>): Promise<Docente> {
    return prisma.docente.create({ data })
}

export async function getDocente(id: string): Promise<Docente | null> {
    return prisma.docente.findUnique({ where: { id } })
}

export async function getAllDocentes(): Promise<Docente[]> {
    return prisma.docente.findMany();
}

export async function updateDocente(id: string, data: Partial<Omit<Docente, 'id'>>): Promise<Docente> {
    return prisma.docente.update({ where: { id }, data })
}

export async function deleteDocente(id: string): Promise<Docente> {
    return prisma. docente.delete({ where: { id } })
}