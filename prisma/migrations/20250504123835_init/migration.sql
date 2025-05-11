/*
  Warnings:

  - Added the required column `mobileNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mobileNumber" TEXT NOT NULL;
