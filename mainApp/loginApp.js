const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');

const app = express();

// 사용자 정보를 저장할 데이터베이스
const db = new Map();
// KEY=VALUE 형태로 브라우저에 저장되는 쿠키의 KEY
const USER_COOKIE_KEY = 'USER';
const USERS_JSON_FILENAME = 'users.json';

async function fetchAllUsers() {
    const data = await fs.readFile(USERS_JSON_FILENAME);
    const users = JSON.parse(data.toString());
    return users;
}

async function fetchUser(id) {
    const users = await fetchAllUsers();
    const user = users.find((user) => user.id === id);
    return user;
}

async function createUser(newUser) {
    const users = await fetchAllUsers();
    users.push(newUser);
    await fs.writeFile(USERS_JSON_FILENAME, JSON.stringify(users));
}

// 위에서 작성한 html을 클라이언트에 제공하기 위한 미들웨어
app.use(express.static(path.join(__dirname, 'public')));
// 쿠키를 파싱하기 위한 미들웨어
app.use(cookieParser());
// x-www-form-urlencoded 타입의 form 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {
    // 'user'라는 쿠키 데이터를 가져옴
    // 쿠키가 존재하지 않을 경우 로그인이 되지 않았다는 뜻
    const userCookie = req.cookies[USER_COOKIE_KEY];

    if (userCookie) {
        // 쿠키가 존재하는 경우, 쿠키 VALUE를 JS 객체로 변환
        const userData = JSON.parse(userCookie);
        // user 객체에 저장된 username이 db에 존재하는 경우,
        // 유효한 user이며 로그인이 잘 되어 있다는 뜻.
        const user = await fetchUser(userData.id);
        if (user) {
            // JS 객체로 변환된 user 데이터에서 username, name, password를 추출하여 클라이언트에 렌더링
            res.status(200).send(`
                <a href="/logout">Log Out</a>
                <h1>아이디: ${userData.username}, 전화번호: ${userData.num}, 아이디: ${userData.id}, 비밀번호: ${userData.pw}</h1>
            `);
            return;
        }
    }

    // 쿠키가 존재하지 않는 경우, 로그인 되지 않은 것으로 간주
    res.status(200).send(`
        <a href="/login">Log In</a>
        <a href="/signup">Sign Up</a>
        <h1>로그인이 필요합니다.</h1>
    `);
});

// 회원가입
app.post('/signup', async(req, res) => {
    const { username, num, id, pw } = req.body;
    const exists = db.get(id);

    // 이미 존재하는 id일 경우 회원 가입 실패
    if (exists) {
        res.status(400).send(`duplicate username: ${id}`);
        return;
    }

    // 아직 가입되지 않은 id인 경우 db에 저장
    // KEY = id, VALUE = { username, num, pw }
    const newUser = {
        username,
        num,
        id,
        pw,
    };
    await createUser({
        username,
        num,
        id,
        pw,
    });

    console.log(newUser);

    // db에 저장된 user 객체를 문자열 형태로 변환하여 쿠키에 저장
    res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
    // 가입 완료 후, 루트 페이지로 이동
    res.redirect('/');
});


// 로그인
app.post('/login', (req, res) => {
    const { id, pw } = req.body;
    const user = db.get(id);

    // 가입 안 된 id인 경우
    if (!user) {
        res.status(400).send(`not registered id: ${id}`);
        return;
    }
    // 비밀번호가 틀렸을 경우
    if (pw !== user.pw) {
        res.status(400).send('incorrect password');
        return;
    }

    // db에 저장된 user 객체를 문자열 형태로 변환하여 쿠키에 저장
    res.cookie(USER_COOKIE_KEY, JSON.stringify(user));
    // 로그인(쿠키 발급) 후, 루트 페이지로 이동
    res.redirect('/');
});


// 로그아웃
app.get('/logout', (req, res) => {
    // 쿠키 삭제 후 루트 페이지로 이동
    res.clearCookie(USER_COOKIE_KEY);
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('server is running at 3000');
});

/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

*/