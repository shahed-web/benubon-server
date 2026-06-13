/*
  Warnings:

  - You are about to drop the column `isSoftInternational` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isSoftInternational",
ADD COLUMN     "isInternational" BOOLEAN NOT NULL DEFAULT true;
