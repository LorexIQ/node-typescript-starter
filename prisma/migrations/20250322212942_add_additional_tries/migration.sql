/*
  Warnings:

  - You are about to drop the column `tries` on the `BanByCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BanByCode" DROP COLUMN "tries",
ADD COLUMN     "triesCode" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "triesInvalid" INTEGER NOT NULL DEFAULT 0;
