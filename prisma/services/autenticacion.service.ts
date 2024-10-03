import prisma from '../prismaClientInitialization';
import { Usuario } from '../interfaces';

export async function getUser(username: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
        where: { usuario: username },
        include: {
            padre: {
                include: { hijos: true }
            },
            alumno: true,
            docente: {
                include: { cursos: true }
            },
            administrativo: true
        },
    });
    return user;
}
