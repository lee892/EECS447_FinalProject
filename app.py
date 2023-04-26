from flask import Flask,render_template, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import mysql.connector
import json
import os
import sys
import dotenv
from init import initDB
from generateId import generateId

dotenv.load_dotenv()

if len(sys.argv) > 1 and sys.argv[1] == "init":
    initDB()

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = os.environ["DB_HOSTNAME"]
app.config['MYSQL_USER'] = os.environ["DB_USER"]
app.config['MYSQL_PASSWORD'] = os.environ["DB_PASSWORD"]
app.config['MYSQL_DB'] = os.environ["DB_NAME"]
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/', methods = ['GET'])
def getArtists():
    args = request.args
    cursor = mysql.connection.cursor()
    cursor.execute(" SELECT * FROM Artist; ")
    data = cursor.fetchall()
    cursor.close()
    res = {"name": [x[1] for x in data]}
    return json.dumps(res)

@app.route('/query1', methods = ['GET', 'POST'])
def query_one():
    args = request.args
    artist = args.get('artist')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT discNumber, msDuration, isExplicit, trackName, previewUri
        FROM Track NATURAL JOIN artistsToTracks INNER JOIN Artist ON 
        artistsToTracks.artistId=Artist.artistId WHERE artistName = %s;''',[artist])
    data = cursor.fetchall()

    for d in data:
        print(d)
    cursor.close()
    res = {"name": [x[3] for x in data]}
    return json.dumps(res)

@app.route('/query2', methods = ['GET', 'POST'])
def query_two():
    args = request.args
    genre = args.get('genre')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT artistName, followerCount, popularity FROM artistsToGenre Natural JOIN Artist
                    WHERE genreName = %s;''',[genre])
    data = cursor.fetchall()
    cursor.close()
    for d in data:
        print(d)
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query3', methods = ['GET', 'POST'])
def query_three():
    args = request.args
    print(args)
    artist_1 = args.get('artist1')
    print("artist1:", artist_1)
    artist_2 = args.get('artist2')
    print("artist2:", artist_2)
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT a1.trackName FROM (SELECT artistName, trackName FROM artistsToTracks att1 NATURAL JOIN Track t INNER JOIN Artist ON att1.artistId = Artist.artistId ) a1,
(SELECT artistName, trackName FROM artistsToTracks att NATURAL JOIN Track t INNER JOIN Artist ON att.artistId = Artist.artistId ) a2
                    WHERE a1.artistName = %s AND a2.artistName =  %s AND a1.trackName = a2.trackName''',
                    [artist_1,artist_2])
    data = cursor.fetchall()
    cursor.close()
    for d in data:
        print(d)
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query4', methods = ['PUT'])
def query_four():
    #{id: 0, data: {"trackName": "hello", "trackId": "randomid"... }}
    args = request.args
    print(args)
    trackName = args.get("track")
    artistName = args.get("artist")
    albumName = args.get("album")
    # print(type(body))
    # print(body)
    trackId = generateId(16)
    artistId = generateId(16)
    albumId = generateId(16)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO Album(albumId, albumName) VALUES(%s, %s);''',[albumId, albumName])
    cursor.execute(''' INSERT INTO Track(trackId, trackName) VALUES(%s, %s);''',[trackId, trackName])
    cursor.execute(''' INSERT INTO Artist(artistId, artistName) VALUES(%s, %s);''', [artistId, artistName])
    cursor.execute(''' INSERT INTO artistsToTracks(artistId, trackId) VALUES(%s, %s);''', [artistId, trackId])
    cursor.execute(''' INSERT INTO artistsToAlbums(artistId, albumId) VALUES(%s, %s);''', [artistId, albumId])
    mysql.connection.commit()
    cursor.close()
    cursor = mysql.connection.cursor()
    cursor.execute(''' Select * from Track where trackName=%s''', [trackName])
    data = cursor.fetchall()
    print(data)
    cursor.close()

    return f"Track Added."

@app.route('/query5', methods = ['DELETE'])
def query_five():
    args = request.args
    track_name = args.get('deletion')
    cursor = mysql.connection.cursor()
    print(track_name)
    cursor.execute(''' DELETE FROM Track Where trackName = %s ''', [track_name])
    mysql.connection.commit()
    cursor.close()
    cursor = mysql.connection.cursor()
    cursor.execute(''' Select * from Track where trackName=%s''', [track_name])
    data = cursor.fetchall()
    print("data:",data)
    cursor.close()
    return f"Track Deleted."


app.run(host='localhost', port=5000)