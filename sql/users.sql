DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image VARCHAR(300),
    timestamp TIMESTAMP DEFAULT NOW()
)
