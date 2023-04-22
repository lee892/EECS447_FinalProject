from mysql.connector import connect, Error

try:
    with connect(
        host="localhost",
        user="root",
        password="password",
        port=3306
    ) as connection:
        print(connection)
        create_db_query = "CREATE DATABASE SpotifyDB_Test"
        create_movies_table_query = """
        CREATE TABLE Artist (
            id INT NOT NULL PRIMARY KEY,
            artistName VARCHAR(255),
            followerCount INT,
            artist VARCHAR(255),
            popularity INT,
            uri VARCHAR(255)
        )
        """
        with connection.cursor() as cursor:
            cursor.execute(create_db_query)
except Error as e:
    print(e)

