var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    fileName = __dirname + '/log.json',
    history = JSON.parse(fileSystem.readFileSync(fileName)),
    io = require('socket.io-client')('http://localhost:3000/');

io.on('connect', function () {
    console.log("Logger successfully connected");
});

io.on('disconnect', function () {
    console.log("Logger disconnect");
});

io.on('get_speedtest_history', function () {
    io.emit('broadcast_results', history);
});

io.on('run_speedtest', function () {
    console.log('Starting speedtest...');

    var test = speedtest();

    test.on('data', function (data) {
        var result = {
            download: data.speeds.download,
            upload: data.speeds.upload,
            ping: data.server.ping,
            date: Date.now()
        };

        history.push(result);
        io.emit('broadcast_results', history);

        var jsonResult = JSON.stringify(history);
        fileSystem.writeFile(fileName, jsonResult, function (err) {
            if (err) {
                console.log('Something went wrong: ' + err);
            } else {
                console.log('Speedtest finished');
            }
        });
    });

    test.on('error', function (err) {
        console.error(err);
    });
});
