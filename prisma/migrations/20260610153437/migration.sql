/*
  Warnings:

  - You are about to drop the column `altText` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,mediaId]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductImage_publicId_key";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "altText",
DROP COLUMN "createdAt",
DROP COLUMN "height",
DROP COLUMN "position",
DROP COLUMN "publicId",
DROP COLUMN "updatedAt",
DROP COLUMN "url",
DROP COLUMN "width",
ADD COLUMN     "mediaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_objectKey_key" ON "Media"("objectKey");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_productId_mediaId_key" ON "ProductImage"("productId", "mediaId");

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
