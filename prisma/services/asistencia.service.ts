import { startOfDay } from 'date-fns';
import prisma from '../prismaClientInitialization';
import { TipoAsistencia } from "@prisma/client"

interface AttendanceData {
  [alumnoId: string]: {
    [date: string]: TipoAsistencia
  }
}

export async function updateAsistencias(data: AttendanceData): Promise<void> {
  const updatePromises = Object.entries(data).map(async ([alumnoId, dates]) => {
    return prisma.$transaction(async (tx) => {
      const updatePromises = Object.entries(dates).map(async ([date, tipoAsistencia]) => {
        const existingAttendance = await tx.asistencia.findFirst({
          where: {
            alumnoId: alumnoId,
            fecha: new Date(date)
          }
        });

        if (existingAttendance) {
          return tx.asistencia.update({
            where: { id: existingAttendance.id },
            data: { tipo_asistencia: tipoAsistencia }
          });
        } else {
          return tx.asistencia.create({
            data: {
              alumnoId: alumnoId,
              fecha: new Date(date),
              tipo_asistencia: tipoAsistencia
            }
          });
        }
      });

      await Promise.all(updatePromises);
    });
  });

  await Promise.all(updatePromises);

  return;
}