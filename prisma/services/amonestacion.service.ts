import prisma from '../prismaClientInitialization';
import { Amonestacion } from '../interfaces';

export async function createAmonestacion(
  data: Omit<Amonestacion, 'id'>
): Promise<Amonestacion> {
  return prisma.amonestacion.create({
    data: {
      tipo: data.tipo,
      fecha: data.fecha,
      descripcion: data.descripcion,
      firma: data.firma,
      alumno: {
        connect: { id: data.alumnoId }
      }
    }
  });
}

export async function getAmonestacion(id: string): Promise<Amonestacion | null> {
  return prisma.amonestacion.findUnique({
    where: { id },
    include: {
      alumno: true
    }
  });
}

export async function getAllAmonestaciones(): Promise<Amonestacion[]> {
  return prisma.amonestacion.findMany({
    include: {
      alumno: true
    }
  });
}

export async function updateAmonestacion(
    id: string,
    data: Partial<Omit<Amonestacion, 'id' | 'alumnoId'> & { alumnoId?: string }>
  ): Promise<Amonestacion> {
    const updateData: any = { ...data };
  
    if (data.alumnoId) {
      updateData.alumno = { connect: { id: data.alumnoId } };
    }
  
    return prisma.amonestacion.update({
      where: { id },
      data: updateData,
      include: {
        alumno: true
      }
    });
}

export async function deleteAmonestacion(id: string): Promise<Amonestacion> {
  return prisma.amonestacion.delete({
    where: { id },
    include: {
      alumno: true
    }
  });
}
