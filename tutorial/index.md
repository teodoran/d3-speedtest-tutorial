An overview of the tutorial
===========================

_Envisioned as 1 + 4 parts, each lasting about 30 minutes_

[Introduction](/intro)
----------------

Introduction to the workshop. Installation of software and setup of services.

Topics introduced:

* Architectural overview of the application and services.
* Basic use of git
* Basic use of the command line
* Basic use of github
* Forking a repostiory
* Cloning a repository
* Basic use of node.js


[Assignment 0](/ass_0)
----------------

Starting point:
> $ git checkout ass_0

1. Build your own Hello World HTML5 WebApp
2. Create your webserver with Express
3. Deploy it to Heroku

End point:
> $ git push heroku ass_0:master

Topics introduced:

* Brief recap of html, css and JS.
* Basic JS, iterators, conditionals and functions as first class objects
* Working with the command line and node.
* NPM's dependency management with 'package.json'
* NPM automation with run-script
* Basic use of the Express Framework
* Heroku deployment

[Assignment 1](/ass_1)
----------------

Starting point:
> $ git checkout ass_1

1. Build your own speed testing logger
2. Output the results to the console
3. Store the results in “logger/history.json”

End point:
> $ node logger/logger.js

Topics introduced:

* async callback functions
* JSON parsing and serialization
* File system handeling


[Assignment 2](/ass_2)
----------------

> $ git checkout ass_2

1. Wire the applications with socket.io
2. Log results in the console

Topics introduced:
* socket.io

End point
> Verify the connection between the applications

[Assignment 3](/ass_3)
----------------

Starting point:
> $ git checkout ass_3

1. Enable the web-server to control when the loggers run a speedtest

End point:
> Initiate a speed test through the server

Topics introduced:

* socket.io program flow

[Assignment 4](/ass_4)
----------------

Starting point
> $ git checkout ass_4

1. Secure the communication between the applications.
2. Allow the web application to securely initate a speedtest.

End point
> $ git push heroku ass_4:master


Topics introduced:

* Basic authentication


[Assignment 5](/ass_5)
----------------

Starting point
> $ git checkout ass_5


1. Visualise the data sent by the logger.

End point
> $ git push heroku ass_5:master
