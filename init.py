from mysql.connector import connect, Error

try:
    with connect(
        host="localhost",
        user="root",
        password="password",
        port=3306
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

        # all SQL commands (split on ';')
        sqlCommands = sqlFile.split(';')

        # Execute every command from the input file
        for command in sqlCommands:
            # This will skip and report errors
            # For example, if the tables do not yet exist, this will skip over
            # the DROP TABLE commands
            try:
                c.execute(command)
            except OperationalError, msg:
                print("Command skipped: ", msg)
        with connection.cursor() as cursor:
            cursor.execute(create_db_query)
except Error as e:
    print(e)

