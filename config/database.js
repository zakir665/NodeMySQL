const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost:8888', // MYSQL HOST NAME
    // port     : '8888'
    user     : 'root',        // MYSQL USERNAME
    password : 'root',    // MYSQL PASSWORD
    database : 'curd'      // MYSQL DB NAME
});
module.exports = connection;