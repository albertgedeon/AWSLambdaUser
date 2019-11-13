'use strict';

const mysql = require('mysql2');
// const util = require('util');

// create the connection to database
const connectionPool = mysql.createPool({
    host: 'intranet-instance-1.cg5q91fefi2q.us-west-2.rds.amazonaws.com',
    user: 'users',
    password: 'YTkEbUEjY76c2DND',
    database: 'Users',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
});

connectionPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return;
})

const promisePool = connectionPool.promise();

// connectionPool.query = util.promisify(connectionPool.query)

module.exports = promisePool;
