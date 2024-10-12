/*
  Warnings:

  - You are about to drop the column `point` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "point",
ADD COLUMN     "points" INTEGER,
ADD COLUMN     "priority" TEXT;
