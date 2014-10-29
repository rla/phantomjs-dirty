var fs = require('fs');

// Opens the given file as a database.

exports.open = function(filename) {

    var entries = {};

    if (fs.exists(filename)) {

        var read = fs.open(filename, { mode: 'r', charset: 'utf-8' });

        while (!read.atEnd()) {

            var line = read.readLine().trim();

            if (line !== '') {

                var obj = JSON.parse(line);

                entries[obj.key] = obj.val;
            }
        }

        read.close();
    }

    var write = fs.open(filename, { mode: 'a', charset: 'utf-8' });

    return {

        get: function(key) {

            return entries[key];
        },

        set: function(key, val) {

            entries[key] = val;

            var data = { key: key, val: val };

            var line = JSON.stringify(data).replace(/\r?\n/g, '');

            write.writeLine(line);
            write.flush();
        },

        forEach: function(fn) {

            Object.keys(entries).forEach(function(key) {

                fn(key, entries[key]);
            });
        },

        close: function() {

            write.close();
        }
    };
};
