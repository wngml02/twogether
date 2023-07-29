// import request from "request";

const express = require('express');
const app = express();
const port = 3000;

let request = require('request');
let options = {
    'method': 'GET',
    'url': 'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=App&_type=json&arrange=A&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D',
    'headers': {
        'Accept': 'application/json',
        'Cookie': 'NCPVPCLB=53dc2963a8054bd57870a8b2355dc148919c5a02851f15d4ffafa945a766b4a1'
    }
};

request(options, function(error, response, body) {
    if (error) {
        throw new Error(error);
    }
    let info = JSON.parse(body);

    for (i in info['response']['body']['items']['item']) {
        console.log('관광지명:' + info['response']['body']['items']['item'][i]['title']);
        console.log('소개:' + info['response']['body']['items']['item'][i]['summary']);
        console.log('');
    }
    i++;
});

// module.exports = app;

app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/sightSeeing.html');
});
app.get('/page', function(req, res) {
    return res.send('/page');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


/*
let parseString = require('xml2js').parseString;

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