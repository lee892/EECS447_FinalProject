CREATE DATABASE SpotifyDB;

USE SpotifyDB;

CREATE TABLE IF NOT EXISTS Artist (
    id INT NOT NULL PRIMARY KEY,
    artistName VARCHAR(255),
    followerCount INT,
    --genre is a many-to-many relationship table
    artist VARCHAR(255),
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Album (
    id INT NOT NULL PRIMARY KEY,
    albumType VARCHAR(255),
    totalTracks INT,
    --availableMarkets is a many-to-many relationship table
    albumName VARCHAR(255),
    releaseDate DATETIME,
    releaseDatePrecision VARCHAR(50),
    --genre is a many-to-many relationship table
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Track (
    id INT NOT NULL PRIMARY KEY,
    --availableMarkets is a many-to-many relationship table
    albumType VARCHAR(255),
    discNumber INT,
    msDuration INT,
    isExplicit BOOLEAN,
    restrictions VARCHAR(255),
    trackName VARCHAR(255),
    popularity INT,
    previewUri VARCHAR(255),
    trackNum INT,
    --genre is a many-to-many relationship table
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

-- CREATE TABLE IF NOT EXISTS User (
--     id INT NOT NULL PRIMARY KEY,
--     displayName VARCHAR(255),
--     followers INT,
--     uri VARCHAR(255)
-- );

CREATE TABLE IF NOT EXISTS Img (
    id INT NOT NULL PRIMARY KEY,
    width INT,
    height INT,
    uri VARCHAR(255)
);

-- CREATE TABLE IF NOT EXISTS Playlist (
--     id INT NOT NULL PRIMARY KEY,
--     playlistName VARCHAR(255),
--     collaborative BOOLEAN,
--     info VARCHAR(255),
--     followerCount INT,
--     uri INT,
-- );


--Relationship tables

CREATE TABLE IF NOT EXISTS artistToAlbums (
    id INT NOT NULL PRIMARY KEY,
    artistId INT REFERENCES Artist(id),
    albumId INT REFERENCES Album(id)
)

CREATE TABLE IF NOT EXISTS albumsToTracks (
    id INT NOT NULL PRIMARY KEY,
    albumId INT REFERENCES Album(id),
    artistId INT REFERENCES Artist(id)
)

-- CREATE TABLE IF NOT EXISTS playlistsToTracks (
--     id INT NOT NULL PRIMARY KEY,
--     playlistId INT REFERENCES Playlist(id),
--     trackId INT REFERENCES Track(id)
-- )