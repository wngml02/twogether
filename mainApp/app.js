const express = require('express')
const session = require('express-session');
const nunjucks = require('nunjucks');
const app = express()
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

app.use(session({
    secret: '0000',
    resave: false,
    saveUninitialized: true
}));
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
    res.render('/main.html');
});
app.get('/placeInfo', function(req, res) {
    res.render('/placeInfo.html');
});
app.get('/map', function(req, res) {
    res.render('/map.html');
});
app.get('/sightSeeing', function(req, res) {
    res.render('/sightSeeing.html');
});
app.get('/signup', function(req, res) {
    res.render('/signup.html');
});
app.get('/login', function(req, res) {
    res.render('/login.html');
});
app.get('/namuGrow', function(req, res) {
    res.render('/namuGrow.html');
});
app.get('/myPage', function(req, res) {
    res.render('/myPage.html');
});
app.get('/signupka', function(req, res) {
    res.render('/signupka.html');
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
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'TWOGETHER'
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});

app.post('/login', (req, res) => {
    const { id, password } = req.body;

    const selectQuery = 'SELECT * FROM usertable WHERE id = ?';
    connection.query(selectQuery, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('로그인 중 오류가 발생했습니다.');
        } else {
            if (results.length === 0) {
                res.status(401).send('해당 아이디를 찾을 수 없습니다.');
            } else {
                const user = results[0];
                if (user.password === password) {
                    req.session.user = user; // 사용자 정보를 세션에 저장
                    res.redirect('/main');
                } else {
                    res.status(401).send('비밀번호가 일치하지 않습니다.');
                }
            }
        }
    });
});

app.get('/', function(req, res) {
    if (req.session.user) {
        return res.redirect('/main');
    } else {
        return res.redirect('/login');
    }
});