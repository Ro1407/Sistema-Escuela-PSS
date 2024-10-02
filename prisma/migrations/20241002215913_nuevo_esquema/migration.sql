/*
  Warnings:

  - You are about to drop the column `curso` on the `Alumno` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Alumno` table. All the data in the column will be lost.
  - You are about to drop the column `docenteId` on the `Materia` table. All the data in the column will be lost.
  - You are about to drop the `_AlumnoMateria` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dni]` on the table `Administrativo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[materiaId]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Padre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `Administrativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoId` to the `Alumno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Alumno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Docente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materiaId` to the `Docente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Padre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Materia" DROP CONSTRAINT "Materia_docenteId_fkey";

-- DropForeignKey
ALTER TABLE "_AlumnoMateria" DROP CONSTRAINT "_AlumnoMateria_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlumnoMateria" DROP CONSTRAINT "_AlumnoMateria_B_fkey";

-- AlterTable
ALTER TABLE "Administrativo" ADD COLUMN     "dni" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Alumno" DROP COLUMN "curso",
DROP COLUMN "fechaNacimiento",
ADD COLUMN     "cursoId" TEXT NOT NULL,
ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "padreId" TEXT;

-- AlterTable
ALTER TABLE "Docente" ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "materiaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Materia" DROP COLUMN "docenteId";

-- AlterTable
ALTER TABLE "Padre" ADD COLUMN     "dni" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AlumnoMateria";

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MateriaCurso" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DocenteCurso" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MateriaCurso_AB_unique" ON "_MateriaCurso"("A", "B");

-- CreateIndex
CREATE INDEX "_MateriaCurso_B_index" ON "_MateriaCurso"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DocenteCurso_AB_unique" ON "_DocenteCurso"("A", "B");

-- CreateIndex
CREATE INDEX "_DocenteCurso_B_index" ON "_DocenteCurso"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Administrativo_dni_key" ON "Administrativo"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_dni_key" ON "Alumno"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_dni_key" ON "Docente"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_materiaId_key" ON "Docente"("materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Padre_dni_key" ON "Padre"("dni");

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Padre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MateriaCurso" ADD CONSTRAINT "_MateriaCurso_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MateriaCurso" ADD CONSTRAINT "_MateriaCurso_B_fkey" FOREIGN KEY ("B") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocenteCurso" ADD CONSTRAINT "_DocenteCurso_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocenteCurso" ADD CONSTRAINT "_DocenteCurso_B_fkey" FOREIGN KEY ("B") REFERENCES "Docente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
