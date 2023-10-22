-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "inspectorDiscordId" TEXT NOT NULL,
    "description" TEXT,
    "legion" TEXT NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);
