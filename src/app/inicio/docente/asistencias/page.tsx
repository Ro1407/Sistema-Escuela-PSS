import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AttendanceTracker from '@/components/inicio/asistencias/AttendanceTracker';
import { getAlumnosCursoAsistencias } from '../../../../../prisma/services/alumno.service';
import { Alumno } from '../../../../../prisma/interfaces';

export default async function Page({
  searchParams,
}: {
  searchParams?: { 
    curso?: string
  };
}) {
  const cursoId = searchParams?.curso || ''

  let alums : Alumno[] = []

  if (cursoId) {
    alums = await getAlumnosCursoAsistencias(cursoId)
    console.log(alums)
    console.log(alums[0].asistencia)
  }


  if (!cursoId) {
    return (
      <div className="flex items-center justify-center h-full ">
        <Card className="w-[350px] bg-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-yellow-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              Curso No Seleccionado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-base">
              Por favor, utilice el menú desplegable en la parte superior de la página para seleccionar un curso.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <AttendanceTracker alumnos={alums} />
  )
}