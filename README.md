# Phantomjs-dirty

A [dirty](https://github.com/felixge/node-dirty) key-value database clone for PhantomJS and
its synchronous CommonJS Filesystem/A IO. Database files are fully compatible between implementations.

## Warning

Multi-process write usage of the same database file will corrupt it. There are is no file locking
support in CommonJS Filesystem/A.

## Running tests

For running tests, development dependencies must be installed first.

    npm install
    make test

## Example

    var dirty = require('./node_modules/phantomjs-dirty');

    var db = dirty.open('test.dirty');

    db.set('a-key', { a: 1 });

    console.log(db.get('a-key'));

    db.forEach(function(key, val) {

        console.log(key + ': ' + val);
    });

## License

The MIT License.
