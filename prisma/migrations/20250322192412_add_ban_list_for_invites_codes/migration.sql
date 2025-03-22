-- CreateTable
CREATE TABLE "BanByCode" (
    "tgId" INTEGER NOT NULL,
    "tries" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BanByCode_tgId_key" ON "BanByCode"("tgId");
