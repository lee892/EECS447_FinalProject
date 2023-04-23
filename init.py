from mysql.connector import connect, Error
import os
import dotenv

def initDB():
    dotenv.load_dotenv()
    try:
        with connect(
            host=os.environ["DB_HOSTNAME"],
            user=os.environ["DB_USER"],
            port=3306,
            password=os.environ["DB_PASSWORD"]
        ) as connection:
            # print(connection)
            # create_db_query = "CREATE DATABASE SpotifyDB_Test"
            # create_movies_table_query = """
            # CREATE TABLE Artist (
            #     id INT NOT NULL PRIMARY KEY,
            #     artistName VARCHAR(255),
            #     followerCount INT,
            #     artist VARCHAR(255),
            #     popularity INT,
            #     uri VARCHAR(255)
            # )
            # """
            fd = open("schemas.sql", "r")
            sqlFile = fd.read()
            fd.close()

            # all SQL commands (split on ";")
            sqlCommands = sqlFile.split(";")

            # Execute every command from the input file
            for command in sqlCommands:
                # This will skip and report errors
                # For example, if the tables do not yet exist, this will skip over
                # the DROP TABLE commands

                with connection.cursor() as cursor:
                    cursor.execute(command)

            # with connection.cursor() as cursor:
            #     cursor.execute(create_db_query)
    except Error as e:
        print(e)

