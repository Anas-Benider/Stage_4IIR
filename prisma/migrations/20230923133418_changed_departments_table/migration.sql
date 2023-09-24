/*
  Warnings:

  - You are about to drop the column `isChefDepartement` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `departementId` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chefId]` on the table `Departement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_departementId_fkey`;

-- AlterTable
ALTER TABLE `departement` ADD COLUMN `chefId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `isChefDepartement`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `departementId`;

-- CreateIndex
CREATE UNIQUE INDEX `Departement_chefId_key` ON `Departement`(`chefId`);

-- AddForeignKey
ALTER TABLE `Departement` ADD CONSTRAINT `Departement_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `Employee`(`matricule`) ON DELETE SET NULL ON UPDATE CASCADE;
