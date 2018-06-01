/* global describe */
const expect = require('chai').expect
const {tabletests, xentry, entry} = require('.')

describe('table tests', function () {
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

// My amazing primality tester. Runs in O(1)!!
function isPrime (n) {
  return (n === 2 || n / 2 !== Math.floor(n / 2)) &&
    (n === 3 || n / 3 !== Math.floor(n / 3))
}
