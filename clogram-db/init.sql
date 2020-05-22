USE clogram;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;

CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(60) PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    email VARCHAR(60) UNIQUE,
    pwd VARCHAR(60),
    profile_photo LONGBLOB
);

CREATE TABLE IF NOT EXISTS friends (
    username VARCHAR(60),
    friend VARCHAR(60),
    PRIMARY KEY (username, friend)
);

CREATE TABLE IF NOT EXISTS post (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(60),
    photo_name VARCHAR(255),
    photo_mime_type VARCHAR(255),
    photo LONGBLOB,
    post_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descrip VARCHAR(255),
    PRIMARY KEY (id, username),
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id INT(11) NOT NULL,
    username VARCHAR(60),
    ord INT(11) NOT NULL,
    comment_text VARCHAR(255),
    comment_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    posted_by VARCHAR(60),
    PRIMARY KEY (id, username, ord),
    FOREIGN KEY (posted_by) REFERENCES user(username),
    FOREIGN KEY (id, username) REFERENCES post(id, username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    id INT(11) NOT NULL,
    username VARCHAR(60),
    ord INT(11) NOT NULL,
    like_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    liked_by VARCHAR(60),
    PRIMARY KEY (id, username, ord),
    FOREIGN KEY (liked_by) REFERENCES user(username),
    FOREIGN KEY (id, username) REFERENCES post(id, username) ON DELETE CASCADE
);