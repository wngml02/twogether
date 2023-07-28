const express = require('express')
const app = express()
const port = 3000

let request = require('request');
let options = {
    'method': 'GET',
    'url': 'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=5000&MobileOS=ETC&MobileApp=twogether&_type=json&serviceKey=eJJp4cIsk7s0g0Dk2t1GVKzlyGledlhGUr8gHQiNewRzOBAPt0v%2FFOnEWGcmM5R6X6k5qn7FjIuXgqqB9o4w%2BQ%3D%3D',
    'headers': {
        'Cookie': 'WMONID=sN2sN5XVW3y'
    }
};
const count = 5000;
request(options, function(error, response, body) {
    if (error) {
        throw new Error(error);
    }
    let info = JSON.parse(body);

    for (i in info['response']['body']['items']['item']) {
        console.log('이름 : ' + j + info['response']['body']['items']['item'][i]['title']);
        console.log('주소 : ' + info['response']['body']['items']['item'][i]['addr']);
        console.log(" ")
    }
    j++;
});
app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/map.html');
});
app.get('/page', function(req, res) {
    return res.send('/page');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});