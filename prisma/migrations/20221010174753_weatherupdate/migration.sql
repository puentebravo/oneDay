/*
  Warnings:

  - Added the required column `high` to the `SavedDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low` to the `SavedDates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedDates" ADD COLUMN     "high" TEXT NOT NULL,
ADD COLUMN     "low" TEXT NOT NULL,
ALTER COLUMN "weather" SET DATA TYPE TEXT;
