/*
  Warnings:

  - You are about to drop the `_OrderToUserAccess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToUserAccess" DROP CONSTRAINT "_OrderToUserAccess_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToUserAccess" DROP CONSTRAINT "_OrderToUserAccess_B_fkey";

-- DropTable
DROP TABLE "_OrderToUserAccess";