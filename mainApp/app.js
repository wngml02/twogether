const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/index.html');
});
app.get('/page', function(req, res) {
    return res.send('/page');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});