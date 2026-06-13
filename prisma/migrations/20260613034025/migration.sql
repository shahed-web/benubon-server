/*
  Warnings:

  - You are about to drop the column `isActive` on the `Category` table. All the data in the column will be lost.
  - Added the required column `status` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DRAFT');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isActive",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "CategoryStatus" NOT NULL;
