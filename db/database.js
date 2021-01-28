const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

module.exports = db;