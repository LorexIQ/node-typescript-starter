-- DropForeignKey
ALTER TABLE "InviteCode" DROP CONSTRAINT "InviteCode_ownerId_fkey";

-- AlterTable
ALTER TABLE "InviteCode" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
