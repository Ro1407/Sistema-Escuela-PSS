/*
  Warnings:

  - You are about to drop the column `password` on the `Administrativo` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Administrativo` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Alumno` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Alumno` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Docente` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Docente` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Padre` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Padre` table. All the data in the column will be lost.
  - You are about to drop the `_AlumnoToMateria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AlumnoToPadre` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('SANCION', 'AMONESTACION');

-- CreateEnum
CREATE TYPE "TipoAsistencia" AS ENUM ('AUSENTE', 'PRESENTE', 'TARDE', 'JUSTIFICADA');

-- CreateEnum
CREATE TYPE "Periodo" AS ENUM ('PRIMER_TRIMESTRE', 'SEGUNDO_TRIMESTRE', 'TERCER_TRIMESTRE', 'ENERO', 'MARZO');

-- DropForeignKey
ALTER TABLE "_AlumnoToMateria" DROP CONSTRAINT "_AlumnoToMateria_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlumnoToMateria" DROP CONSTRAINT "_AlumnoToMateria_B_fkey";

-- DropForeignKey
ALTER TABLE "_AlumnoToPadre" DROP CONSTRAINT "_AlumnoToPadre_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlumnoToPadre" DROP CONSTRAINT "_AlumnoToPadre_B_fkey";

-- DropIndex
DROP INDEX "Administrativo_usuario_key";

-- DropIndex
DROP INDEX "Alumno_usuario_key";

-- DropIndex
DROP INDEX "Docente_usuario_key";

-- DropIndex
DROP INDEX "Padre_usuario_key";

-- AlterTable
ALTER TABLE "Administrativo" DROP COLUMN "password",
DROP COLUMN "usuario";

-- AlterTable
ALTER TABLE "Alumno" DROP COLUMN "password",
DROP COLUMN "usuario";

-- AlterTable
ALTER TABLE "Docente" DROP COLUMN "password",
DROP COLUMN "usuario";

-- AlterTable
ALTER TABLE "Padre" DROP COLUMN "password",
DROP COLUMN "usuario";

-- DropTable
DROP TABLE "_AlumnoToMateria";

-- DropTable
DROP TABLE "_AlumnoToPadre";

-- CreateTable
CREATE TABLE "Amonestacion" (
    "id" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "firma" BOOLEAN NOT NULL DEFAULT false,
    "alumnoId" TEXT NOT NULL,

    CONSTRAINT "Amonestacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo_asistencia" "TipoAsistencia" NOT NULL,
    "alumnoId" TEXT NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL,
    "calificacion" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "boletinId" TEXT NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boletin" (
    "id" TEXT NOT NULL,
    "periodo" "Periodo" NOT NULL,
    "anio" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,

    CONSTRAINT "Boletin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Amonestacion" ADD CONSTRAINT "Amonestacion_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_boletinId_fkey" FOREIGN KEY ("boletinId") REFERENCES "Boletin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletin" ADD CONSTRAINT "Boletin_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
