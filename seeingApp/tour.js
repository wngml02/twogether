const express = require('express');
const app = express();
const port = 3000;

let request = require('request');
let options = {
    'method': 'GET',
    'url': 'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=165&pageNo=1&MobileOS=ETC&MobileApp=App&_type=json&arrange=O&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D',
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