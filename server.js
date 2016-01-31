var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    authenticated = io.of('/authenticated'),

    port = process.env.PORT || 3000,
    secret = process.env.SECRET || 'NotSecret',
    loggers = 0;

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));
app.use(express.static('node_modules/socket.io-client/'));

authenticated.use(function (socket, next) {
    var handshakeData = socket.request;
    if (handshakeData._query['secret'] === secret) {
        next();
    }
});

authenticated.on('connection', function (socket) {
    loggers +=1 ;
    io.emit('nr-of-loggers', loggers);

    socket.on('disconnect', function () {
        loggers -= 1;
        io.emit('nr-of-loggers', loggers);
    });

    socket.on('dlspeed', function (data) {
        io.emit('dlspeed', data);
    });

    socket.on('ulspeed', function (data) {
        io.emit('ulspeed', data);
    });

    socket.on('results', function (data) {
        io.emit('results', data);
    });

    socket.on('history', function (data) {
        io.emit('history', data);
    });
});

io.on('connection', function (socket) {
    // Get history on connection
    authenticated.emit('history');

    socket.on('speedtest', function (data) {
        if (data.secret === secret) {
            authenticated.emit('speedtest');
        } else {
            console.log("You are not!");
        }
    });

    socket.on('disconnect', function (data) {
        console.log('a user disconnected');
    });
});

var runLoggers = function () {
    setTimeout(function () {
        console.log('Running automated speedtest')
        authenticated.emit('speedtest');
        runLoggers();
    }, 60000);
};

runLoggers();

var server = http.listen(port, function () {
    console.log('server listening on port %s', port);
});
