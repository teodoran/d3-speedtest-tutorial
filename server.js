var express = require('express'),
    dummyData = require('./dummy-data.json'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));

app.get('/history', function (req, res) {
  res.json({dummyData});
});

var server = app.listen(port, function () {
  console.log('d3-speedtest-tutorial listening on port %s', port);
});