/* global describe beforeEach */
const expect = require('chai').expect
const mochaTable = require('.')

const describeTable = mochaTable.describeTable
const xentry = mochaTable.xentry
const entry = mochaTable.entry

describeTable('Primality tests',
              'is %d prime? (should be %t)',
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

// Make this work by checking the # of entries of each entry
// Error if they do not all have the same # of entries.
// If they do and the func takes one more, supply a callback.
describeTable('Asynchronous primality tests',
              'is %d (asynchronously) prime? (should be %t)',
              function (number, result, done) {
                expect(isPrime(number)).to.equal(result)
                done()
              },
              entry(3, true),
              entry(4, false),
              entry.skip(15, false),
              xentry(21, false),
              entry(1847, true),
              entry(1848, false)
             )

describeTable('Timeouts',
              'should continue to time out',
              function (done) {
                this.timeout(100)
              },
              entry()
             )

describe('Handling this', function () {
  beforeEach(function () {
    this.me = 'right one'
  })
  describeTable('This handling',
                'this object should be the right one',
                function () {
                  expect(this.me).to.equal('right one')
                },
                entry()
               )
  describeTable('This handling',
                'this object should be the right one in async',
                function (done) {
                  expect(this.me).to.equal('right one')
                  done()
                },
                entry()
               )
})

describeTable('Promises',
              'make sure the promise is %s',
              function (which) {
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
              },
              entry('accepted'),
              entry('rejected'),
              entry('timed out')
             )

// My amazing O(1) primality tester.
// Works for the majority of primes!!
function isPrime (n) {
  return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
    (n === 3 || n / 3 !== Math.floor(n / 3))
}
