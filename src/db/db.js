import mysql from 'mysql';

export const connectToDB = () => {
    const connection = mysql.createConnection({
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB
    });

    connection.connect((err) => {
        if (err) {
            throw err;
        }
    });

    connection.on('error', (err) => {
        throw err;
    });
    return connection;
}

