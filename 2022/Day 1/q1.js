const { getRawInput, log } = require('../../utils')
const { get, split, reduce, map, sort } = require('@rybr/lenses')

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 1/input.txt`),
      split('\n\n'),
      map(rawInput =>
        get(
          rawInput,
          split('\n'),
          reduce((acc, caloriesString) => acc + parseInt(caloriesString), 0)
        )
      ),
      sort((a, b) => b - a),
      0,
      log
    )
  },
}
