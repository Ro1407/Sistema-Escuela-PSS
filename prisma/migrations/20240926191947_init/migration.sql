-- CreateTable
CREATE TABLE "Padre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "curso" TEXT NOT NULL,
    "numeroMatricula" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Docente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Administrativo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "docenteId" TEXT NOT NULL,
    CONSTRAINT "Materia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AlumnoToPadre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AlumnoToPadre_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumno" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlumnoToPadre_B_fkey" FOREIGN KEY ("B") REFERENCES "Padre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AlumnoToMateria" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AlumnoToMateria_A_fkey" FOREIGN KEY ("A") REFERENCES "Alumno" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlumnoToMateria_B_fkey" FOREIGN KEY ("B") REFERENCES "Materia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Padre_usuario_key" ON "Padre"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Padre_correoElectronico_key" ON "Padre"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_usuario_key" ON "Alumno"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_numeroMatricula_key" ON "Alumno"("numeroMatricula");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_correoElectronico_key" ON "Alumno"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_matricula_key" ON "Docente"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_correoElectronico_key" ON "Docente"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Administrativo_correoElectronico_key" ON "Administrativo"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "_AlumnoToPadre_AB_unique" ON "_AlumnoToPadre"("A", "B");

-- CreateIndex
CREATE INDEX "_AlumnoToPadre_B_index" ON "_AlumnoToPadre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlumnoToMateria_AB_unique" ON "_AlumnoToMateria"("A", "B");

-- CreateIndex
CREATE INDEX "_AlumnoToMateria_B_index" ON "_AlumnoToMateria"("B");
