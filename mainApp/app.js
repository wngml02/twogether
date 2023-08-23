const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
var dbConfig = require(__dirname + '/config/db.js');
//var conn = dbConfig.init();
//dbConfig.connect(conn);

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function(req, res) {
    console.log(req.body)
});
app.post('/signup', (req, res, next) => {
    var user = [req.body.username, req.body.num, req.body.id, req.body.password]
    dbConfig.query('INSERT INTO userTable(`username`,`num`,`id`,`password`) VALUES (?,?,?,?)', user, (err, row) => {
        if (err) console.error(err)
    })
    res.end()    
})

app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/main.html');
});
app.get('/placeInfo', function(req, res) {
    return res.sendFile(__dirname + '/placeInfo.html');
});
app.get('/map', function(req, res) {
    return res.sendFile(__dirname + '/map.html');
});
app.get('/sightSeeing', function(req, res) {
    return res.sendFile(__dirname + '/sightSeeing.html');
});
app.get('/signup', function(req, res) {
    return res.sendFile(__dirname + '/signup.html');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});