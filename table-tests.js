/* global describe beforeEach */
const expect = require('chai').expect
const mochaTable = require('.')

const describeTable = mochaTable.describeTable
const tableIt = mochaTable.tableIt
const entryIt = mochaTable.entryIt
const xentryIt = mochaTable.xentryIt

describeTable('Primality tests', function () {
  tableIt('is %d prime? (should be %t)', function (number, result) {
    expect(isPrime(number)).to.equal(result)
  })
  entryIt(3, true)
  entryIt(4, false)
  entryIt.skip(15, false)
  xentryIt(21, false)
  entryIt(1847, true)
  entryIt(1848, false)
  entryIt(685242563, false) // This fails on purpose
})

describeTable('Multitable tests', function () {
  tableIt('testing 1 %d', function (number) {})
  entryIt(10)
  tableIt('testing 2 %d', function (number) {})
  entryIt(20)
})

describeTable('Skip tests', function () {
  tableIt.skip('testing 3 %d', function (number) {})
  entryIt(30)
  tableIt('testing 4 %d', function (number) {})
  entryIt(40)
})

describeTable('Asynchronous primality tests', function () {
  tableIt('is %d (asynchronously) prime? (should be %t)', function (number, result, done) {
    expect(isPrime(number)).to.equal(result)
    done()
  })
  entryIt(3, true)
  entryIt(4, false)
  entryIt.skip(15, false)
  xentryIt(21, false)
  entryIt(1847, true)
  entryIt(1848, false)
  entryIt(685242563, false) // This fails on purpose
})

describeTable('Timeouts', function () {
  tableIt('should continue to time out', function (done) {
    this.timeout(100)
  })
  entryIt()
})

describe('Handling this', function () {
  beforeEach(function () {
    this.me = 'right one'
  })
  describeTable('This handling', function () {
    tableIt('this object should be the right one', function () {
      expect(this.me).to.equal('right one')
    })
    entryIt()
  })
  describeTable('This handling', function () {
    tableIt('this object should be the right one in async', function (done) {
      expect(this.me).to.equal('right one')
      done()
    })
    entryIt()
  })
})

describeTable('Promises', function () {
  tableIt('make sure the promise is %s', function (which) {
    switch (which) {
      case 'accepted':
        return {
          then: function (success, reject) {
            success()
          }
        }
      case 'rejected':
        return {
          then: function (success, reject) {
            reject()
          }
        }
      case 'timed out':
        this.timeout(100)
        return {
          then: function (success, reject) {}
        }
    }
  })
  entryIt('accepted')
  entryIt('rejected')
  entryIt('timed out')
})

// My amazing O(1) primality tester.
// Works for the majority of primes!!
function isPrime (n) {
  return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
    (n === 3 || n / 3 !== Math.floor(n / 3))
}
