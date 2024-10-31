/*
  Warnings:

  - You are about to drop the `bookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('HAB', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" JSONB NOT NULL DEFAULT '{"role": "EMPLOYEE"}';

-- DropTable
DROP TABLE "bookmark";
