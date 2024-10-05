-- DropForeignKey
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Docente" DROP CONSTRAINT "Docente_materiaId_fkey";

-- AlterTable
ALTER TABLE "Administrativo" ALTER COLUMN "dni" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Alumno" ALTER COLUMN "cursoId" DROP NOT NULL,
ALTER COLUMN "dni" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Docente" ALTER COLUMN "dni" DROP NOT NULL,
ALTER COLUMN "materiaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Padre" ALTER COLUMN "dni" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
