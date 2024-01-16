/*
  Warnings:

  - You are about to drop the column `editedBy` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `editedBy` on the `UserAccess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "editedBy";

-- AlterTable
ALTER TABLE "UserAccess" DROP COLUMN "editedBy";
