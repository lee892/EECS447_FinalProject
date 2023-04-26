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
    res = {"body": [x for x in data]}
    return json.dumps(res)

@app.route('/query1', methods = ['GET', 'POST'])
def query_one():
    args = request.args
    artist = args.get('artist')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT DISTINCT trackName
        FROM Track NATURAL JOIN artistsToTracks INNER JOIN Artist ON 
        artistsToTracks.artistId=Artist.artistId WHERE LOWER(artistName) = LOWER(%s);''',[artist])
    data = cursor.fetchall()

    for d in data:
        print(d)
    cursor.close()
    res = {"body": [x for x in data]}
    print(res)
    return json.dumps(res)

@app.route('/query2', methods = ['GET', 'POST'])
def query_two():
    args = request.args
    genre = args.get('genre')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT DISTINCT artistName FROM artistsToGenre Natural JOIN Artist
                    WHERE LOWER(genreName) = LOWER(%s);''',[genre])
    data = cursor.fetchall()
    cursor.close()
    for d in data:
        print(d)
    res = {"body": [x for x in data]}
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
    cursor.execute(''' SELECT DISTINCT a1.trackName FROM (SELECT artistName, trackName FROM artistsToTracks att1 NATURAL JOIN Track t INNER JOIN Artist ON att1.artistId = Artist.artistId ) a1,
(SELECT artistName, trackName FROM artistsToTracks att NATURAL JOIN Track t INNER JOIN Artist ON att.artistId = Artist.artistId ) a2
                    WHERE LOWER(a1.artistName) = LOWER(%s) AND LOWER(a2.artistName) =  LOWER(%s) AND a1.trackName = a2.trackName''',
                    [artist_1,artist_2])
    data = cursor.fetchall()
    cursor.close()
    for d in data:
        print(d)
    res = {"body": [x for x in data]}
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
    albumId = generateId(16)
    artistId = ""
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT artistId FROM Artist WHERE LOWER(artistName) = LOWER(%s)''',(artistName,))
    data = cursor.fetchall()
    cursor.close()
    if len(data) == 0:
        artistId = generateId(16)
        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO Artist(artistId, artistName) VALUES(%s, %s); ''', (artistId, artistName))
        cursor.close()
    else:
        artistId = data[0]
    print(data)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO Album(albumId, albumName) VALUES(%s, %s);
                    INSERT INTO Track(trackId, trackName) VALUES(%s, %s);
                    INSERT INTO artistsToAlbums(artistId, albumId) VALUES(%s, %s);
                    INSERT INTO artistsToTracks(artistId, trackId) VALUES(%s, %s); ''',
                    (albumId, albumName, trackId, trackName, artistId, albumId, artistId, trackId,))
    cursor.close()
    mysql.connection.commit()
    res = {"body": f"Track {trackName} Added."}
    return json.dumps(res)

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
    cursor.execute(''' Select * from Track where LOWER(trackName)=LOWER(%s)''', [track_name])
    data = cursor.fetchall()
    print("data:",data)
    cursor.close()
    res = {"body": f"Track {track_name} Deleted."}
    return json.dumps(res)

app.run(host='localhost', port=5000)