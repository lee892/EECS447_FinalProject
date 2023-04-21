CREATE DATABASE SpotifyDB;

CREATE TABLE Artist (
    id INT NOT NULL PRIMARY KEY,
    artistName VARCHAR(255),
    followerCount INT,
    artist VARCHAR(255),
    popularity INT,
    uri VARCHAR(255)
);

CREATE TABLE Album (
    id INT NOT NULL PRIMARY KEY,
    albumType VARCHAR(255),
    totalTracks INT,
    albumName VARCHAR(255),
    releaseDate 
    artist VARCHAR(255),
    popularity INT,
    uri VARCHAR(255)
);

CREATE TABLE Track (

);

CREATE TABLE User (

);

CREATE TABLE Image (

);

CREATE TABLE Playlist (

);