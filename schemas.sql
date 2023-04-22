CREATE DATABASE SpotifyDB;

USE SpotifyDB;

CREATE TABLE IF NOT EXISTS Artist (
    artistId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistName VARCHAR(255),
    followerCount INT,
    --genre is a many-to-many relationship table
    artist VARCHAR(255),
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Album (
    albumId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
    trackId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     displayName VARCHAR(255),
--     followers INT,
--     uri VARCHAR(255)
-- );

CREATE TABLE IF NOT EXISTS Img (
    imgId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    width INT,
    height INT,
    uri VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS availableMarkets (
    availableMarketsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    marketName VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Genre (
    genreId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genreName VARCHAR(50)
);

-- CREATE TABLE IF NOT EXISTS Playlist (
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     playlistName VARCHAR(255),
--     collaborative BOOLEAN,
--     info VARCHAR(255),
--     followerCount INT,
--     uri INT,
-- );

--Relationship tables

CREATE TABLE IF NOT EXISTS artistsToAlbums (
    artistsToAlbumsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId INT REFERENCES Artist(id),
    albumId INT REFERENCES Album(id)
)

CREATE TABLE IF NOT EXISTS albumsToTracks (
    albumsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId INT REFERENCES Album(id),
    trackId INT REFERENCES Track(id)
)

CREATE TABLE IF NOT EXISTS albumsToGenre (
    albumsToGenreId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId INT REFERENCES Album(id),
    genreId INT REFERENCES Genre(id)
);

-- CREATE TABLE IF NOT EXISTS playlistsToTracks (
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     playlistId INT REFERENCES Playlist(id),
--     trackId INT REFERENCES Track(id)
-- )