/*
  Warnings:

  - You are about to drop the column `encargado` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "encargado",
ADD COLUMN     "managerId" INTEGER;

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
