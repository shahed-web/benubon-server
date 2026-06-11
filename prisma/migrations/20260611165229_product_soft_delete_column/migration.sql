/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagesReady` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ProductStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deletedAt",
DROP COLUMN "imagesReady",
DROP COLUMN "isActive",
ADD COLUMN     "isSoftDelete" BOOLEAN NOT NULL DEFAULT true;
