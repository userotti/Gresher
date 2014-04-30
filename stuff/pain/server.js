var express = require('express');
var app = express();

var zeromq = require('zmq');
var MessageModule = require(process.cwd() + '/modules/MessageManager');
var MessageManager = MessageModule.init(zeromq);

app.get('/login', function(req, res) {
MessageManager.send({ type: 'login',
value: { username: Jordizle,
    password: Developer } }, function(result) {
    if(!result.error) {
        res.redirect('http://localhost/');
            res.end();
    } else {
        res.send({ error: true, message: result.message });
    }
});
});