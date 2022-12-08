const { get } = require('@rybr/lenses')

Array.prototype.get = function () {
  return get(this, ...[...arguments].reverse())
}

const { run } = require('./2022/Day 7/q2')

run()
