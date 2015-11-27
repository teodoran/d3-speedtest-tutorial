var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),

    port = process.env.PORT || 3000,
    secret = process.env.SECRET || 'NotSecret',
    data = require('./dummy-data.json');

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));

app.use(bodyParser.json());

// curl -d '{"MyKey":"My Value"}' -H "Content-Type: application/json" -H "secret: NotSecret" -i http://127.0.0.1:3000/log
app.post('/log', function(request, response){
  if (request.headers['secret'] === secret) {
    console.log(request.body);
    response.status(200).end();
  } else {
    console.log('Unauthorized access attempt at /log');
    response.status(401).end();
  }
});

app.get('/history', function (req, res) {
  res.json(data);
});

var server = app.listen(port, function () {
  console.log('d3-speedtest-tutorial listening on port %s', port);
});