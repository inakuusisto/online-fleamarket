DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL primary key,
    user_id INTEGER NOT NULL,
    image VARCHAR(300),
    title TEXT,
    price INTEGER,
    description TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);
