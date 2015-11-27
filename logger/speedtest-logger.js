// CONFIG="prod-config" node speedtest-logger.js
var speedtest = require('speedtest-net'),
    configFile = process.env.CONFIG || "prod-config",
    config = require('./' + configFile),

    https = require('https'),

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
    stream = speedtest({maxTime: 5000});

var req = https.request(options, function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
});

stream.on('downloadspeedprogress',function(speed){
    console.log('Download speed:',speed,'MB/s');
});

stream.on('uploadspeedprogress',function(speed){
    console.log('Upload speed:',speed,'MB/s');
});

stream.on('data', function (data) {
    var result = JSON.stringify(data);
    options.headers["Content-Length"] = Buffer.byteLength(result);
    req.write(result);
    req.end();
});

stream.on('error', function (err) {
    console.error(err);
});
