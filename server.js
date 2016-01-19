var port = process.env.PORT || 3000,
    secret = process.env.SECRET || 'NotSecret',
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    authenticated = io.of('/authenticated');


//db_username = process.env.DB_USERNAME || null,
//db_password = process.env.DB_PASSWORD || null,
//if (db_username && dn_password) {
//    var mongoose = require('mongoose');
//    mongoose.connect('mongodb://' + db_username + ':' + db_password + '@ds035985.mongolab.com:35985/heroku_gvg12xd2');
//}

// love from teo
// curl -d '{"MyKey":"My Value"}' -H "Content-Type: application/json" -H "secret: NotSecret" -i http://127.0.0.1:3000/log

// client instantiation
app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));

authenticated.use(function (socket, next) {
    var handshakeData = socket.request;
    if (handshakeData._query['secret'] === secret) {
        next();
    }
});

authenticated.on('connection', function (socket) {

    socket.on('dlspeed', function (data) {
        io.emit('dlspeed', data);
    });

    socket.on('ulspeed', function (data) {
        io.emit('ulspeed', data);
    });

    socket.on('results', function (data) {
        io.emit('results', data);
    });

});

io.on('connection', function (socket) {

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


app.get('/history', function (req, res) {
    res.json(data);
});

var server = http.listen(port, function () {
    console.log('d3-speedtest-tutorial listening on port %s', port);
});
