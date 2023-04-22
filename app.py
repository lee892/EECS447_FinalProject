from flask import Flask,render_template, request
from flask_mysqldb import MySQL
import mysql.connector
import json
 
app = Flask(__name__)
 
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'SpotifyDB'
 
mysql = MySQL(app)

@app.route('/', methods = ['GET'])
def getArtists():
    args = request.args
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM Artist; ''')
    data = cursor.fetchall()
    cursor.close()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query1', methods = ['GET'])
def query_one():
    args = request.args
    artist = args.get('artist')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT artist FROM Track NATURAL JOIN AlbumstoTracks NATURAL JOIN ArtistatoAlbums 
                    WHERE artistId = %s;''',(artist))
    data = cursor.fetchall()
    cursor.close()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query2', methods = ['GET'])
def query_two():
    args = request.args
    artist = args.get('artist')
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT artist FROM Track NATURAL JOIN AlbumstoTracks NATURAL JOIN ArtistatoAlbums 
                    WHERE artistId = %s;''',(artist))
    data = cursor.fetchall()
    cursor.close()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

@app.route('/query3', methods = ['GET'])
def query_three():
    args = request.args
    artist_1 = args.get('artist_1')
    artist_2 = args.get('artist_2')
    name = request.form['name']
    age = request.form['age']
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''',(name,age))
    cursor.close()
    data = cursor.fetchall()
    res = {"name": [x[0] for x in data]}
    return json.dumps(res)

# @app.route('/query4', methods = ['PUT'])
# def login():
#     if request.method == 'GET':
#         return "Login via the login Form"
     
#     if request.method == 'POST':
#         name = request.form['name']
#         age = request.form['age']
#         cursor = mysql.connection.cursor()
#         cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''',(name,age))
#         mysql.connection.commit()
#         cursor.close()
#         return f"Done!!"

# @app.route('/login', methods = ['DELETE'])
# def login():
#     if request.method == 'GET':
#         return "Login via the login Form"
     
#     if request.method == 'POST':
#         name = request.form['name']
#         age = request.form['age']
#         cursor = mysql.connection.cursor()
#         cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''',(name,age))
#         mysql.connection.commit()
#         cursor.close()
#         return f"Done!!"
 
app.run(host='0.0.0.0', port=5000)