from flask import Flask,render_template, request
from flask_mysqldb import MySQL
import mysql.connector
import json
import os
import dotenv
from init import initDB

dotenv.load_dotenv()
initDB()

app = Flask(__name__)
 
app.config['MYSQL_HOST'] = os.environ["DB_HOSTNAME"]
app.config['MYSQL_USER'] = os.environ["DB_USER"]
app.config['MYSQL_PASSWORD'] = os.environ["DB_PASSWORD"]
app.config['MYSQL_DB'] = os.environ["DB_NAME"]
 
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

@app.route('/query1', methods = ['GET'])
def query_one():
    args = request.args
    artist = args.get('artist')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SSELECT artistName FROM Track 
	NATURAL JOIN albumsToTracks NATURAL JOIN artistsToAlbums
	INNER JOIN Artist ON 
	artistsToAlbums.artistId=Artist.artistId WHERE artistName = %s;''',(artist,))
    data = cursor.fetchall()
    print(data)
    cursor.close()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query2', methods = ['GET'])
def query_two():
    args = request.args
    genre = args.get('genre')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT albumName FROM Genre NATURAL JOIN albumsToGenre Natural JOIN Album
                    WHERE genreName = %s ;''',(genre,))
    data = cursor.fetchall()
    cursor.close()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query3', methods = ['GET'])
def query_three():
    args = request.args
    artist_1 = args.get('artist_1')
    artist_2 = args.get('artist_2')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT trackName FROM (SELECT artistName From Artists NATURAL JOIN 
                    artistsToAlbums NATURAL JOIN albumsToTracks NATURAL JOIN Track as a1
                    WHERE a1.artistName = %s) as a2 WHERE a2.artistName = %s''',
                    (artist_1,artist_2))
    cursor.close()
    data = cursor.fetchall()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query4', methods = ['PUT'])
def query_four():
    #{id: 0, name: "ronald "}
    body = request.json
    name = body["name"]
    # print(type(body))
    print(name)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO Track (trackName) VALUES(%s)''', (name,))
    mysql.connection.commit()
    cursor.close()
    return f"Track Added."

@app.route('/query5', methods = ['DELETE'])
def query_five():
    args = request.args
    track_name = args.get('trackName')
    cursor = mysql.connection.cursor()
    print(track_name)
    cursor.execute(''' DELETE FROM Track Where trackName = %s ''', (track_name,))
    mysql.connection.commit()
    cursor.close()
    return f"Track Deleted."
    

app.run(host='localhost', port=5000)