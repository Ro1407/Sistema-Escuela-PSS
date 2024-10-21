import { fetchUserSession } from "@/lib/actions"
import { redirect } from "next/navigation"
import { getAlumnoConAsistencia } from "../../../../../prisma/services/alumno.service"
import AttendanceViewer from "@/components/inicio/asistencias/AttendanceViewer"
import { Alumno } from "../../../../../prisma/interfaces"

export default async function InicioAlumnoAsistenciasPage() {
  
  const session = await fetchUserSession()

  if (!session || session.rol !== 'ALUMNO') {
    redirect('/login')
  }
  const userId = session?.id
  const alumno: Alumno | null = await getAlumnoConAsistencia(userId as string)

  if (!alumno) {
    redirect('/login')
  }
  
  
  return (
    <div>
      <AttendanceViewer alumno={alumno} />
    </div>
  )
} 