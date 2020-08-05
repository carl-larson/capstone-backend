SELECT * FROM players;

SELECT * FROM games;

SELECT * FROM games WHERE player1 ='1' OR player2 = '1';

SELECT * FROM playersCredentials;

INSERT INTO games
	(player1, player2, turn, score1, score2, score1_tracker, score2_tracker)
VALUES 
  (2, 1, 0, 5000),
  (4, 1, 2000, 5600)

-- INSERT INTO players (username) VALUE ('Meagulator'), ('Luanne');

-- UPDATE usersAddress SET address='REDACTED', city='REDACTED', county='REDACTED' WHERE state='OH';

-- DELETE FROM players WHERE id = '7';
