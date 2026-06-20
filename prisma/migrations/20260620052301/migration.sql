/*
  Warnings:

  - Added the required column `phone` to the `Artisan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artisan" ADD COLUMN     "phone" TEXT NOT NULL;
