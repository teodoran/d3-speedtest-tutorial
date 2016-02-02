var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));
app.use(express.static('node_modules/socket.io-client/'));

io.on('connect', function (socket) {
    console.log('a user connected..');

    io.emit('get_speedtest_history');

    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });

    socket.on('broadcast_results', function (data) {
        io.emit('display_results', data);
    });
});

var runLoggers = function () {
    setTimeout(function () {
        console.log('Running automated speedtest')
        io.emit('run_speedtest');
        runLoggers();
    }, 10000);
};

runLoggers();

var server = http.listen(port, function () {
    console.log('Server running on http://localhost:' + port + '/');
});
