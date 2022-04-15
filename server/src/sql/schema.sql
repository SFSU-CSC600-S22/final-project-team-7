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

INSERT INTO artists (artist_id, artist_name) VALUES (1, "Bob Lee Swagger");

INSERT INTO albums (album_id, album_title, artist_id) VALUES (1, "Shooter", 1);

INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 1, 1);

-- Justin's Addition
INSERT INTO artists (artist_id, artist_name) VALUES (2, "Johann Pachelbel");

INSERT INTO albums (album_id, album_title, artist_id) VALUES (2, "Pachelbel's Canon", 2);

INSERT INTO songs (song_id, song_title, notes, artist_id, album_id) VALUES (2, 'Canon in D (for beginners)', 'C4 G4 A#4 E#4 F4 C4 F4 G4 C4 G4 A#4 E#4 F4 C4 F4 G4 C4 G4 A#4 E#4 C4 F4 G4 C4', 2, 2);