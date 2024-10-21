import { Alumno } from "../../../../../prisma/interfaces";
import { getAlumnoConAsistencia } from "../../../../../prisma/services/alumno.service";
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AttendanceViewer from '@/components/inicio/asistencias/AttendanceViewer'

export default async function InicioPadreAsistenciasPage(
  {
    searchParams,
  }: {
    searchParams?: { 
      hijo?: string
    };
  }
) {

  const hijoId = searchParams?.hijo || ''

  let alumno : Alumno | null = null

  if (hijoId) {
    alumno = await getAlumnoConAsistencia(hijoId as string)
  }

  if (!hijoId || !alumno) {
    return (
      <div className="flex items-center justify-center h-full ">
        <Card className="w-[350px] bg-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-yellow-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              Hijo No Seleccionado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-base">
              Por favor, utilice el menú desplegable en la parte superior de la página para seleccionar un hijo.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <AttendanceViewer alumno={alumno} />
    </div>
  )
} 