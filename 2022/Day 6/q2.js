const { getRawInput, log } = require('../../utils')
const { get, split, map, reduce, matchAll, values, join, findIndex } = require('@rybr/lenses')

module.exports = {
  run: () => {
    const prev = []
    get(
      getRawInput(`./2022/Day 6/input.txt`),
      split(''),
      findIndex((char, i) => {
        prev.push(char)

        if (i < 13) {
          return false
        }

        if (i > 13) {
          prev.shift()
        }

        return new Set(prev).size === 14
      }),
      lastIndex => lastIndex + 1,
      log
    )
  },
}
