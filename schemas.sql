CREATE DATABASE IF NOT EXISTS spotifydb;

USE spotifydb;

DROP TABLE IF EXISTS Artist;
CREATE TABLE IF NOT EXISTS Artist (
    artistId VARCHAR(50) NOT NULL PRIMARY KEY,
    artistName VARCHAR(255),
    followerCount INT,
    popularity INT,
    uri VARCHAR(255),
    img INT REFERENCES Img(id)
);

DROP TABLE IF EXISTS Album;
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

DROP TABLE IF EXISTS Track;
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

DROP TABLE IF EXISTS Img;
CREATE TABLE IF NOT EXISTS Img (
    imgId VARCHAR(50) NOT NULL PRIMARY KEY,
    width INT,
    height INT,
    uri VARCHAR(255)
);

DROP TABLE IF EXISTS availableMarkets;
CREATE TABLE IF NOT EXISTS availableMarkets (
    availableMarketsId VARCHAR(50) NOT NULL PRIMARY KEY,
    marketName VARCHAR(255)
);

DROP TABLE IF EXISTS artistsToAlbums;
CREATE TABLE IF NOT EXISTS artistsToAlbums (
    artistsToAlbumsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Artist(id) ON DELETE CASCADE,
    albumId VARCHAR(50) REFERENCES Album(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS albumsToTracks;
CREATE TABLE IF NOT EXISTS albumsToTracks (
    albumsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    albumId VARCHAR(50) REFERENCES Album(id) ON DELETE CASCADE,
    trackId VARCHAR(50) REFERENCES Track(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS artistsToGenre;
CREATE TABLE IF NOT EXISTS artistsToGenre (
    artistsToGenreId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Album(id) ON DELETE CASCADE,
    genreName VARCHAR(50)
);

DROP TABLE IF EXISTS artistsToTracks;
CREATE TABLE IF NOT EXISTS artistsToTracks (
    artistsToTracksId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    artistId VARCHAR(50) REFERENCES Artist(id) ON DELETE CASCADE,
    trackId VARCHAR(50) REFERENCES Track(id) ON DELETE CASCADE
);