USE clogram;

CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(60) PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    email VARCHAR(60) UNIQUE,
    pwd VARCHAR(60),
    profile_photo LONGBLOB
)