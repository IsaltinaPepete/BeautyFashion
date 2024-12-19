/*
  Warnings:

  - Made the column `province_id` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bairro` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "province_id" SET NOT NULL,
ALTER COLUMN "bairro" SET NOT NULL;
