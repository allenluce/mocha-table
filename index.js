/* global it describe */

const vsprintf = require('sprintf-js').vsprintf

var tables = []
var entries = []

// Build the test entry. Takes an it function, arguments from the
// entry, the title to interpolate, and the table test function
// itself.
function doEntry (itType, entryArgs, subtitle, test) {
  // Convert to regular array for manipulation.
  entryArgs = (entryArgs.length === 1 ? [entryArgs[0]] : Array.apply(null, entryArgs))
  var entryTitle = vsprintf(subtitle, entryArgs)
  if (entryArgs.length > test.length) {
    throw new Error('entry "' + entryTitle + '" has too many arguments')
  }
  var testFunction = function () {
    entryArgs.push.apply(entryArgs, arguments) // Hand any callback to the test function
    return test.apply(this, entryArgs)
  }
  // If the test function takes more args than entries define,
  // assume it's async and takes a callback
  Object.defineProperty(testFunction, 'length', { value: entryArgs.length - test.length })
  itType(entryTitle, testFunction)
}

function describeTableType (descFunc) {
  return function (title, functions) {
    // Wrap in a describe
    descFunc(title, function () {
      // Fill the arrays with tables and entries.
      functions()
      var tablesLen = tables.length
      var entriesLen = entries.length
      for (var i = 0; i < tablesLen; i++) { // For every table
        for (var j = 0; j < entriesLen; j++) { // do each entry.
          // If the entry is not an `it`, use that. Otherwise use the table runtype.
          var itFunc = (entries[j][0] === it) ? tables[i][0] : entries[j][0]
          doEntry(itFunc, entries[j][1], tables[i][1], tables[i][2])
        }
      }
      // Reset table and entries.
      tables = []
      entries = []
    })
  }
}

module.exports.describeTable = describeTableType(describe)
module.exports.describeTable.only = describeTableType(describe.only)
module.exports.xdescribeTable = module.exports.describeTable.skip = describeTableType(describe.skip)

function tableType (itFunc) {
  return function (title, test) {
    tables.push([itFunc, title, test])
  }
}

module.exports.tableIt = tableType(it)
module.exports.tableIt.only = tableType(it.only)
module.exports.xtableIt = module.exports.tableIt.skip = tableType(it.skip)

// Each entry ends up as an array of its args appended to the function
// that it should execute for its test (it, it.only, or it.skip)
function entryType (itFunc) {
  return function () {
    entries.push([itFunc, arguments])
  }
}

module.exports.entryIt = entryType(it)
module.exports.entryIt.only = entryType(it.only)
module.exports.xentryIt = module.exports.entryIt.skip = entryType(it.skip)
