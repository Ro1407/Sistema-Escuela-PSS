import prisma from '../prismaClientInitialization';
import {Usuario} from '../interfaces';

export async function getUser(username: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
        where: { usuario: username },
        include: {
            padre: {
                include: { hijos: true }
            },
            alumno: {
                include: {
                    boletin: true,
                    amonestaciones: true,
                    asistencia: true,
                    notas: true
                }
            },
            docente: {
                include: { cursos: true }
            },
            administrativo: true
        },
    });
}
