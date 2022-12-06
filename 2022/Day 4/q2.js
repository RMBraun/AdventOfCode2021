const { getRawInput, log } = require('../../utils')
const { get, split, map, reduce } = require('@rybr/lenses')

const getPriority = char => {
  const charCode = char.charCodeAt(0)
  const offset = charCode <= 90 ? 64 - 26 : 96
  return charCode - offset
}

module.exports = {
  getPriority,
  run: () => {
    get(
      getRawInput(`./2022/Day 4/input.txt`),
      split('\n'),
      map(pair =>
        get(
          pair,
          split(','),
          map(range =>
            get(
              range,
              split('-'),
              map(id => parseInt(id))
            )
          )
        )
      ),
      // log,
      reduce((acc, [a, b]) => {
        return (a[0] <= b[1] && a[1] >= b[0]) || (b[0] < a[1] && b[1] >= a[0]) ? acc + 1 : acc
      }, 0),
      log
    )
  },
}
