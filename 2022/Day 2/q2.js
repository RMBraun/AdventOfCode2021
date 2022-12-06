const { getRawInput, log, sumArray } = require('../../utils')
const { get, split, map, replace } = require('@rybr/lenses')

// A : Rock : 1
// B : Paper : 2
// C : Scissors : 3

// X : lose
// Y : draw
// Z : win

const MATCH_POINTS = {
  X: 0,
  Y: 3,
  Z: 6,
}

const CHOICE_MAP = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
}

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 2/input.txt`),
      split('\n'),
      map(input => get(input, replace(' ', ''))),
      // log,
      map(input => MATCH_POINTS[input.charAt(1)] + CHOICE_MAP[input.charAt(0)][input.charAt(1)]),
      // log,
      sumArray,
      log
    )
  },
}
