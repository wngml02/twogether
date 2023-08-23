const mysql = require('mysql');
const dbInfo = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'minseok0326',
    database: 'TWOGETHER'
});

dbInfo.connect();
module.exports = dbInfo;