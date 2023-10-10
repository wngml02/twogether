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
const jwt = require("jsonwebtoken");
require('dotenv').config();

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

//app.use(`/.netlify/functions/api`, router);

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
    res.render('map.html');
});
app.get('/signup', function(req, res) {
    res.render('signup.html');
});
app.get('/login', loggedin2, function(req, res) {
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
    res.render('sightSeeing.html');
});
app.get('/get-variable', (req, res) => {
    const variableValue = req.query.variable;
    res.json({ variable: variableValue });
});

app.get('/get-variable2', (req, res) => {
    const variableValue2 = req.query.variable2;
    res.json({ variable2: variableValue2 });
});

function loggedin(req, res, next) {
    if (req.session.kakao) {
        next();
    } else {
        res.redirect('/signupka');
    }
}

function loggedin2(req, res, next) {
    if (req.session.kakao) {
        res.redirect('/');
    } else {
        next();
    }

}
app.get('/loginclick', (req, res) => {
    // 사용자가 이미지를 클릭했을 때, 카카오 로그인 정보를 확인하고 리디렉션을 수행합니다.
    if (req.session.kakao) {
        delete req.session.user;
        // 로그인된 상태이면 메인 페이지로 리디렉션
        res.redirect('/auth/logout');
    } else {
        // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
        res.redirect('/signupka');
    }
});
app.get('/get-data', (req, res) => {
    res.json(jsonData);
});

function namuheart(req, res) {
    const savedKakaoId = localStorage.getItem('kakaoId');
    const savedUsername = localStorage.getItem('username');

    if (savedKakaoId && savedUsername) {
        // kakaoId, username 반환
        return { kakaoId: savedKakaoId, username: savedUsername };
    } else {
        return { error: 'No data found' };
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
    req.session.destroy((err) => {
        if (err) {
            console.error('세션 제거 중 오류 발생:', err);
        }
        // 로그아웃 후 홈페이지 또는 다른 페이지로 리디렉션할 수 있습니다.
        res.redirect('/');
    });
});



const User = require('./models/Users.js');

/*
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

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'twogether' })
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

let jsonData = null;
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
    try {
        const kakaoUserInfo = user.data;
        const { kakaoId } = kakaoUserInfo.id;

        // 카카오로부터 받아온 사용자 정보를 로컬 스토리지에 저장


        // 카카오로부터 받아온 사용자 정보
        let user = await User.findOne({ kakaoId });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        };
        // 예시에서 가정한 변수


        // JSON 데이터를 전역 변수에 저장
        //Object.assign(jsonData, newData);

        console.log('데이터를 설정하고 전달했습니다.');
        // 사용자 정보를 MongoDB에 저장
        const newUser = new User({
            kakaoId: kakaoUserInfo.id,
            username: kakaoUserInfo.properties.nickname,
            accessToken: kakaoUserInfo.access_token
        })
        const savedUser = await newUser.save();
        const payload = { // json web token 으로 변환할 데이터 정보
            user: {
                id: user.id,
            },
        };


        // json web token 생성하여 send 해주기
        jwt.sign(
            payload, // 변환할 데이터
            "jwtSecret", // secret key 값
            { expiresIn: "1h" }, // token의 유효시간
            (err, token) => {
                if (err) throw err;
                res.send({ token }); // token 값 response 해주기
            }
        );

    } catch (err) {

    }

    res.setHeader('Set-Cookie', `login=${user.data.id}`);
    req.session.kakao = user.data;
    console.log(user);
    jsonData = {
        id: user.data.id,
    };
    res.redirect('/');
});

const userSchema = new mongoose.Schema({ kakaoId: String, username: String, accessToken: String });
const user = mongoose.model('user', userSchema);
module.exports = user;

//채연아 여기가 나무야

app.get(kakao.redirectUri);
app.get('/get-data', (req, res) => {
    res.json(jsonData);
    const dataToUse = jsonData;

    res.json(dataToUse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

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