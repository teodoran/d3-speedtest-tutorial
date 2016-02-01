var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    history = JSON.parse(fileSystem.readFileSync('logger/log.json')),
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

    var st = speedtest({ maxTime: 5000 });

    st.on('data', function (data) {
        var result = {
            download: data.speeds.download * 4,
            upload: data.speeds.upload * 4,
            ping: data.server.ping,
            date: Date.now()
        };

        history.push(result);

        fileSystem.writeFile('logger/log.json', JSON.stringify(history), function (err) {
            if (err) {
                console.log('something went wrong: ' + err);
            } else {
                console.log('speedtest finished');
            }
        });

        io.emit('broadcast_results', history);
    });

    st.on('error', function (err) {
        console.error(err);
    });
});
