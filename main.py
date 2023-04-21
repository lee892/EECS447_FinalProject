from mysql.connector import connect, Error

try:
    with connect(
        host="localhost",
        user="root",
        password="password",
        port=3306
    ) as connection:
        print(connection)
except Error as e:
    print(e)
