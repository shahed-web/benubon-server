/*
  Warnings:

  - Added the required column `permissionCode` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "permissionCode" INTEGER NOT NULL;
