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

The test names use https://github.com/alexei/sprintf.js for
interpolation. The values that are given to each test are fed to
sprintf.js for interpolation in the test title.

    const {tabletests, entry} = require('mocha-table')

    tabletests('test %d for primality (should be %t)',
      function (number, result) {
        expect(isPrime(number)).to.equal(result)
      },
      entry(2, true),
      entry(3, true),
      entry(4, false),
      entry(1847, true),
      entry(1848, false)
    )

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
    <script src="https://cdn.jsdelivr.net/npm/mocha-table@1.0.2"></script>
    
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
    // Works for the majority of primes!!
    function isPrime (n) {
      return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
        (n === 3 || n / 3 !== Math.floor(n / 3))
    }

A table-driven test `prime.test.js` file looks like:

    const tableTests = require('mocha-table')
    const tabletests = tableTests.tabletests
    const xentry = tableTests.xentry
    const entry = tableTests.entry
    
    const expect = chai.expect
    describe('prime tester', function () {
      tabletests('test %d for primality',
                 function (number, result) {
                   expect(isPrime(number)).to.equal(result)
                 },
                 entry(3, true),
                 entry(4, false),
                 entry.skip(15, false),
                 xentry(21, false),
                 entry(1847, true),
                 entry(1848, false)
                )
    })

This snippet demonstrates the use of `xentry` and `entry.skip` to mark
some pesky tests that haven't been fixed yet. An entry can be focused
programmatically using `.only` to mark it:

    ...
    entry.only(3, true),
    ...
