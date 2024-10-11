/*
  Warnings:

  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stages` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoProyecto" AS ENUM ('PAUSADO', 'ACTIVO', 'COMPLETO', 'CERRADO');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('BAJA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "TipoActividad" AS ENUM ('LLAMADA', 'REUNION', 'EMAIL', 'OTRO');

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_proyectoId_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_managerId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_clienteId_fkey";

-- DropTable
DROP TABLE "activities";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "stages";

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" "EstadoProyecto" NOT NULL,
    "prioridad" "Prioridad" NOT NULL,
    "valorEstimado" DOUBLE PRECISION,
    "managerId" TEXT,
    "origen" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "ultimoContacto" TIMESTAMP(3),
    "fechaCierreEstimada" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "estado" "EstadoProyecto" NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaCierreEstimada" TIMESTAMP(3) NOT NULL,
    "responsableId" TEXT NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividades" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "proyectoId" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoActividad" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "responsableId" TEXT NOT NULL,

    CONSTRAINT "actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etapas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "etapas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EtapaToProyecto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EtapaToProyecto_AB_unique" ON "_EtapaToProyecto"("A", "B");

-- CreateIndex
CREATE INDEX "_EtapaToProyecto_B_index" ON "_EtapaToProyecto"("B");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividades" ADD CONSTRAINT "actividades_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividades" ADD CONSTRAINT "actividades_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "proyectos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividades" ADD CONSTRAINT "actividades_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtapaToProyecto" ADD CONSTRAINT "_EtapaToProyecto_A_fkey" FOREIGN KEY ("A") REFERENCES "etapas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtapaToProyecto" ADD CONSTRAINT "_EtapaToProyecto_B_fkey" FOREIGN KEY ("B") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
