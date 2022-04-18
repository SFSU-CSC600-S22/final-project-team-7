-- SELECT * FROM songs;
SELECT DISTINCT 
    s.song_id,
    s.song_title, 
    s.notes, 
    artist_name, 
    album_title 
FROM songs s 
    JOIN artists a ON s.artist_id = a.artist_id 
    JOIN albums al ON s.album_id = al.album_id