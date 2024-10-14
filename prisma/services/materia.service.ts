import prisma from '../prismaClientInitialization';
import {Materia} from '../interfaces';

export async function createMateria(data: Omit<Materia, 'id' | 'docente' | 'cursos'> & {
    docenteId?: string,
    cursosIds?: string[]
}): Promise<Materia> {
    return prisma.materia.create({
        data: {
            nombre: data.nombre,
            docente: data.docenteId ? {connect: {id: data.docenteId}} : undefined,
            cursos: data.cursosIds ? {connect: data.cursosIds.map(id => ({id}))} : undefined
        },
        include: {
            docente: true,
            cursos: true,
        }
    });
}

export async function getMateria(id: string): Promise<Materia | null> {
    return prisma.materia.findUnique({
        where: {id},
        include: {
            docente: true,
            cursos: true
        }
    });
}

export async function getAllMaterias(): Promise<Materia[]> {
    return prisma.materia.findMany({
        include: {
            docente: true,
            cursos: true
        }
    });
}

//Retorna id y nombre de toda materia sin docente que esté en TODOS los cursos pasados por parámetro
export async function getNombreIDMateriasSinDocente(cursoIds: string[]) {
    if (cursoIds.length === 0) {
        return [];
    }

    const materias = await prisma.materia.findMany({
        where: { docente: null },
        select: {
            id: true,
            nombre: true,
            cursos: {
                select: {
                    id: true
                }
            }
        }
    });

    return materias.filter(materia => {
        const materiaCursoIds = materia.cursos.map(curso => curso.id);
        return cursoIds.length === materiaCursoIds.length && cursoIds.every(id => materiaCursoIds.includes(id));
    }).map(materia => ({
        id: materia.id,
        nombre: materia.nombre
    }));
}

export async function updateMateria(id: string, data: Partial<Omit<Materia, 'id' | 'docente' | 'cursos'>> & {
    docenteId?: string,
    cursosIds?: string[],
    alumnosIds?: string[]
}): Promise<Materia> {
    const updateData: any = {...data};

    if (data.docenteId) {
        updateData.docente = {
            connect: {id: data.docenteId}
        };
    } else {
        updateData.docente = {
            connect: undefined
        };
    }

    if (data.cursosIds) {
        updateData.cursos = {
            set: data.cursosIds.map(id => ({id}))
        };
    }

    if (data.alumnosIds) {
        updateData.alumnos = {
            set: data.alumnosIds.map(id => ({id}))
        };
    }

    return prisma.materia.update({
        where: {id},
        data: updateData,
        include: {
            docente: true,
            cursos: true
        }
    });
}

export async function getMateriasCurso(idCurso: string): Promise<Materia[]> {
    return prisma.materia.findMany({
        where: {cursos: {some: {id: idCurso}}},
        include: {
            cursos: true
        }
    });
}

export async function deleteMateria(id: string): Promise<Materia> {
    return prisma.materia.delete({
        where: {id},
        include: {
            docente: true,
            cursos: true
        }
    });
}
