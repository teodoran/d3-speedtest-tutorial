d3-speedtest-tutorial
=====================
A tutorial where you'll learn to make a network-speed monitoring tool and data store using Node.js and Express and online viewer using D3.js

Setup notes
-----------

	git clone https://github.com/teodoran/d3-speedtest-tutorial.git
	cd /d3-speedtest-tutorial
	npm init

### Heroku setup

	wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
	heroku login
	heroku git:remote -a d3-speedtest-tutorial
	git push heroku master


Local startup
-------------

Tutorial:

    cd /d3-speedtest-tutorial
    npm run-script tutorial

Server:

    cd /d3-speedtest-tutorial
    npm start

Logger:

    cd /d3-speedtest-tutorial
    npm run-script log