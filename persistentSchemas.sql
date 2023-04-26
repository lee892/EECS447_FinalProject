CREATE DATABASE IF NOT EXISTS spotifydb;

USE spotifydb;

CREATE TABLE IF NOT EXISTS Artist (
    artistId VARCHAR(50) NOT NULL PRIMARY KEY,
    artistName VARCHAR(255),
    followerCount INT,
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Album (
    albumId VARCHAR(50) NOT NULL PRIMARY KEY,
    albumType VARCHAR(255),
    totalTracks INT,
    albumName VARCHAR(255),
    releaseDate VARCHAR(50),
    releaseDatePrecision VARCHAR(50),
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Track (
    trackId VARCHAR(50) NOT NULL PRIMARY KEY,
    discNumber INT,
    msDuration INT,
    isExplicit BOOLEAN,
    trackName VARCHAR(255),
    previewUri VARCHAR(255),
    trackNum INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

CREATE TABLE IF NOT EXISTS Img (
    imgId VARCHAR(50) NOT NULL PRIMARY KEY,
    width INT,
    height INT,
    uri VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS availableMarkets (
    availableMarketsId VARCHAR(50) NOT NULL PRIMARY KEY,
    marketName VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS artistsToAlbums (
    artistsToAlbumsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Artist(id),
    albumId VARCHAR(50) REFERENCES Album(id)
);

CREATE TABLE IF NOT EXISTS albumsToTracks (
    albumsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId VARCHAR(50) REFERENCES Album(id),
    trackId VARCHAR(50) REFERENCES Track(id)
);

CREATE TABLE IF NOT EXISTS artistsToGenre (
    artistsToGenreId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Album(id),
    genreName VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS artistsToTracks (
    artistsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Artist(id),
    trackId VARCHAR(50) REFERENCES Track(id)
);