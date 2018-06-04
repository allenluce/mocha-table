/* global it describe */

const vsprintf = require('sprintf-js').vsprintf

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

// Main describeTable function, takes a describe function to run
function describeType (descType) {
  return function (title, subtitle, test) {
    var entries = arguments
    descType(title, function () {
      for (var i = 3; i < entries.length; i++) {
        doEntry(entries[i][0], entries[i][1], subtitle, test)
      }
    })
  }
}

module.exports.describeTable = describeType(describe)
module.exports.describeTable.only = describeType(describe.only)
module.exports.describeTable.xdescribeTable = module.exports.describeTable.skip = describeType(describe.skip)

// Each entry ends up as an array of its args appended to the function
// that it should execute for its test (it, it.only, or it.skip)
function entryType (itType) {
  return function () {
    return [itType, arguments]
  }
}

module.exports.entry = entryType(it)
module.exports.entry.only = entryType(it.only)
module.exports.xentry = module.exports.entry.skip = entryType(it.skip)
