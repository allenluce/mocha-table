/* global it */

const vsprintf = require('sprintf-js').vsprintf

module.exports.tabletests = function () {
  const title = arguments[0]
  const test = arguments[1]
  for (let i = 2; i < arguments.length; i++) {
    const entryArgs = arguments[i]
    const type = entryArgs.shift()
    const entryTitle = vsprintf(title, entryArgs)
    const testFn = function () {
      test.apply(this, entryArgs)
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

