var io = io();

io.on('nr-of-loggers', function (data) {
    d3.select('#loggers').text(data);
});

io.on('dlspeed', function (data) {
    d3.select('#dlspeed').text(Math.round(data, 2));
});

io.on('ulspeed', function (data) {
    d3.select('#ulspeed').text(Math.round(data, 2));
});

io.on('results', function (data) {
    console.log(data);
});

function runSpeedTest () {
    event.preventDefault();
    var secret = d3.select("#secret").property('value');
    io.emit('speedtest', { secret: secret })
}

// TODO: Create client interface.
