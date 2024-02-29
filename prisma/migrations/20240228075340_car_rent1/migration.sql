/*
  Warnings:

  - You are about to alter the column `priceDay` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `car` MODIFY `priceDay` INTEGER NOT NULL DEFAULT 0;
