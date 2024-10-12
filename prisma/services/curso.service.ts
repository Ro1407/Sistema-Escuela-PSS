import { Curso, Materia } from '../interfaces';
import prisma from '../prismaClientInitialization';

export async function createCurso(data: Omit<Curso, 'id' | 'materias'> & { materiasIds: string[] }): Promise<Curso> {
    return prisma.curso.create({
        data: {
            nombre: data.nombre,
            materias: {
                connect: data.materiasIds.map(id => ({id})) 
            }
        }
    });
}

export async function updateMateriasCurso(id: string,  newMateriasIds: string[], deletedMateriasIds: string[]): Promise<Curso> {
    return prisma.curso.update({
        where: {id},
        data: {
            materias: {
                connect: newMateriasIds.map(id => ({id})), 
                disconnect: deletedMateriasIds.map(id => ({id}))
            }
        }
    });
}

export async function getAllCursosNombreID(){
    return prisma.curso.findMany(
        {select: {
            id: true,
            nombre: true,}
        });
}


export async function getCursoConMaterias(id: string): Promise<Curso | null> {
    return prisma.curso.findUnique({
        where: {id},
        include: {
            materias: true
        }
    });
}

export async function getAllCursosConMaterias(): Promise<Curso[]> {
    return prisma.curso.findMany({
        include: {
            materias: true
        }
    });
}

export async function deleteCursoById(id: string) {
    return prisma.curso.delete({
        where: {id}
    });
}