CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  address text NOT NULL,
  longitude float NOT NULL,
  latitude float NOT NULL
);
