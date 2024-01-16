/*
  Warnings:

  - The primary key for the `UserAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_OrderToUserAccess" DROP CONSTRAINT "_OrderToUserAccess_B_fkey";

-- AlterTable
ALTER TABLE "UserAccess" DROP CONSTRAINT "UserAccess_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserAccess_id_seq";

-- AlterTable
ALTER TABLE "_OrderToUserAccess" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_OrderToUserAccess" ADD CONSTRAINT "_OrderToUserAccess_B_fkey" FOREIGN KEY ("B") REFERENCES "UserAccess"("id") ON DELETE CASCADE ON UPDATE CASCADE;
