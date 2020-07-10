DROP TABLE IF EXISTS games, playersCredentials, players;

CREATE TABLE playersCredentials (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(100),
  PRIMARY KEY (id),
  UNIQUE KEY (username)
);

CREATE TABLE players (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (username)
  REFERENCES playersCredentials (username)
);

CREATE TABLE games (
id INT NOT NULL AUTO_INCREMENT,
  player1_id INT NOT NULL,
  player2_id INT NOT NULL,
  score1 INT NOT NULL,
  score2 INT NOT NULL,
  PRIMARY KEY (id)
--   FOREIGN KEY (player1_id)
--   REFERENCES players (id),
--   FOREIGN KEY (player2_id)
--   REFERENCES players (id)
);

INSERT INTO playersCredentials
	(username, password)
VALUES 
	("Jimothy","123456"),
    ("TestUser","TestPass"),
    ("Sam","123456"),
    ("Jim","123456");

SELECT * FROM playersCredentials;

-- INSERT INTO players
-- 	(first_name, last_name)
-- VALUES 
--   ("James","Butt");

INSERT INTO games
	(player1_id, player2_id, score1, score2)
VALUES 
  (1, 2, 0, 5000),
  (1, 2, 2000, 5600),
  (1, 2, 3000, 9000),
  (1, 2, 6000, 0),
  (3, 4, 2000, 5000),
  (2, 3, 1000, 5900);
  
 