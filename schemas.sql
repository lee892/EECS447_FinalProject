CREATE DATABASE IF NOT EXISTS freedb_spotifydb;

USE freedb_spotifydb;

CREATE TABLE IF NOT EXISTS Artist (
    artistId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistName VARCHAR(255),
    followerCount INT,
    -- genre is a many-to-many relationship table
    artist VARCHAR(255),
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Album (
    albumId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumType VARCHAR(255),
    totalTracks INT,
    albumName VARCHAR(255),
    releaseDate DATETIME,
    releaseDatePrecision VARCHAR(50),
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Track (
    trackId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumType VARCHAR(255),
    discNumber INT,
    msDuration INT,
    isExplicit BOOLEAN,
    restrictions VARCHAR(255),
    trackName VARCHAR(255),
    popularity INT,
    previewUri VARCHAR(255),
    trackNum INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

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

CREATE TABLE IF NOT EXISTS artistsToAlbums (
    artistsToAlbumsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId INT REFERENCES Artist(id),
    albumId INT REFERENCES Album(id)
);

CREATE TABLE IF NOT EXISTS albumsToTracks (
    albumsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId INT REFERENCES Album(id),
    trackId INT REFERENCES Track(id)
);

CREATE TABLE IF NOT EXISTS albumsToGenre (
    albumsToGenreId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId INT REFERENCES Album(id),
    genreId INT REFERENCES Genre(id)
);