# Mocha Table

<span class="badge-travisci">
  <a href="http://travis-ci.org/allenluce/mocha-table" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/allenluce/mocha-table/master.svg" alt="Travis CI Build Status" /></a>
</span>
<span class="badge-npmversion">
  <a href="https://npmjs.org/package/mocha-table" title="View this project on NPM"><img src="https://img.shields.io/npm/v/mocha-table.svg" alt="NPM version" /></a>
</span>

Table-driven tests for [Mocha](https://mochajs.org/). Lets you easily
specify data-driven tests with nice test names. Allows for easy focus
and skipping of individual test entries.

## In Node.js

[sprintf.js](https://github.com/alexei/sprintf.js) is used to
interpolate a template, resulting in nice test names for each table
entry.  The string template (the second argument to `describeTable`) is
fed the values that are given to the test function (the third
argument).

    const expect = require('chai').expect
    const {describeTable, tableIt, entryIt, xentryIt} = require('.')

    describeTable('Primality tests', function() {
      tableIt('is %d prime? (should be %t)', function (number, result) {
        expect(isPrime(number)).to.equal(result)
      })

      entryIt(3, true)
      entryIt(4, false)
      entryIt.skip(15, false)
      xentryIt(21, false)
      entryIt(1847, true)
      entryIt(1848, false)
    })

![You'll get nice results](assets/results.png)

## In the browser

Here's a simple HTML test harness:

    <html>
    <head>
        <meta charset="utf-8">
        <title>Mocha Table Tests</title>
        <link href="https://unpkg.com/mocha@5.2.0/mocha.css" rel="stylesheet" />
    </head>
    <body>
    <div id="mocha"></div>

    <script src="https://unpkg.com/chai@4.1.2/chai.js"></script>
    <script src="https://unpkg.com/mocha@5.2.0/mocha.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mocha-table@1.0.5"></script>

    <script>mocha.setup('bdd')</script>
    <script src="prime.js"></script>
    <script src="prime.test.js"></script>
    <script>
        mocha.checkLeaks();
        mocha.run();
    </script>
    </body>
    </html>

Given a `prime.js` like this:

    // My amazing O(1) primality tester.
    // Works for the majority of integers!!
    function isPrime (n) {
      return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
        (n === 3 || n / 3 !== Math.floor(n / 3))
    }

A table-driven test `prime.test.js` file looks like:

    const mochaTable = require('mocha-table')
    const describeTable = mochaTable.describeTable
    const tableIt = mochaTable.tableIt
    const entryIt = mochaTable.entryIt
    const xentryIt = mochaTable.xentryIt
    const expect = chai.expect

    describeTable('Primality tests', function() {
      tableIt('is %d prime? (should be %t)', function (number, result) {
        expect(isPrime(number)).to.equal(result)
      })

      entryIt(3, true)
      entryIt(4, false)
      entryIt.skip(15, false)
      xentryIt(21, false)
      entryIt(1847, true)
      entryIt(1848, false)
    })

![You'll get nice web results](assets/web.png)

The example above demonstrates the use of `xentryIt` and `entryIt.skip` to
mark some pesky tests that haven't been fixed yet. An entry can also be
focused programmatically using `.only` to mark it:

    ...
    entryIt.only(3, true),
    ...

## Building from source

Mocha Table uses [Browserify](http://browserify.org/) to create a
version that's easily usable on the web (via
[jsDelivr](jsdelivr.com)). Make sure any changes to `index.js` are
reflected in the built asset:

    npm run build
