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
  player1 VARCHAR(50),
  player2 VARCHAR(50),
  score1 INT NOT NULL,
  score2 INT NOT NULL,
  score1_tracker VARCHAR(250),
  score2_tracker VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (player1)
  REFERENCES players (username),
  FOREIGN KEY (player2)
  REFERENCES players (username)
);

-- INSERT INTO playersCredentials
-- 	(username, password)
-- VALUES 
-- 	("Jimothy","123456"),
--     ("TestUser","TestPass"),
--     ("Sam","123456"),
--     ("Jim","123456");

-- SELECT * FROM playersCredentials;

-- INSERT INTO players
-- 	(first_name, last_name)
-- VALUES 
--   ("James","Butt");

INSERT INTO games
	(player1_id, player2_id, score1, score2)
VALUES 
  ("Jimothy", "TestUser", 0, 5000),
  ("Jimothy", "TestUser", 2000, 5600),
  ("Jimothy", "TestUser", 3000, 9000),
  ("Jim", "Sam", 6000, 0),
  ("Sam", "TestUser", 2000, 5000),
  ("Sam", "Jimothy", 1000, 5900);
  
 