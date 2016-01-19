var io = io();

io.on('dlspeed', function (data) {
    d3.select('#dlspeed').text(Math.round(data, 2));
});

io.on('ulspeed', function (data) {
    d3.select('#ulspeed').text(Math.round(data, 2));
});

io.on('history', function (data) {
    console.log(data);
});

io.on('data', function (data) {
    console.log(data);
});

function runSpeedTest () {
    event.preventDefault();
    var secret = d3.select("#secret").property('value');
    io.emit('speedtest', { secret: secret })
}

//var svg = d3.select('body').append('svg');
//var circle = svg.append('circle').attr('cx', '50%').attr('cy', '50%').attr('r', 50);
//
//circle.transition().attr('transform', 'rotate(35deg)');