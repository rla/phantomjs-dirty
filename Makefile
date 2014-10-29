test:
	node_modules/.bin/phantomjs tests/test.js

check:
	node_modules/.bin/jshint index.js tests

.PHONY: test check
