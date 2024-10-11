-- CreateTable
CREATE TABLE IF NOT EXISTS "Padre" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
CREATE TABLE IF NOT EXISTS "_AlumnoToPadre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "_AlumnoToMateria" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Padre_usuario_key" ON "Padre"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Padre_correoElectronico_key" ON "Padre"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_usuario_key" ON "Alumno"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_numeroMatricula_key" ON "Alumno"("numeroMatricula");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Alumno_correoElectronico_key" ON "Alumno"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_usuario_key" ON "Docente"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_matricula_key" ON "Docente"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Docente_correoElectronico_key" ON "Docente"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Administrativo_usuario_key" ON "Administrativo"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Administrativo_correoElectronico_key" ON "Administrativo"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "_AlumnoToPadre_AB_unique" ON "_AlumnoToPadre"("A", "B");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "_AlumnoToPadre_B_index" ON "_AlumnoToPadre"("B");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "_AlumnoToMateria_AB_unique" ON "_AlumnoToMateria"("A", "B");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "_AlumnoToMateria_B_index" ON "_AlumnoToMateria"("B");

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoToPadre" ADD CONSTRAINT "_AlumnoToPadre_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoToPadre" ADD CONSTRAINT "_AlumnoToPadre_B_fkey" FOREIGN KEY ("B") REFERENCES "Padre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoToMateria" ADD CONSTRAINT "_AlumnoToMateria_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlumnoToMateria" ADD CONSTRAINT "_AlumnoToMateria_B_fkey" FOREIGN KEY ("B") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
