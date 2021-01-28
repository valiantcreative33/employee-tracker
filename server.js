const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

connection.query(
    `SELECT * FROM employee WHERE role_id = 1`,
    ['Page', 45],
    function(err, results) {
        console.log(results);
    }
);