/*
  Warnings:

  - Made the column `player_1_score` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `player_2_score` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "game" ALTER COLUMN "player_1_score" SET NOT NULL,
ALTER COLUMN "player_1_score" SET DEFAULT 0,
ALTER COLUMN "player_2_score" SET NOT NULL,
ALTER COLUMN "player_2_score" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "game_round" ALTER COLUMN "player_1_points" SET DEFAULT 0,
ALTER COLUMN "player_2_points" SET DEFAULT 0,
ALTER COLUMN "round_winner_id" DROP NOT NULL;
