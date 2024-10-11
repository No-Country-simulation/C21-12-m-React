/*
  Warnings:

  - Changed the type of `estado` on the `clientes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoCliente" AS ENUM ('CONTACTO_INICIAL', 'EN_PROGRESO', 'CERRADO');

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoCliente" NOT NULL;
