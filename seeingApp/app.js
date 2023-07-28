// import request from "request";

const express = require('express');
const app = express();
const port = 3000;

let request = require('request');
let options = {
    'method': 'GET',
    'url': 'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=App&_type=json&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D',
    'headers': {
        'Cookie': 'NCPVPCLB=53dc2963a8054bd57870a8b2355dc148919c5a02851f15d4ffafa945a766b4a1'
    }
};

request(options, function(error, response, body) {
    if (error) {
        throw new Error(error);
    }
    let info = JSON.parse(body);

    for (i in info['reponse']['body']['items']['item']) {
        console.log('설명:' + info['response']['body']['items']['item'][i]['summary']);
        console.log('전화번호:' + info['response']['body']['items']['item'][i]['tel']);
        console.log('');
    }
});

module.exports = app;

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

/*
const url = "http://apis.data.go.kr/B551011/GreenTourService1";
const SERVICE_KEY = "iPOcFKrhHgswObtTYryGrWDTZq4ck8a/GIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7/+MsO52yqttO72Zw==";
const requestUrl = '${url}?serviceKey=${SERVICE_KEY}&seriesCd=01'

request(requestUrl,(err,response,body)=>{
  if(err) throw err;
  parseString(body, (err,result)=>{
    if(err) throw err;
    let parseData = result;
    console.log(body);
  })
})
*/