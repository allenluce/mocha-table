/* global it describe */

const vsprintf = require('sprintf-js').vsprintf

function doEntry (args, subtitle, test) {
  var entryArgs = (args.length === 1 ? [args[0]] : Array.apply(null, args))
  var itType = entryArgs.shift()
  var entryTitle = vsprintf(subtitle, entryArgs)
  if (test.length === entryArgs.length) { // Sync function
    itType(entryTitle, function () {
      return test.apply(this, entryArgs)
    })
  } else if (test.length === entryArgs.length + 1) { // Async function
    itType(entryTitle, function (done) {
      entryArgs.push(done)
      return test.apply(this, entryArgs)
    })
  } else { // Error
    throw new Error('entry "' + entryTitle + '" has incorrect number of arguments')
  }
}

function runLoop (masterArgs) {
  var subtitle = masterArgs[1]
  var test = masterArgs[2]
  for (var i = 3; i < masterArgs.length; i++) {
    doEntry(masterArgs[i], subtitle, test)
  }
}

module.exports.describeTable = function () {
  var args = arguments
  return describe(args[0], function () {
    runLoop(args)
  })
}

module.exports.describeTable.only = function () {
  var args = arguments
  return describe.only(args[0], function () {
    runLoop(args)
  })
}

module.exports.describeTable.xdescribeTable = module.exports.describeTable.skip = function () {
  var args = arguments
  return describe.skip(args[0], function () {
    runLoop(args)
  })
}

function entryType (itType) {
  return function () {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))
    args.unshift(itType)
    return args
  }
}

module.exports.entry = entryType(it)
module.exports.entry.only = entryType(it.only)
module.exports.xentry = module.exports.entry.skip = entryType(it.skip)
