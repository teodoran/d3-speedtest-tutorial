var speedTest = require('speedtest-net');

test = speedTest({maxTime: 5000});

test.on('data', function (data) {
    console.dir(data);
});

test.on('error', function (err) {
    console.error(err);
});