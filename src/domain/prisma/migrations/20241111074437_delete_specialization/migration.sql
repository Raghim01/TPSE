/*
  Warnings:

  - You are about to drop the column `specializationId` on the `Doc` table. All the data in the column will be lost.
  - You are about to drop the `Specialization` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialization` to the `Doc` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doc" DROP CONSTRAINT "Doc_specializationId_fkey";

-- AlterTable
ALTER TABLE "Doc" DROP COLUMN "specializationId",
ADD COLUMN     "specialization" "SpecializationType" NOT NULL;

-- DropTable
DROP TABLE "Specialization";
