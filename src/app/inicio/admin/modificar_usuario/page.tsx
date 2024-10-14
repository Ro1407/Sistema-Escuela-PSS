
import { getAllMaterias } from "../../../../../prisma/services/materia.service";
import { Materia } from "../../../../../prisma/interfaces";
import { Curso } from "@prisma/client";
import { getAllCursosNombreID } from "../../../../../prisma/services/curso.service";
import Edit from "@/components/inicio/admin/edit";


export default async function InicioAdminPage() {
  const materias: Materia[] = await getAllMaterias();
  const cursos: Curso[] = await getAllCursosNombreID();

  return (
    <div>
      <Edit materias={materias} cursos={cursos}/>
    </div>
  )
}