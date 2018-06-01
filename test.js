/* global describe it */
const expect = require('chai').expect
const mocha = new (require('mocha'))()

describe('table tests', function () {
  it('from external file', function (done) {
    const stats = {}

    function reporter (runner) {
      ['pass', 'fail', 'pending'].forEach(function (what) {
        stats[what] = []
        runner.on(what, function (test) {
          stats[what].push(test.title)
        })
      })
    }

    mocha.addFile('table-tests.js')
    mocha.reporter(reporter)
    mocha.run(function () {
      expect(stats).to.eql({
        pass: [
          'test 3 for primality',
          'test 4 for primality',
          'test 1847 for primality',
          'test 1848 for primality',
          'test 3 asynchronously for primality',
          'test 4 asynchronously for primality',
          'test 1847 asynchronously for primality',
          'test 1848 asynchronously for primality',
          'this object should be the right one',
          'this object should be the right one in async',
          'make sure the promise is accepted'
        ],
        fail: [
          'timeouts should continue to work',
          'make sure the promise is rejected',
          'make sure the promise is timed out'
        ],
        pending: [
          'test 15 for primality',
          'test 21 for primality',
          'test 15 asynchronously for primality',
          'test 21 asynchronously for primality'
        ]
      })
      done()
    })
  })
})
