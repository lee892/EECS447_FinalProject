from mysql.connector import connect, Error
import os
import dotenv
import requests

ARTISTS = [
    "4Z8W4fKeB5YxbusRsdQVPb",
    "53XhwfbYqKCa1cC15pYq2q",
    "6eUKZXaKkcviH0Ku9w2n3V",
    "4iHNK0tOyZPYnBU7nGAgpQ",
    "3WrFJ7ztbogyGnTHbHJFl2",
    "0L8ExT028jH3ddEcZwqJJ5",
    "6P7H3ai06vU1sGvdpBwDmE",
    "2YZyLoL8N0Wb9xBt1NhZWg",
    "5K4W6rqBFWDnAN6FQUkS6x",
    "5vngPClqofybhPERIqQMYd",
    "7FBcuc1gsnv6Y1nwFtNRCb",
    "2wOqMjp9TyABvtHdOSOTUS",
    "1YzCsTRb22dQkh9lghPIrp",
    "4F7Q5NV6h5TSwCainz8S5A",
    "5pKCCKE2ajJHZ9KAiaK11H",
    "3nFkdlSjzX9mRTtwJOzDYB"
]

def printDBContents(connection):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM artistsToAlbums;")
        data = cursor.fetchall()
        for d in data:
            print(d)


def populateDB(connection):
    dotenv.load_dotenv()
    print(connection)
    #Get access token from Spotify
    response = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "client_credentials",
            "client_id": os.environ["CLIENT_ID"],
            "client_secret": os.environ["CLIENT_SECRET"]
        }
    )
    access_token = response.json()["access_token"]
    #Iterate over given list of artists
    for artist in ARTISTS:
        #Get artist's albums
        albums = requests.get(
            f"https://api.spotify.com/v1/artists/{artist}/albums",
            headers={"Authorization": f"Bearer {access_token}"}
        ).json()["items"]
        
        i = 0
        while i in range(len(albums)) and i < 4:
            albumId = albums[i]["id"]
            
            #Add album to database
            with connection.cursor() as cursor:
                albumType = albums[i]["type"]
                totalTracks = albums[i]["total_tracks"]
                albumName = albums[i]["name"].translate(str.maketrans({"'": r"\'", "\\": r"\\"}))
                print(f"Album {i}: {albumName}")
                releaseDate = albums[i]["release_date"]
                releaseDatePrecision = albums[i]["release_date_precision"]
                popularity = albums[i].get("popularity", 0)
                uri = albums[i]["uri"]
                cursor.execute(f"INSERT INTO Album(albumId, albumType, totalTracks, albumName, releaseDate, releaseDatePrecision, popularity, uri) \
                            VALUES('{albumId}', '{albumType}', {totalTracks}, '{albumName}', '{releaseDate}', '{releaseDatePrecision}', {popularity}, '{uri}');")
            #Add artist-album relationship
            with connection.cursor() as cursor:
                cursor.execute(f"INSERT INTO artistsToAlbums(artistId, albumId) \
                               VALUES('{artist}', '{albumId}')")
            #Get all tracks of album
            tracks = requests.get(
                f"https://api.spotify.com/v1/albums/{albumId}",
                headers={"Authorization": f"Bearer {access_token}"}
            ).json()["tracks"]["items"]

            for track in tracks:
                trackId = track["id"]
                
                #Add track to database
                with connection.cursor() as cursor:
                    discNumber = track["disc_number"]
                    msDuration = track["duration_ms"]
                    isExplicit = track["explicit"]
                    trackName = track["name"].translate(str.maketrans({"'": r"\'", "\\": r"\\"}))
                    print(f"Track: {trackName}")
                    previewUri = track["preview_url"]
                    trackNum = track["track_number"]
                    uri = track["uri"]
                    cursor.execute(f"INSERT INTO Track(trackId, discNumber, msDuration, isExplicit, trackName, previewUri, trackNum, uri) \
                                VALUES('{trackId}', {discNumber}, {msDuration}, {isExplicit}, '{trackName}', '{previewUri}', {trackNum}, '{uri}');")
                #Add album-track relationship
                with connection.cursor() as cursor:
                    cursor.execute(f"INSERT INTO albumsToTracks(albumId, trackId) \
                                VALUES('{albumId}', '{trackId}');")
                for trackArtist in track["artists"]:
                    trackArtistId = trackArtist["id"]
                    #Get all artist info
                    artistInfo = requests.get(
                        f"https://api.spotify.com/v1/artists/{trackArtistId}",
                        headers={"Authorization": f"Bearer {access_token}"}
                    ).json()
                    #Check if Artist exists
                    existingArtist = False
                    with connection.cursor() as cursor:
                        cursor.execute(f"SELECT * FROM Artist;")
                        if len(cursor.fetchall()) > 0:
                            existingArtist = True
                    #Add artist if not exists
                    if not existingArtist:
                        with connection.cursor() as cursor:
                            trackArtistName = artistInfo["name"]
                            print(f"Artist: {trackArtistName}")
                            followerCount = artistInfo["followers"]["total"]
                            popularity = artistInfo["popularity"]
                            uri = artistInfo["uri"]
                            cursor.execute(f"INSERT INTO Artist(artistId, artistName, followerCount, popularity, uri) \
                                        VALUES('{trackArtistId}', '{trackArtistName}', {followerCount}, {popularity}, '{uri}');")

                    #Add artist-track relationship
                    with connection.cursor() as cursor:
                        cursor.execute(f"INSERT INTO artistsToTracks(artistId, trackId) \
                                    VALUES('{trackArtistId}', '{trackId}');")
            i += 1


def initDB():
    dotenv.load_dotenv()
    try:
        #Connect to database
        with connect(
            host=os.environ["DB_HOSTNAME"],
            user=os.environ["DB_USER"],
            port=3306,
            password=os.environ["DB_PASSWORD"]
        ) as connection:
            #Open .sql file for reading
            fd = open("schemas.sql", "r")
            sqlFile = fd.read()
            fd.close()

            # all SQL commands (split on ";")
            sqlCommands = sqlFile.split(";")
            print("before sql commands")
            # Execute every command from the input file
            for command in sqlCommands:
                # This will skip and report errors
                # For example, if the tables do not yet exist, this will skip over
                # the DROP TABLE commands
                with connection.cursor() as cursor:
                    cursor.execute(command)

            print("before populate")
            #Populate database with entries
            populateDB(connection)
            print("after populate")
            print("print db contents for debugging")
            printDBContents(connection)
            print("after print db contents")
    except Error as e:
        print(e)
