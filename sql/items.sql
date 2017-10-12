DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL primary key,
    user_id INTEGER NOT NULL,
    image VARCHAR(300),
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);
