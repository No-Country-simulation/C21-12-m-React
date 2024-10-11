/*
  Warnings:

  - The primary key for the `managers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_managerId_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "managerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "managers" DROP CONSTRAINT "managers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "managers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "managers_id_seq";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
