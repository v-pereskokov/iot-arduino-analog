const express = require('express');
const path = require('path');

const app = express();
const publicDir = __dirname + '/public';

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, '/index.html'));
});

app.use(express.static(publicDir));

app.listen(4000, function () {
    console.log('App started');
});
