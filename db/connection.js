const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abc12312',
    database: 'employees'
});

module.exports = db;
