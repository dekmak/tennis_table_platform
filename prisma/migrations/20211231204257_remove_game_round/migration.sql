/*
  Warnings:

  - You are about to drop the column `nb_rounds` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `round_nb` on the `game_point` table. All the data in the column will be lost.
  - You are about to drop the `game_round` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "nb_rounds";

-- AlterTable
ALTER TABLE "game_point" DROP COLUMN "round_nb";

-- DropTable
DROP TABLE "game_round";
