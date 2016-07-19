var count = 0;

function onConsoleMessage(msg) {
    console.log('console> ' + msg);
};

function onResourceRequested(request) {
    system.stderr.writeLine('= onResourceRequested()');
    system.stderr.writeLine('  request: ' + JSON.stringify(request, undefined, 4));
};

function onResourceReceived(response) {
    system.stderr.writeLine('= onResourceReceived()');
    system.stderr.writeLine('  id: ' + response.id + ', stage: "' + response.stage + '", response: ' + JSON.stringify(response));
};

function onLoadStarted() {
    system.stderr.writeLine('= onLoadStarted()');
    var currentUrl = page.evaluate(function() {
        return window.location.href;
    });
    system.stderr.writeLine('  leaving url: ' + currentUrl);
};

function onLoadFinished(status) {
    system.stderr.writeLine('= onLoadFinished()');
    system.stderr.writeLine('  status: ' + status);
};

function onNavigationRequested(url, type, willNavigate, main) {
    system.stderr.writeLine('= onNavigationRequested');
    system.stderr.writeLine('  destination_url: ' + url);
    system.stderr.writeLine('  type (cause): ' + type);
    system.stderr.writeLine('  will navigate: ' + willNavigate);
    system.stderr.writeLine('  from page\'s main frame: ' + main);
};

function onResourceError(resourceError) {
    ++count;
    page.render('error' + count + '.jpeg', { format: 'jpeg', quality: '50' });
    if (!/facebook/.test(resourceError.url)) {
        system.stderr.writeLine('= onResourceError()');
        system.stderr.writeLine('  - unable to load url: "' + resourceError.url + '"');
        system.stderr.writeLine('  - error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString);
    }
    if (count > 5) {
        phantom.exit(-1);
    }
};

function onError(msg, trace) {
    system.stderr.writeLine('= onError()');
    var msgStack = ['  ERROR: ' + msg];
    if (trace) {
        msgStack.push('  TRACE:');
        trace.forEach(function(t) {
            msgStack.push('    -> ' + t.file + ': ' + t.line +
                (t.function ? ' (in function "' + t.function+'")' : ''));
        });
    }
    system.stderr.writeLine(msgStack.join('\n'));
    phantom.exit(1);
};

module.exports = {
    setupLogging: function(page) {
        page.onResourceRequested = onResourceRequested;
        page.onError = onError;
        page.onResourceError = onResourceError;
        page.onLoadFinished = onLoadFinished;
        page.onConsoleMessage = onConsoleMessage;
        page.onResourceRequested = onResourceRequested;
        page.onResourceReceived = onResourceReceived;
        page.onLoadStarted = onLoadStarted;
        page.onNavigationRequested = onNavigationRequested;
    }
}
