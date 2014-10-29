phantom.onError = function(msg) {

    console.log('Error: ' + msg);

    phantom.exit(1);
};

var fs = require('fs');
var dirty = require('../');

if (fs.exists('test.dirty')) {

    fs.remove('test.dirty');
}

var db = dirty.open('test.dirty');

db.set('a-key', { a: 1 });

db.close();

db = dirty.open('test.dirty');

if (db.get('a-key').a !== 1) {

    throw new Error('get: wrong/missing key value.');
}

var found = false;

db.forEach(function(key, val) {

    if (key !== 'a-key' && val.a !== 1) {

        throw new Error('forEach: wrong/missing key value.');
    }

    found = true;
});

if (!found) {

    throw new Error('forEach: no entries found.');
}

phantom.exit(0);
