/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Inspector` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inspector_discordId_key" ON "Inspector"("discordId");
