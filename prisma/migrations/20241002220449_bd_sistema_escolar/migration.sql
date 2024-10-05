/*
  Warnings:

  - Made the column `dni` on table `Administrativo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cursoId` on table `Alumno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dni` on table `Alumno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dni` on table `Docente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `materiaId` on table `Docente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dni` on table `Padre` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Alumno" DROP CONSTRAINT "Alumno_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Docente" DROP CONSTRAINT "Docente_materiaId_fkey";

-- AlterTable
ALTER TABLE "Administrativo" ALTER COLUMN "dni" SET NOT NULL;

-- AlterTable
ALTER TABLE "Alumno" ALTER COLUMN "cursoId" SET NOT NULL,
ALTER COLUMN "dni" SET NOT NULL;

-- AlterTable
ALTER TABLE "Docente" ALTER COLUMN "dni" SET NOT NULL,
ALTER COLUMN "materiaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Padre" ALTER COLUMN "dni" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
