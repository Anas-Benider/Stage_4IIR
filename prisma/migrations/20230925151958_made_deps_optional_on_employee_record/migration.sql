-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_departementId_fkey`;

-- AlterTable
ALTER TABLE `employee` MODIFY `departementId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departementId_fkey` FOREIGN KEY (`departementId`) REFERENCES `Departement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
