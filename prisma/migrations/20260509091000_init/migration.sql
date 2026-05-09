-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('EMAIL', 'PHONE', 'USERNAME');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "SignupCredential" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "type" "IdentifierType" NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignupCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SignupCredential_type_identifier_idx" ON "SignupCredential"("type", "identifier");

-- CreateIndex
CREATE INDEX "SignupCredential_status_createdAt_idx" ON "SignupCredential"("status", "createdAt");
