const express = require('express')
const app = express();
const session = require('express-session');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const qs = require('qs');
const axios = require('axios');
const apiUrlBase = "http://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1";
const queryParams = "numOfRows=1&MobileOS=ETC&MobileApp=App&_type=json&arrange=O&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D";
const mongoose = require('mongoose');

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



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('', function(req, res) {
    res.render('mainF.html');
});
app.get('/placeInfo', function(req, res) {
    res.render('placeInfo.html');
});
app.get('/map', function(req, res) {

    // API 호출 및 데이터 가공
    /*axios.get(apiUrlBase + '?' + queryParams)
        .then(response => {
            const data = response.data; // 외부 API에서 받아온 데이터
            // data를 가공하여 원하는 형태로 데이터를 만듭니다.

            // 클라이언트로 데이터를 응답합니다.
            res.json({ areadata: data });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });*/
    res.render('map.html');
});
app.get('/signup', function(req, res) {
    res.render('signup.html');
});
app.get('/login', function(req, res) {
    res.render('login.html');
});
app.get('/namuGrow', loggedin, function(req, res) {
    res.render('namuGrow.html');
});
app.get('/myPage', function(req, res) {
    res.render('myPage.html');
});
app.get('/signupka', function(req, res) {
    res.render('signupka.html');
});
app.get('/scH', function(req, res) {
    res.render('scH.html');
});
app.get('/sightSeeing', (req, res) => {
    /*const areaCode = req.query.areaCode;

    const relateData = {
        name: 'Example Data',
        description: 'This is an example of related data.'
    };

    res.json({ relatedData });*/

    res.render('sightSeeing.html');
});
app.get('/get-variable', (req, res) => {
    const variableValue = req.query.variable;
    res.json({ variable: variableValue });
});
/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
*/


/*
// MySQL 연결 설정
const dbConfig = {
    host: '127.0.0.1',
    port: 40040,
    user: 'user1',
    password: '1',
    database: 'TWOGETHER'
};

const mysqlClient = mysql.createConnection(dbConfig);

mysqlClient.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});
*/
function loggedin(req, res, next) {
    if (req.session.kakao) {
        next();
    } else {
        res.redirect('/signupka');
    }
}

app.get('/', function(req, res) {
    if (req.session.user) {
        return res.redirect('/main');
    } else {
        return res.redirect('/login');
    }
});
// 로그아웃 처리
app.get('/auth/logout', (req, res) => {
    delete req.session.authData;
    res.redirect('/signupka');
    console.log(req.session.authData);
    console.log("로그아웃");
});


/*const User = require('./models/Users.js');

mongoose.connect('mongodb://localhost:27017/TWOGETHER', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB 연결 성공');

        // 데이터 조회
        return User.find({}); // 모든 사용자 조회
    })
    .then(users => {
        console.log('조회된 사용자:', users);
    })
    .catch(err => {
        console.error('데이터 조회 오류:', err);
    });
*/
//mongoose
const config = require("./.gitignore/config/key.js");
mongoose.connect(config.mongoURI)
    .then(() => console.log("MongoDB 연결 성공..."))
    .catch((err) => console.log(err));
//카카오
app.use(session({
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
    res.setHeader('Set-Cookie', `login=${user.data.id}`);
    req.session.kakao = user.data;

    /*try {
        const kakaoAccessToken = req.query.access_token;

        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
            },
        });
        const kakaoId = response.data.id;
        const username = user.data.properties.nickname;

        //const query = `INSERT INTO userTable (kakaoId, username) VALUES (${kakaoId}, ${username})`;
        const newUser = new User({
            kakaoId,
            username
        });

        await newUser.save();

    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 오류' });
    }*/

    res.redirect('/');
})

/*
app.get('/login', async(req, res) => {
    try {
        const kakaoAccessToken = req.query.access_token;

        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
            },
        });

        const kakaoId = response.data.id;
        const username = user.data.properties.nickname;

        const query = `INSERT INTO userTable (kakaoId, username) VALUES (${kakaoId}, ${username})`;
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});
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
*/
app.get(kakao.redirectUri);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});