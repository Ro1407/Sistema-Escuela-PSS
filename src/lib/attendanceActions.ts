'use server'

import { TipoAsistencia } from "@prisma/client"
import { updateAsistencias } from "../../prisma/services/asistencia.service"
import { revalidatePath } from "next/cache"

interface AttendanceData {
  [alumnoId: string]: {
    [date: string]: TipoAsistencia
  }
}

export async function updateAttendance(data: AttendanceData) {
  try {
    const result =  await updateAsistencias(data)
    revalidatePath('inicio/docente')
    
    return { success: true, message: 'Asistencias actualizadas correctamente' }
  } catch (error) {
    console.error('Error al actualizar las asistencias:', error)
    return { success: false, message: 'Error al actualizar las asistencias' }
  }
}