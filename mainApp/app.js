const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/index.html');
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});