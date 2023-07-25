const express = require('express')
const app = express()
const port = 3000

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/map.html');
});
app.get('/page', function(req, res) {
    return res.send('/page');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});