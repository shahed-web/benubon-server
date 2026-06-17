-- AlterTable
ALTER TABLE "Artisan" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Buyer" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Inquiry" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "isSoftDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isSoftDelete" SET DEFAULT false;
