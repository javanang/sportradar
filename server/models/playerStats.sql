CREATE TABLE player_stats_by_game (
    "_id" serial PRIMARY KEY,
    "player_id" int,
    "player_name" varchar,
    "team_id" int,
    "team_name" varchar,
    "player_age" smallint,
    "player_number" smallint,
    "player_position" varchar,
    "assists" smallint,
    "goals" smallint,
    "hits" smallint,
    "points" smallint,
    "penalty_minutes" float,
    "game_id" int
);