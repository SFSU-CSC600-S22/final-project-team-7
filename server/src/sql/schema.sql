CREATE TABLE artists (
	artist_id int NOT NULL PRIMARY KEY,
	artist_name text NOT NULL
);

CREATE TABLE albums (
	album_id int NOT NULL PRIMARY KEY,
	album_title text NOT NULL,
	artist_id int NOT NULL,
	FOREIGN key(artist_id) REFERENCES artists(artist_id) 
		ON DELETE CASCADE
);

CREATE TABLE songs (
	song_id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist_id int NOT NULL,
	album_id int NOT NULL,
	FOREIGN key(artist_id) REFERENCES artists(artist_id)
	FOREIGN key(album_id) REFERENCES albums(album_id) 
		ON DELETE CASCADE 
);

INSERT INTO artists (artist_id, artist_name) VALUES (1, "Ludwig van Beethoven");
INSERT INTO artists (artist_id, artist_name) VALUES (2, "Euphemia Allen");
INSERT INTO artists (artist_id, artist_name) VALUES (3, "Koji Kondo");
INSERT INTO artists (artist_id, artist_name) VALUES (4, "Unknown");
INSERT INTO artists (artist_id, artist_name) VALUES (5, "Christina Perri");
INSERT INTO artists (artist_id, artist_name) VALUES (6, "Johann Pachelbel");

INSERT INTO albums (album_id, album_title, artist_id) VALUES (1, "Symphony No. 9", 1);
INSERT INTO albums (album_id, album_title, artist_id) VALUES (2, "Waltz", 2);
INSERT INTO albums (album_id, album_title, artist_id) VALUES (3, "OneUp Studios", 3);
INSERT INTO albums (album_id, album_title, artist_id) VALUES (4, "Unknown", 4);
INSERT INTO albums (album_id, album_title, artist_id) VALUES (5, "Copeland", 5);
INSERT INTO albums (album_id, album_title, artist_id) VALUES (6, "Pachelbel's Canon", 6);


INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 1, 1);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (2, 'Chopsticks', 'D4 D4 E4 F4 D4 F4 E4 A4 D4 D4 E4 F4 D4 C4', 2, 2);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (3, 'Mario', 'E4 E4 E4 C4 E4 G4 G4 C4 G4 E4 A4 B4 B4 b4 A4 G4 E4 G4 A4 F4 G4 E4 C4 D4 B4', 3, 3);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (4, 'C Major', 'C4 D4 E4 F4 G4 A4 B4 C5', 4, 4);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (5, 'Eb Major', 'Eb4 F4 G4 Ab4 Bb4 C5 D5 Eb5', 4, 4);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (6, 'Ab Minor', 'Ab3 Bb3 Cb4 Db4 Eb4 Fb4 Gb4 Ab4', 4, 4);

INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (7, 'You are my sunshine', 'D1 G3 A4 B5 B5 B5 A4 B5 G3 G3 G1 A2 B3 C4 E5 E5 D4 C3 B2', 5, 5);
INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (8, 'Canon in D (for beginners)', 'C4 G4 Ab4 Eb4 F4 C4 F4 G4 C4 G4 Ab4 Eb4 F4 C4 F4 G4 C4 G4 Ab4 Eb4 C4 F4 G4 C4', 6, 6);
