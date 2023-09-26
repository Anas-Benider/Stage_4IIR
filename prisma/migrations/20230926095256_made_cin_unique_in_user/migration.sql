/*
  Warnings:

  - A unique constraint covering the columns `[cin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_cin_key` ON `User`(`cin`);
