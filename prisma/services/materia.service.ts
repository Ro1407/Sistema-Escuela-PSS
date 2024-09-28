import prisma from '../prismaClientInitialization';
import { Materia } from '../interfaces';

export async function createMateria(data: Omit<Materia, 'id'> & { alumnosIds?: string[] }): Promise<Materia> {
    return prisma.materia.create({
        data: {
            nombre: data.nombre,
            docente: {
                connect: { id: data.docenteId }
            },
            alumnos: data.alumnosIds ? {
                connect: data.alumnosIds.map(id => ({ id })) 
            } : undefined
        },
        include: {
            docente: true,  
            alumnos: {
                include: {
                    usuario: true, 
                    materias: true
                }
            }
        }
    });
}

export async function getMateria(id: string): Promise<Materia | null> {
    return prisma.materia.findUnique({
        where: { id },
        include: {
            docente: true, 
            alumnos: {
                include: {
                    usuario: true,
                    materias: true 
                }
            }
        }
    });
}

export async function getAllMaterias(): Promise<Materia[]> {
    return prisma.materia.findMany({
        include: {
            docente: true,
            alumnos: {
                include: {
                    usuario: true,
                    materias: true
                }
            }
        }
    });
}


export async function updateMateria(id: string, data: Partial<Omit<Materia, 'id'>> & { alumnosIds?: string[] }): Promise<Materia> {
    const updateData: any = { ...data };

    if (data.alumnosIds) {
        updateData.alumnos = {
            set: data.alumnosIds.map(id => ({ id }))
        };
    }

    return prisma.materia.update({
        where: { id },
        data: updateData,
        include: {
            docente: true,  
            alumnos: {
                include: {
                    usuario: true, 
                    materias: true  
                }
            }
        }
    });
}

export async function deleteMateria(id: string): Promise<Materia> {
    return prisma.materia.delete({
        where: { id },
        include: {
            docente: true, 
            alumnos: {
                include: {
                    usuario: true,
                    materias: true 
                }
            }
        }
    });
}
