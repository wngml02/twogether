const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const mysql = require('mysql');
    //var conn = dbConfig.init();
    //dbConfig.connect(conn);

// bodyParser를 사용하여 POST 데이터를 파싱합니다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/main.html');
});
app.get('/placeInfo', function(req, res) {
    return res.sendFile(__dirname + '/placeInfo.html');
});
app.get('/map', function(req, res) {
    return res.sendFile(__dirname + '/map.html');
});
app.get('/sightSeeing', function(req, res) {
    return res.sendFile(__dirname + '/sightSeeing.html');
});
app.get('/signup', function(req, res) {
    return res.sendFile(__dirname + '/signup.html');
});
app.get('/login', function(req, res) {
    return res.sendFile(__dirname + '/login.html');
});
app.get('/namuGrow', function(req, res) {
    return res.sendFile(__dirname + '/namuGrow.html');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
*/


// MySQL 연결 설정
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'TWOGETHER'
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});

// 회원가입 정보를 처리하는 라우트
app.post('/signup', (req, res) => {
    const { username, num, id, password } = req.body;

    const insertQuery = `INSERT INTO usertable (username, num, id, password) VALUES (?, ?, ?, ?)`;
    connection.query(insertQuery, [username, num, id, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('회원가입 중 오류가 발생했습니다.');
        } else {
            res.send('회원가입이 완료되었습니다!');
        }
    });
});