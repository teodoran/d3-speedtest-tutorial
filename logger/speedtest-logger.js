// CONFIG="prod-config" node speedtest-logger.js
var configFile = process.env.CONFIG || "dev-config",
    config = require('./' + configFile),

    http = require('http'),
    post_data = JSON.stringify({"test": "key"}),

    options = {
      host: config.host,
      port: config.port,
      path: '/log',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(post_data),
        'secret': config.secret
      }
    };

var req = http.request(options, function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
});

req.write(post_data)
req.end();