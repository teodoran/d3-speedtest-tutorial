/*
 * https://github.com/natesilva/node-docserver
 * https://github.com/sindresorhus/github-markdown-css
 */

var express = require('express'),
	docserver = require('docserver');
	app = express(),
	port = 5000;

app.use(docserver({
	dir: __dirname,
	url: '/',
	watch: true
}));

app.listen(port);
console.log('Tutorial running on http://localhost:' + port + '/');