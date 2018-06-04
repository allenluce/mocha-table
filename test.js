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
          'is 3 prime? (should be true)',
          'is 4 prime? (should be false)',
          'is 1847 prime? (should be true)',
          'is 1848 prime? (should be false)',
          'is 3 (asynchronously) prime? (should be true)',
          'is 4 (asynchronously) prime? (should be false)',
          'is 1847 (asynchronously) prime? (should be true)',
          'is 1848 (asynchronously) prime? (should be false)',
          'this object should be the right one',
          'this object should be the right one in async',
          'make sure the promise is accepted'
        ],
        fail: [
          'is 685242563 prime? (should be false)',
          'is 685242563 (asynchronously) prime? (should be false)',
          'should continue to time out',
          'make sure the promise is rejected',
          'make sure the promise is timed out'
        ],
        pending: [
          'is 15 prime? (should be false)',
          'is 21 prime? (should be false)',
          'is 15 (asynchronously) prime? (should be false)',
          'is 21 (asynchronously) prime? (should be false)'
        ]
      })
      done()
    })
  })
})
