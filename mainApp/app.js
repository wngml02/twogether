const express = require('express')
const session = require('express-session');
const nunjucks = require('nunjucks');
const app = express();
const cookieParser = require('cookie-parser');
const qs = require('qs');
const axios = require('axios');
const KakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport');
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

app.set('view engine', 'html');
nunjucks.configure("./views", {
    express: app
})

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
    res.render('main.html');
});
app.get('/placeInfo', function(req, res) {
    res.render('placeInfo.html');
});
app.get('/map', function(req, res) {
    res.render('map.html');
});
app.get('/sightSeeing', function(req, res) {
    res.render('sightSeeing.html');
});
app.get('/signup', function(req, res) {
    res.render('signup.html');
});
app.get('/login', function(req, res) {
    res.render('login.html');
});
app.get('/namuGrow', function(req, res) {
    res.render('namuGrow.html');
});
app.get('/myPage', function(req, res) {
    res.render('myPage.html');
});
app.get('/signupka', function(req, res) {
    res.render('signupka.html');
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

// 세션 및 쿠키 설정
app.use(cookieParser());
app.use(
    session({
        secret: '',
        resave: true,
        saveUninitialized: true,
    })
);

// Passport 초기화 및 세션 사용
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new KakaoStrategy({
            clientID: '18f1f5174d57449e61102b40f59207e4',
            clientSecret: 'dsqOVxIa5Hgy9de5wogSDqaGm6COhILH',
            callbackURL: 'http://localhost:3000/auth/kakao/callback', // 리다이렉트 URI
        },
        (accessToken, refreshToken, profile, done) => {
            // 사용자 정보가 profile에 들어 있음
            return done(null, profile);
        }
    )
);
app.get('/auth/kakao', passport.authenticate('kakao'));

app.get(
    '/auth/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/signup', // 로그인 실패 시 회원가입 페이지로 리다이렉트
    }),
    (req, res) => {
        // 로그인 성공 시 처리
        res.redirect('/');
    }
);


//카카오
/*app.use(session({
        secret: 'ras',
        resave: true,
        secure: false,
        saveUninitialized: false,
    })) //세션을 설정할 때 쿠키가 생성된다.&&req session의 값도 생성해준다. 어느 라우터든 req session값이 존재하게 된다.

const kakao = {
        clientID: '18f1f5174d57449e61102b40f59207e4',
        clientSecret: 'dsqOVxIa5Hgy9de5wogSDqaGm6COhILH',
        redirectUri: 'http://localhost:3000/auth/kakao/callback' //임시 uri..???
    }
    //profile account_email
app.get('/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname,account_email`;
    res.redirect(kakaoAuthURL);
})

app.get('/auth/kakao/callback', async(req, res) => {
    //axios>>promise object
    try { //access토큰을 받기 위한 코드
        token = await axios({ //token
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                    grant_type: 'authorization_code', //특정 스트링
                    client_id: kakao.clientID,
                    client_secret: kakao.clientSecret,
                    redirectUri: kakao.redirectUri,
                    code: req.query.code, //결과값을 반환했다. 안됐다.
                }) //객체를 string 으로 변환
        })
        const kakaoUser = user.data;
        const username = kakaoUser.properties.nickname;
        const userId = kakaoUser.id;

        // MySQL에 사용자 정보 저장
        const newUser = {
            username: username,
            id: userId
        };

        const insertQuery = 'INSERT INTO userTable SET ?';

        connection.query(insertQuery, newUser, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to insert user data' });
                return;
            }

            res.status(200).json({ message: 'User data saved successfully' });
        });

    } catch (err) {
        res.json(err.data);
    }
    //access토큰을 받아서 사용자 정보를 알기 위해 쓰는 코드
    let user;
    try {
        console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
        user = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            } //헤더에 내용을 보고 보내주겠다.
        })
    } catch (e) {
        res.json(e.data);
    }
    console.log(user);

    req.session.kakao = user.data;
    //req.session = {['kakao'] : user.data};

    res.redirect('/');
})
*/
/*
const kakaoUser = user.data;
const username = kakaoUser.properties.nickname;
const userId = kakaoUser.id;

// MySQL에 사용자 정보 저장
const newUser = {
    username: username,
    id: userId
};

const insertQuery = 'INSERT INTO userTable SET ?';

connection.query(insertQuery, newUser, (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert user data' });
        return;
    }

    res.status(200).json({ message: 'User data saved successfully' });
});


app.get('/auth/info', (req, res) => {
    let { nickname } = req.session.kakao.properties;
    res.render('info', {
        nickname,
    })
})

app.get('', (req, res) => {

    res.render('main');
});

app.get(kakao.redirectUri);
*/
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});