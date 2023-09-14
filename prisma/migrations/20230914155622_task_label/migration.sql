/*
  Warnings:

  - Added the required column `label` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `label` VARCHAR(191) NOT NULL,
    MODIFY `departementId` VARCHAR(191) NULL;
