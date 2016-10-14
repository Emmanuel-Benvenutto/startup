// VENDOR LIBS
var express = require('express');
var app = express();
var moment = require('moment');

var initTime;
var port;
var router;

app.use(express.static(__dirname));

port = process.env.PORT || '8080';

//Start the server
app.listen(port);
initTime = moment().format('YYYY-MM-DD HH:mm');
console.log('api running on port ' + port + ' since ' + initTime);