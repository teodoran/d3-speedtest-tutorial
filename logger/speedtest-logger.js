// CONFIG="prod-config" node speedtest-logger.js
var speedtest = require('speedtest-net'),
    configFile = process.env.CONFIG || "prod-config",
    config = require('./' + configFile),
    secret = 'NotSecret',
    stream = speedtest({maxTime: 5000});

var socket = require('socket.io-client')('http://localhost:3000/authenticated', { query: 'secret=' + secret });

socket.on('connect', function () {
    console.log("Successfully connected")
});

socket.on('disconnect', function () {
    console.log("Disqualified.");
});

stream.on('downloadspeedprogress', function (speed) {
    socket.emit('dlspeed', speed);
});

stream.on('uploadspeedprogress', function (speed) {
    socket.emit('ulspeed', speed);
});

stream.on('data', function (data) {
    socket.emit('results', data);
});

stream.on('error', function (err) {
    console.error(err);
});
