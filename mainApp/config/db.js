var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'TWOGETHER'
};
var sessionStore = new MySQLStore(options);

app.use(session({
    secret: "sleepy",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))

const mysql = require('mysql');
const dbInfo = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'TWOGETHER'
};
module.exports = {
    init: function() {
        return mysql.createConnection(dbInfo);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if (err) console.error('mysql 연결 에러 : ' + err);
            else console.log('mysql 연결 성공');
        });
    }
};