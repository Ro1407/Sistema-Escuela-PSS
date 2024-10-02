import CreateUserForm from "@/components/inicio/admin/create-user-form";
import { getAllMaterias } from "../../../../prisma/services/materia.service";
import { Materia } from "../../../../prisma/interfaces";


export default async function InicioAdminPage() {
  const materias: Materia[] = await getAllMaterias();

  return (
    <div>
      <CreateUserForm materias={materias} />
    </div>
  )
}