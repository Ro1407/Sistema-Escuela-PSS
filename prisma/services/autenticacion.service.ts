import prisma from '../prismaClientInitialization';
import { Usuario } from '../interfaces';

export async function getUser(username: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
        where: { usuario: username },
        include: { padre: true, alumno: true, docente: true, administrativo: true },
    });
    return user;
}
