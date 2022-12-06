const { getRawInput, log, sumArray } = require('../../utils')
const { get, split, map } = require('@rybr/lenses')

// A : Rock : 1
// B : Paper : 2
// C : Scissors : 3

// X : Rock : 1
// Y : Paper : 2
// Z : Scissors : 3

// A > Z
// B > X
// C > Y

const POINTS = {
  X: 1,
  Y: 2,
  Z: 3,
}

const MATCH_POINTS = {
  AZ: 0,
  BX: 0,
  CY: 0,
  AX: 3,
  BY: 3,
  CZ: 3,
  CX: 6,
  AY: 6,
  BZ: 6,
}

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 2/input.txt`),
      split('\n'),
      map(input => input.replace(' ', '')),
      // log,
      map(input => MATCH_POINTS[input] + POINTS[input.charAt(1)]),
      // log,
      sumArray,
      log
    )
  },
}
