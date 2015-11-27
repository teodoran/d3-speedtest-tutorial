// CONFIG="prod-config" node speedtest-logger.js
var speedTest = require('speedtest-net'),
    configFile = process.env.CONFIG || "dev-config",
    config = require('./' + configFile),

    http = require('http'),


    options = {
      host: config.host,
      port: config.port,
      path: '/log',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': config.secret
      }
    },
    test = speedTest({maxTime: 5000});

var req = http.request(options, function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
});

test.on('data', function (data) {
    var result = JSON.stringify(data);
    options.headers["Content-Length"] = Buffer.byteLength(result);
    req.write(result);
    req.end();
});

test.on('error', function (err) {
    console.error(err);
});
