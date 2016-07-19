"use strict";
var page = require('webpage').create();
var system = require('system');


///@note Comment this in for all the logging.
//var logging = require('./logging');
//logging.setupLogging(page);

page.onConsoleMessage = function(msg) {
    console.log('console> ' + msg);
};

page.onCallback = function(data) {
    if (data.screenShotname) {
        page.render(data.screenShotname + '.jpeg', { format: 'jpeg', quality: '50' });
    }
    // Now that we've finished the with our screenshot exit phantom.
    phantom.exit(0);
};

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36';
page.viewportSize = {
    width: 800,
    height: 800
};

function letesDoIt() {
    var theUrl = "https://www.google.com/";
    var user = page.open(theUrl, function(status) {
        if (status === "success") {
            page.includeJs('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
                page.injectJs('./build/main.js');
                console.log('Opened page...');
                page.evaluate(function() {
                    setTimeout(function() {
                        // Start on picture 9 to get past the "most popular"
                        Main.helloWorld();
                    }, 500);
                });
            });
        } else {
            phantom.exit(1);
        }
    });
}

letesDoIt();
