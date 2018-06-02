/* global it */

const vsprintf = require('sprintf-js').vsprintf

module.exports.tabletests = function () {
  const title = arguments[0]
  const test = arguments[1]
  for (var i = 2; i < arguments.length; i++) {
    function loop(args) {
      var entryArgs = (args.length === 1 ? [args[0]] : Array.apply(null, args))
      var type = entryArgs.shift()
      var entryTitle = vsprintf(title, entryArgs)
      var testFn
      if (test.length === entryArgs.length) { // Sync function
        testFn = function () {
          return test.apply(this, entryArgs)
        }
      } else if (test.length === entryArgs.length + 1) { // Async function
        testFn = function (done) {
          entryArgs.push(done)
          return test.apply(this, entryArgs)
        }
      } else { // Error
        throw new Error('entry "' + entryTitle + '" has incorrect number of arguments')
      }
      switch (type) {
      case 0:
        it(entryTitle, testFn)
        break
      case 1:
        it.only(entryTitle, testFn)
        break
      case 2:
        it.skip(entryTitle, testFn)
        break
      }
    }
    loop(arguments[i])
  }
}

function runType (type) {
  return function () {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))
    args.unshift(type)
    return args
  }
}

module.exports.entry = runType(0)
module.exports.entry.only = runType(1)
module.exports.xentry = module.exports.entry.skip = runType(2)

