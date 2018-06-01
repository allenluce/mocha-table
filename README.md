# Mocha Table

Table-driven tests for Mocha. Lets you easily specify data-driven
tests with nice test names. Allows for easy focus and skipping of
tests.

    const {tabletests, entry} = require('mocha-table')

    tabletests('primality tests',
      function (number, result) {
        expect(isPrime(number)).to.equal(result)
      },
      entry(2, true),
      entry(3, true),
      entry(4, false),
      entry(1847, true),
      entry(1848, false)
    )

The test names use https://github.com/alexei/sprintf.js for
interpolation.  The values that are given to each test are fed to
sprintf.js for interpolation in the test title.

    const {tabletests, entry} = require('mocha-table')

    tabletests('test %d for primality,
      function (number, result) {
        expect(isPrime(number)).to.equal(result)
      },
      entry(2, true),
      entry(3, true),
      entry(4, false),
      entry(1847, true),
      entry(1848, false)
    )
