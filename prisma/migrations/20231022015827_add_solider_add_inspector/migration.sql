-- CreateTable
CREATE TABLE "Inspector" (
    "id" SERIAL NOT NULL,
    "idn" TEXT NOT NULL,
    "callSign" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "isInSecretDepartment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Inspector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectingSoldier" (
    "id" SERIAL NOT NULL,
    "inspectionId" INTEGER NOT NULL,
    "idn" TEXT NOT NULL,
    "callSign" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "dateOfEnlistment" TEXT NOT NULL,
    "dateOfPromotion" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "daysOfLeave" INTEGER NOT NULL DEFAULT 0,
    "trainingSessions" INTEGER NOT NULL DEFAULT 0,
    "lecturesAndCertificates" INTEGER NOT NULL DEFAULT 0,
    "inspectionStage2Score" DOUBLE PRECISION,
    "inspectorStage2Id" INTEGER,
    "inspectionStage3Result" TEXT DEFAULT 'Пока не прошёл.',

    CONSTRAINT "InspectingSoldier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InspectingSoldier" ADD CONSTRAINT "InspectingSoldier_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectingSoldier" ADD CONSTRAINT "InspectingSoldier_inspectorStage2Id_fkey" FOREIGN KEY ("inspectorStage2Id") REFERENCES "Inspector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
