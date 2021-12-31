-- CreateTable
CREATE TABLE "player" (
    "player_id" SERIAL NOT NULL,
    "player_name" VARCHAR(255),
    "profile_pic" VARCHAR(500) NOT NULL,
    "age" INTEGER NOT NULL,
    "country" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "player_rank" (
    "rank_id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "game_type" VARCHAR(100) NOT NULL,
    "rank" INTEGER NOT NULL,
    "total_points" INTEGER NOT NULL,
    "calculated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("rank_id")
);

-- CreateTable
CREATE TABLE "game" (
    "game_id" SERIAL NOT NULL,
    "event_name" VARCHAR(255) NOT NULL,
    "subevent_name" VARCHAR(255) NOT NULL,
    "player_1" INTEGER NOT NULL,
    "player_2" INTEGER NOT NULL,
    "player_1_score" INTEGER,
    "player_2_score" INTEGER,
    "winner_id" INTEGER,
    "nb_rounds" INTEGER NOT NULL DEFAULT 0,
    "start_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMPTZ,

    PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "game_point" (
    "point_id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "round_nb" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "record_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("point_id")
);

-- CreateTable
CREATE TABLE "game_round" (
    "round_id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "round_nb" INTEGER NOT NULL,
    "player_1_points" INTEGER NOT NULL,
    "player_2_points" INTEGER NOT NULL,
    "round_winner_id" INTEGER NOT NULL,
    "updated_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("round_id")
);
