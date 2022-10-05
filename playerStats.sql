CREATE TABLE player_stats_by_game (
    "_id" serial PRIMARY KEY,
    "player_id" int,
    "player_name" varchar,
    "team_id" int,
    "team_name" varchar,
    "player_age" int,
    "player_number" int,
    "player_position" varchar,
    "assists" int,
    "goals" int,
    "hits" int,
    "points" int,
    "penalty_minutes" float,
    "game_id" int
);

CREATE TABLE test_table (
    "_id" serial PRIMARY KEY,
    "player_id" int,
    "player_name" varchar,
    "team_id" int,
    "team_name" varchar,
    "player_age" int,
    "player_number" int,
    "player_position" varchar,
    "assists" int,
    "goals" int,
    "hits" int,
    "points" int,
    "penalty_minutes" float,
    "game_id" int 
);