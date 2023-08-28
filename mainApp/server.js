const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '6176',
    database : 'TWOGETHER'
});

connection.connect();
connection.query();

// bodyParser를 사용하여 POST 데이터를 파싱합니다.
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일을 서비스합니다.
app.use(express.static('public'));

// 회원가입 페이지를 렌더링하는 라우트
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 회원가입 정보를 처리하는 라우트
app.post('/signup', (req, res) => {
    const { username, num, id, password } = req.body;

    const insertQuery = `INSERT INTO usertable (username, num, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(insertQuery, [username, num, id, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('회원가입 중 오류가 발생했습니다.');
        } else {
            res.send('회원가입이 완료되었습니다!');
        }
    });
});