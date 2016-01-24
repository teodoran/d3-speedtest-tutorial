// CONFIG="prod-config" node speedtest-logger.js
var speedtest = require('speedtest-net'),
    configFile = process.env.CONFIG || "dev-config",
    config = require('./' + configFile),
    fs = require('fs'),
    secret = 'NotSecret',
    history = JSON.parse(fs.readFileSync('logger/log.json'));

var socket = require('socket.io-client')('http://localhost:3000/authenticated', { query: 'secret=' + secret });

socket.on('connect', function () {
    console.log("Successfully connected")
});

socket.on('disconnect', function () {
    console.log("Disqualified.");
});

socket.on('speedtest', function () {

    var stream = speedtest({maxTime: 5000});

    stream.on('downloadspeedprogress', function (speed) {
        socket.emit('dlspeed', speed);
    });

    stream.on('uploadspeedprogress', function (speed) {
        socket.emit('ulspeed', speed);
    });

    stream.on('data', function (data) {
        history.push(data);
        socket.emit('results', history);

        fs.writeFile('logger/log.json', JSON.stringify(history), function (err) {
            if (err) {
                console.log(err);
            }
            console.log('It\'s saved!');

        });
        console.log('Logged it, babe!');
    });

    stream.on('error', function (err) {
        console.error(err);
    });

});


