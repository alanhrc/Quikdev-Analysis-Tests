-- CreateTable
CREATE TABLE "Order" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedBy" TEXT,
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccess" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedBy" TEXT,
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT[],
    "password" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToUserAccess" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToUserAccess_AB_unique" ON "_OrderToUserAccess"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToUserAccess_B_index" ON "_OrderToUserAccess"("B");

-- AddForeignKey
ALTER TABLE "_OrderToUserAccess" ADD CONSTRAINT "_OrderToUserAccess_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToUserAccess" ADD CONSTRAINT "_OrderToUserAccess_B_fkey" FOREIGN KEY ("B") REFERENCES "UserAccess"("id") ON DELETE CASCADE ON UPDATE CASCADE;
