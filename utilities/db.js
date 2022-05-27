const mysql = require('mysql2');
const { ApiError } = require('./api-error');
require('dotenv').config();


const mySqlConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


const runQueryAsync = async(query, params) => {
    return new Promise((resolve) => {
        // mySqlConn.connect();
        mySqlConn.query(query, params, (error, result) => {
            if (error)
                resolve({ error });
            else
                resolve({ result })
        });
        // mySqlConn.end();
    })
}



module.exports = { runQueryAsync }