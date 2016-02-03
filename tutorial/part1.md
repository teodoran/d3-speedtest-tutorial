Part 1 - Hello Client and Server
================================

In this part of the tutorial we'll make a simple web-page, displaying a short text, and build a node.js server for serving this page.


### Hello HTML

Navigate to the `/client` directory, and make a new file called index.html. Open the file in your favourite text editor, add the following text, and save.

```
<!DOCTYPE html>
<html>
<head>
  <title>Speedtest history</title>
</head>
<body>
  <h1>Hello HTML!</h1>
</body>
</html>
```

Open the file in your favourite web-browser. This is usually done by right-clicking the file and using an option like "Open with", or directly from the browser, through an option like File -> Open File. When the file is opened you should see something like this:

![client server](/img/hello_html.png)

Opening files in the browser directly from a directory might be ok for development pupouses, but for serving files on the internet and accessing shared resources like a database it's not a good solution. In order to do that we want a web server.


Building a static web server in node.js
---------------------------------------

We need a program that accepts a request from the browser, or other programs, and returns our index.html page, or other information we want to serve to the client.


### npm and Express

Wanting to building a server is quite common, so a lot of different frameworks for different languagues exist. In this tutorial we'll use [Express](http://expressjs.com/). It is common practice to use [npm](https://www.npmjs.com/) (node package manager) to handle installation of frameworks and libraries for node. npm is used from the command line, so open a new terminal and run the command `npm`.

```
> npm

Usage: npm <command>

where <command> is one of:
...

```

npm has a lot of commands, but the most common are `init`, `install`, `uninstall` and `start`. npm stores information about what packages has been installed, and other information about the node project in a file called `package.json`, and you have to run npm-commands in the same directory as the `package.json` file. This is typically located in the root directory of the node project. The command `npm init` can be used to create a new `package.json` file when starting a new project.

We have already created a `package.json` file for this project, but let's use `npm install` to install Express. Navigate to the `/d3-speedtest-tutorial` directory, and execute the following command.

```
> npm install express --save
express@4.13.4 node_modules/express
...
```

The option `--save` is used to tell npm that we want to save this to `package.json`. Open `package.json` and look for the "dependencies" section. We now have a line telling us that this project uses Express. In addition it gives us a default version number for Express. The actual code for Express is stored in the `node_modules` directory. If we want to install all dependecies for a given project on a new computer, we can use just `npm install`, and npm will install all dependencies declared in `package.json`. Because of this, the contents of the `node_modules` directory is very rarely checked into source control.

```
"dependencies": {
	...
    "express": "^4.13.4",
    ...
},
```


### A static web server

With Express installed, we can move on to making the server program. Create a file called `server.js` in the root project directory `/d3-speedtest-tutorial`. Open the file, add the following code and save the file.

```
var express = require('express'),
    app = express(),
    port = 3000;

app.use(express.static('client'));

app.listen(port, function () {
    console.log('Server running on http://localhost:' + port + '/');
});
```

The line `var express = require('express'),` tells node that we want to load the express package, and bind it to a variable called `express`. Then we use `app = express()` to create a new express server, and bind it to a variable called `app`. We then use `app.use(express.static('client'));` to tell express that we want to serve all files in the `/client` directory.

Finally, we use `app.listen(...)` to start the web server on the port we spesified, and print a message to the console when the server is up and running.

We can try our new server by running the following command, and opening a browser on the url [http://localhost:3000/](http://localhost:3000/).

```
> node server.js
Server running on http://localhost:3000/
```


### Adding a start command to package.json

We can use npm to keep track of the command needed to start our server. This is a usful convention, as it allows us and other people to start the server by just running the command `npm start`. To do this, open `package.json` and add `"start": "node server.js",` to the scripts-section.


```
...
"scripts": {
    "start": "node server.js",
    "tutorial": "node tutorial/tutorial.js"
},
...
```

Now you can use the command `npm start` to start the server.

```
> npm start
Server running on http://localhost:3000/
```
