import EditCursoForm from "@/components/inicio/admin/edit-curso-form";
import { getAllCursosConMaterias, getAllCursosNombreID } from "../../../../../prisma/services/curso.service";
import { Button } from "@/components/ui/button";

export default async function InicioAdminCrearCursadoPage() {

  const cursos = await getAllCursosConMaterias();
  return (
    <div className="flex h-full">
      <div className="flex flex-col p-5 align-center flex-grow w-1/5">
        <Button variant="destructive" className="mt-auto">Eliminar Cursado</Button>
      </div>
      <div className="flex flex-col p-5 align-center w-4/5">
        <EditCursoForm cursos={cursos} />
      </div>
    </div>
  )
}