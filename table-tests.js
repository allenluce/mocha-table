/* global describe beforeEach */
const {tabletests, xentry, entry} = require('.')
const expect = require('chai').expect

describe('table tests', function () {
  this.timeout(100)
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

  // Make this work by checking the # of entries of each entry
  // Error if they do not all have the same # of entries.
  // If they do and the func takes one more, supply a callback.
  tabletests('test %d asynchronously for primality',
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

  tabletests('timeouts should continue to work',
             function (done) {},
             entry()
            )

  describe('handling this', function () {
    beforeEach(function () {
      this.me = 'right one'
    })
    tabletests('this object should be the right one',
               function () {
                 expect(this.me).to.equal('right one')
               },
               entry()
              )
    tabletests('this object should be the right one in async',
               function (done) {
                 expect(this.me).to.equal('right one')
                 done()
               },
               entry()
              )
  })

  describe('promises', function () {
    tabletests('make sure the promise is %s',
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
                     return {
                       then: function (success, reject) {}
                     }
                 }
               },
               entry('accepted'),
               entry('rejected'),
               entry('timed out')
              )
  })
})

// My amazing primality tester. Runs in O(1)!!
function isPrime (n) {
  return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
    (n === 3 || n / 3 !== Math.floor(n / 3))
}
