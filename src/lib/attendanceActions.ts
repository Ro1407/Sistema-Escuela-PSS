'use server'

import { TipoAsistencia } from "@prisma/client"
import { updateAsistencias } from "../../prisma/services/asistencia.service"

interface AttendanceData {
  [alumnoId: string]: {
    [date: string]: TipoAsistencia
  }
}

export async function updateAttendance(data: AttendanceData) {
  try {
    const result =  await updateAsistencias(data)

    
    return { success: true, message: 'Asistencias actualizadas correctamente' }
  } catch (error) {
    console.error('Error al actualizar las asistencias:', error)
    return { success: false, message: 'Error al actualizar las asistencias' }
  }
}