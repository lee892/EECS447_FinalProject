from mysql.connector import connect, Error

try:
    with connect(
        host="localhost",
        user="root",
        password="password",
        port=3306,
        database="SpotifyDB_Test"
    ) as connection:
        print(connection)
        with connection.cursor() as cursor:
            cursor.execute(create_db_query)
except Error as e:
    print(e)

