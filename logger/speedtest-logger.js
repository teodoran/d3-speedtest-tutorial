var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    history = JSON.parse(fileSystem.readFileSync('logger/log.json')),
    socket = require('socket.io-client')('http://localhost:3000/authenticated', { query: 'secret=NotSecret' });

socket.on('connect', function () {
    console.log("Logger successfully connected");
});

socket.on('disconnect', function () {
    console.log("Logger disconnect");
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

        fileSystem.writeFile('logger/log.json', JSON.stringify(history), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    stream.on('error', function (err) {
        console.error(err);
    });
});