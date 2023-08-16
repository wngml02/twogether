var mysql = require('database');
var db = mysql.createConnection({
    username: '',
    num: '',
    id: '',
    password: ''
});
db.connect();

module.exports = db;