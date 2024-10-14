import CreateUserForm from "@/components/inicio/admin/create-user-form";
import { getAllMaterias } from "../../../../prisma/services/materia.service";
import { Materia } from "../../../../prisma/interfaces";
import { Curso } from "@prisma/client";
import { getAllCursosNombreID } from "../../../../prisma/services/curso.service";


export default async function InicioAdminPage() {
  const materias: Materia[] = await getAllMaterias();
  const cursos: Curso[] = await getAllCursosNombreID();

  return (
    <div>
      <CreateUserForm materias={materias} cursos={cursos}/>
    </div>
  )
}