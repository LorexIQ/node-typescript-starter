-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ru');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "languageCode" "Languages" NOT NULL,
    "role" "Roles" NOT NULL,
    "isBot" BOOLEAN NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "lastName" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastUserMessage" (
    "messageId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "LastUserMessage_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LastUserMessage_messageId_key" ON "LastUserMessage"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "LastUserMessage_chatId_key" ON "LastUserMessage"("chatId");
