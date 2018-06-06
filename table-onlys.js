/* global describe beforeEach */
const expect = require('chai').expect
const mochaTable = require('.')

const describeTable = mochaTable.describeTable
const tableIt = mochaTable.tableIt
const entryIt = mochaTable.entryIt
const xentryIt = mochaTable.xentryIt

describeTable.only('First describe', function () {
  tableIt.only('first table', function (number) {})
  tableIt('second table', function (number) {})
  entryIt.only(1)
  entryIt(2)
  entryIt.skip(3)
  xentryIt(4)
})
