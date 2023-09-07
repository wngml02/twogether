const express = require('express')
const session = require('express-session');
const app = express()
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
    res.sendFile(__dirname + '/main.html');
});
app.get('/placeInfo', function(req, res) {
    res.sendFile(__dirname + '/placeInfo.html');
});
app.get('/map', function(req, res) {

    data = req.query.variable;
    res.sendFile(__dirname + '/map.html');
});
app.get('/sightSeeing', function(req, res) {
    res.sendFile(__dirname + '/sightSeeing.html');
});
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});
app.get('/namuGrow', function(req, res) {
    res.sendFile(__dirname + '/namuGrow.html');
});
app.get('/myPage', function(req, res) {
    res.sendFile(__dirname + '/myPage.html');
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

//kakao login
//const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');

app.use(session({
    secret: 'two',
    resave: true,
    secure: false,
    saveUninitialized: false,
}));

const kakao = {
    clientID: '18f1f5174d57449e61102b40f59207e4',
    clientSecret: 'dsqOVxIa5Hgy9de5wogSDqaGm6COhILH',
    redirectUri: 'https://localhost:3000/login/auth/kakao/callback'
}
app.get('/login/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_image,profile_nickname,account_email`;
    res.redirect(kakaoAuthURL);
})

app.get('/login/auth/kakao/callback', async(req, res) => {
    try {
        token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ //객체를 string 으로 변환
                grant_type: 'authorization_code', //특정 스트링
                client_id: kakao.clientID,
                client_secret: kakao.clientSecret,
                redirectUri: kakao.redirectUri,
                code: req.query.code,
            })
        })
    } catch (err) {
        res.json(err.data);
    }

    let user;
    try {
        console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
        user = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    } catch (e) {
        res.json(e.data);
    }
    console.log(user);

    req.session.kakao = user.data;
    res.send('success');
})
app.get('/auth/info', (req, res) => {
        let { nickname } = req.session.kakao.properties;
        res.render('info.html', {
            nickname
        })
    })
    //app.get('/', (req, res) => {
    //res.render('main.html');

//})
app.get(kakao.redirectUri)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});