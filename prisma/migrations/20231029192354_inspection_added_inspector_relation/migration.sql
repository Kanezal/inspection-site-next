/*
  Warnings:

  - You are about to drop the column `inspectorDiscordId` on the `Inspection` table. All the data in the column will be lost.
  - Added the required column `inspectorId` to the `Inspection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "inspectorDiscordId",
ADD COLUMN     "inspectorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "Inspector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
