import prisma from '../prismaClientInitialization';

export async function getAllCursosNombreID(){
    return prisma.curso.findMany(
        {select: {
            id: true,
            nombre: true,}
        });
}
