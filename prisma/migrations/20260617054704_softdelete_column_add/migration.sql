/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Artisan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artisan" DROP COLUMN "deletedAt",
ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;
