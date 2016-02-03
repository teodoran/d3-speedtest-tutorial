Assignment 1 - Build a logger program
==============================

In this part of the turorial we'll make a speedtest logger program. The logger should be able to run a speedtest using the [speedtest-net package](https://github.com/ddsol/speedtest.net).

The speedtest-net package is already declared in the package.json, and was installed when we ran the command `npm install` earlier, so we can start to use directly.


### A simple Hello Logger program

Make a new file under the `/logger` directory called `logger.js`. Open the file in your favourite editor and enter and save the following:

```
console.log('Hello Logger!');
```

Navigate to the `/logger` directory and test your program with the command:

```
> node logger.js
Hello Logger!
```


Testing Speed
-------------

Now that we know that the logger program is up and running, let's clear out the logger.js file, and start by requireing the speedtest-net package, and start a new test.

```
var speedtest = require('speedtest-net');
var test = speedtest();
```

Calling `speedtest()` will return a new speedtest object, and run the test automatically. When the test runs, it will fire predetermined events at spesific intervals in the test. Many [events are available](https://github.com/ddsol/speedtest.net#events), but for our purpose we'll use just 'data' and 'error'. We can "hook on" to these events by using the `test.on(...)` method. Let's expand our program with the following code:

```
test.on('data', function (data) {
    console.log(data);
});

test.on('error', function (err) {
    console.error(err);
});

console.log('This is printed first!');
```


### A bit about anonymous function

The `.on(...)` method takes two parameters, the name of the event we want to "hook on" to, and an anonymous function (a function without a name), specifying what should happen when the event is fired. We can do this, since JavaScript treats functions as ordinaty variables, if we wanted, we could rewrite out code as the following:

```
// Just an example, and not part of the final code
var dataEventName = 'data';
var dataFunction = function (data) {
    console.log(data);
};
test.on(dataEventName, dataFunction);
```

Now the `dataFunction` can be used as any other function:

```
// Just an example, and not part of the final code
dataFunction('Hello data!'); // This prints Hello data!
```


### The anonymous callback function

Back to the logger program. Try and run it with `node logger.js` (you have to wait a bit, since the speedtest takes some time).

```
> node logger.js
This is printed first!
{ speeds: 
   { download: 30.111,
     upload: 4.31,
     originalDownload: 3316200,
     originalUpload: 473027 },
  client: 
   { lat: NaN,
     lon: NaN,
     isprating: NaN,
     rating: NaN,
     ispdlavg: NaN,
     ispulavg: NaN },
  server: 
   { host: 'speedo.eltele.no',
     lat: 69.9403,
     lon: 23.3106,
     location: 'Alta',
     country: 'Norway',
     cc: 'NO',
     sponsor: 'Eltele AS',
     distance: NaN,
     distanceMi: NaN,
     ping: 79.9,
     id: '3433' } }
```

"This is printed first!" is printed first, even though it was last in the logger.js file. This happens because the speedtest-net package waits until the speedtest is over, before it executes our anonymous function. The rest of the program ignores this, end continues to execute the `console.log('This is printed first!');` statement. Calling the `test.on('data', function (data) { ... });` method, simply tells the program, "Do the speedtest, and when you have some data, call this function I gave you".

An anonymous functions used in this way, is ofthen called an anonymous (it has no name) callback (it will get called somethime in the future when the computation is done) function.


Writing the results to file
---------------------------

Finally, we want to store the results of our different speedtests in a file, so we can compare it over time. To store this data, we'll use JSON (JavaScript Object Notation).


### A bit about JavaScript objects and JSON

In JavaScript we can create and modify objects by using the following syntax ([other syntaxes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) exists, but we're not concerned with them now):

```
var anObject = {
    name: 'Say my name',
    someNumber: 42,
    getRandomNumber: function () {
        // Choosen by fair dice roll.
        return 4;
    }
}

console.log(anObject.name); // This prints Say my name
console.log(anObject.someNumber); // This prints 42
console.log(anObject.getRandomNumber()); // This prints 4 (note the extra ())

anObject.someNumber = 23;
console.log(anObject.someNumber); // This now prints 23
```

Objects can be transformed into a string of characters using the JSON format. JSON cannot store functions directly, but objects containing just data is pretty simple to convert from JavaScript to strings and back to JavaScript.

```
var anotherObject = {
    name: 'Say my name',
    someNumber: 42
}

var json = JSON.serialize(anotherObject);
console.log(json); // This prints {"name":"Say my name","someNumber":42}

// Calling json.name doesn't work.

var anObjectFromJson = JSON.parse(json);
console.log(anObjectFromJson.name); // This works

```


### Converting the result to JSON and writing it to file

Let's return to the logger.js file, it should look loke this by now:

```
var speedtest = require('speedtest-net');
var test = speedtest();

test.on('data', function (data) {
    console.log(data);
});

test.on('error', function (err) {
    console.error(err);
});

console.log('This is printed first!');
```

We'll start by adding a list to hold our speedtest history, and then we'll make an object containing just the information we are interested in, push this to the history-list, and then parse the history-list to JSON.

```
var speedtest = require('speedtest-net');
var test = speedtest();
var history = [];

test.on('data', function (data) {
    var result = {
        download: data.speeds.download,
        upload: data.speeds.upload,
        ping: data.server.ping,
        date: Date.now()
    };

    history.push(result);
    var jsonResult = JSON.stringify(history);
    console.log(jsonResult);
});

test.on('error', function (err) {
    console.error(err);
});
```

Now we're ready to write the history-list to a file. First make another file in the `/logger` directory called `log.json`. Open the file and add `[]` (an empty array) and save the file.

First we'll require the file system object from node.js, and make a variable containing the filename and directory path, using the node.js constant `__dirname` to enshure that our path is relative to the location of `logger.js`.

```
...
var fileSystem = require('fs');
var test = speedtest();
var fileName = __dirname + '/log.json';
...
```

Then we'll read the content of the file into the history-list when the program starts, instead of using a empthy list every time.

```
...
var fileName = __dirname + '/log.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
...
```

Finally we'll write the updated results to the file when the speedtest is finished. Note how we again use an anonymous callback function to inform us that the file-writing operation is done, and if there were any errors.

```
...
test.on('data', function (data) {
    
    ...

    var jsonResult = JSON.stringify(history);
    fileSystem.writeFile(fileName, jsonResult, function (err) {
        if (err) {
            console.log('Something went wrong: ' + err);
        } else {
            console.log('Speedtest finished');
        }
    });
});
...
```

After joining all the variable declarations and printing startup-information, the finished file should look something like this:

```
var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    test = speedtest(),
    fileName = __dirname + '/log.json',
    history = JSON.parse(fileSystem.readFileSync(fileName));

console.log('Starting speedtest...');

test.on('data', function (data) {
    var result = {
        download: data.speeds.download,
        upload: data.speeds.upload,
        ping: data.server.ping,
        date: Date.now()
    };

    history.push(result);

    var jsonResult = JSON.stringify(history);
    fileSystem.writeFile(fileName, jsonResult, function (err) {
        if (err) {
            console.log('Something went wrong: ' + err);
        } else {
            console.log('Speedtest finished');
        }
    });
});

test.on('error', function (err) {
    console.error(err);
});
```

Now you can test the finished logger. Run it a couple of times, and verify that it updates log.json.
