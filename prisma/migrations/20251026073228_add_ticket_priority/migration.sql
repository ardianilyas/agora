-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('URGENT', 'HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "priority" "TicketPriority" NOT NULL DEFAULT 'LOW';
