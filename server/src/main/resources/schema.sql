DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username            varchar(80)
);

INSERT INTO users (username)
VALUES ('mm');