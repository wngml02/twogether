const express = require('express')
const app = express()
const port = 3000
var dbConfig = require(__dirname + '/config/db.js');
var conn = dbConfig.init();
dbConfig.connect(conn);


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