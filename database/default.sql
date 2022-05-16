DROP DATABASE IF EXISTS beproductive;
CREATE DATABASE beproductive;
USE beproductive;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(15) NOT NULL,
  passwd VARCHAR(100) NOT NULL
);

CREATE TABLE goals(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(500),
  checked bit DEFAULT 0,
  created DATETIME DEFAULT current_timestamp,
  user INT NOT NULL,
  class INT NOT NULL,
  FOREIGN KEY fk_user(user) REFERENCES users(id)
);

INSERT INTO users VALUES (null,'thecots','$2b$10$FHJkZeaFY9nV5HChMOcS0.J6qxU28j297Z6CgNYZTaZUfOOMTnGFC');

/* class => 0 year | 1 month | 2 day */