const { getRawInput, log, sumArray } = require('../../utils')
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
      getRawInput(`./2022/Day 3/input.txt`),
      split('\n'),
      map(raw => {
        const rawChars = raw.split('')
        const [a, b] = [rawChars.splice(0, (rawChars.length + 1) / 2), rawChars]
        return a.find(charA => b.includes(charA))
      }),
      map(getPriority),
      sumArray,
      log
    )
  },
}
