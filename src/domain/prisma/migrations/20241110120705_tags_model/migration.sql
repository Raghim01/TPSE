/*
  Warnings:

  - A unique constraint covering the columns `[idnp]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patient_idnp_key" ON "Patient"("idnp");
