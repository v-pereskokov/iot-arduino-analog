const express = require('express');
const path = require('path');
const fetch = require('isomorphic-fetch');

const app = express();
const publicDir = __dirname + '/public';
const host = 'http://192.168.1.153:5000';
const fetchOptions = {method: 'GET', timeout: 6000};

app.get('/set_lcd_text', function (req, res) {
    fetch(host + '/set_lcd_text?text=' + req.query.text, fetchOptions)
        .then(function (response) {
            res.send(req.query.text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/clear_lcd', function (req, res) {
    fetch(host + '/clear_lcd', fetchOptions)
        .then(function(response) {
            res.send('');
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/get_lcd_text', function (req, res) {
    fetch(host + '/get_lcd_text', fetchOptions)
        .then(function(response) {
            response.text();
        })
        .then(function (text) {
            res.send(text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/is_ok_lcd', function (req, res) {
    fetch(host + '/is_ok_lcd', fetchOptions)
        .then(function (response) {
            res.status(response.status).end();
        })
        .catch(function () {
            res.status(200).end();
        });
});

app.get('/turn_motor', function (req, res) {
    fetch(host + '/turn_motor', fetchOptions)
        .then(function (response) {
            response.text();
        })
        .then(function (text) {
            res.send(text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/status_motor', function (req, res) {
    fetch(host + '/status_motor', fetchOptions)
        .then(function (response) {
            response.text();
        })
        .then(function (text) {
            res.send(text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/is_ok_motor', function (req, res) {
    fetch(host + '/is_ok_motor', fetchOptions)
        .then(function (response) {
            res.status(response.status).end();
        })
        .catch(function () {
            res.status(200).end();
        });
});

app.get('/get_temperature', function (req, res) {
    fetch(host + '/status_motor', fetchOptions)
        .then(function (response) {
            response.text();
        })
        .then(function (text) {
            res.send(text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/change_temperature', function (req, res) {
    fetch(host + '/change_temperature?type=' + req.query.type, fetchOptions)
        .then(function (response) {
            response.text();
        })
        .then(function (text) {
            res.send(text);
        })
        .catch(function () {
            res.send('');
        });
});

app.get('/is_ok_temp', function (req, res) {
    fetch(host + '/is_ok_temp', fetchOptions)
        .then(function (response) {
            res.status(response.status).end();
        })
        .catch(function () {
            res.status(200).end();
        });
});

app.use(express.static(publicDir));

app.listen(4000, function () {
    console.log('App started');
});
