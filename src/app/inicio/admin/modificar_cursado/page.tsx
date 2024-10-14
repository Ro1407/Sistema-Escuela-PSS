import EditCursoForm from "@/components/inicio/admin/edit-curso-form";
import { getAllCursosConMaterias, getAllCursosNombreID } from "../../../../../prisma/services/curso.service";
import { Button } from "@/components/ui/button";

export default async function InicioAdminCrearCursadoPage() {

  const cursos = await getAllCursosConMaterias();
  return (   
    <div className="flex flex-col p-5 align-center h-full">
      <EditCursoForm cursos={cursos} />
    </div> 
  )
}