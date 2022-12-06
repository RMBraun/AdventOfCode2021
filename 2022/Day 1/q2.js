const { getRawInput, log } = require('../../utils')
const { get, split, reduce, map, sort, slice } = require('@rybr/lenses')

const getStartingFish = useTest =>
  get(
    getRawInput(`./2022/Day 1/${useTest ? 'test' : ''}input.txt`),
    split(','),
    map(numStr => parseInt(numStr))
  )

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
      slice(0, 3),
      reduce((acc, curr) => acc + curr, 0),
      log
    )
  },
}
