var express = require('express'),
		app = express(),
		port = 3000;

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));

var server = app.listen(port, function () {
  console.log('d3-speedtest-tutorial listening on port %s', port);
});