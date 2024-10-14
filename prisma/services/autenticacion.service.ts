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

export async function dniExists(dni: string): Promise<boolean> {
    const user = await prisma.usuario.findFirst({
        where: {
            OR: [
                { padre: { dni } },
                { alumno: { dni } },
                { docente: { dni } },
                { administrativo: { dni } }
            ]
        }
    });
    return !!user;
}

export async function correoElectronicoExists(correoElectronico: string): Promise<boolean> {
    const user = await prisma.usuario.findFirst({
        where: {
            OR: [
                { padre: { correoElectronico } },
                { alumno: { correoElectronico } },
                { docente: { correoElectronico } },
                { administrativo: { correoElectronico } }
            ]
        }
    });
    return !!user;
}

export async function matriculaAlumnoExists(numeroMatricula: string): Promise<boolean> {
    const alumno = await prisma.alumno.findUnique({
        where: { numeroMatricula }
    });
    return !!alumno;
}

export async function matriculaDocenteExists(matricula: string): Promise<boolean> {
    const docente = await prisma.docente.findUnique({
        where: {matricula}
    });
    return !!docente;
}
