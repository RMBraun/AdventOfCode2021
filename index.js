const { get } = require('@rybr/lenses')

Array.prototype.get = function () {
  return get(this, ...[...arguments].reverse())
}

const { run } = require('./Day 13/q2')

run()
