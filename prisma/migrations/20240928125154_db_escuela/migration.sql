-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('PADRE', 'ALUMNO', 'DOCENTE', 'ADMINISTRATIVO');

-- CreateTable
CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Padre" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,

    CONSTRAINT "Padre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Alumno" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "curso" TEXT NOT NULL,
    "numeroMatricula" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Docente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Administrativo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,

    CONSTRAINT "Administrativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Materia" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "docenteId" TEXT NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "_AlumnoMateria" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Padre_id_key" ON "Padre"("id");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Padre_correoElectronico_key" ON "Padre"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_id_key" ON "Alumno"("id");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_numeroMatricula_key" ON "Alumno"("numeroMatricula");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_correoElectronico_key" ON "Alumno"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_id_key" ON "Docente"("id");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_matricula_key" ON "Docente"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_correoElectronico_key" ON "Docente"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Administrativo_id_key" ON "Administrativo"("id");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Administrativo_correoElectronico_key" ON "Administrativo"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "_AlumnoMateria_AB_unique" ON "_AlumnoMateria"("A", "B");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "_AlumnoMateria_B_index" ON "_AlumnoMateria"("B");

-- AddForeignKey
ALTER TABLE "Padre" ADD CONSTRAINT "Padre_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrativo" ADD CONSTRAINT "Administrativo_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "Materia" ADD CONSTRAINT "Materia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoMateria" ADD CONSTRAINT "_AlumnoMateria_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoMateria" ADD CONSTRAINT "_AlumnoMateria_B_fkey" FOREIGN KEY ("B") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
