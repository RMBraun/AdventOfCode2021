const { getInputs, log, sumArray, unique } = require('../utils')
const { get, sort, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

const getSegmentsAndOutputs = useTest =>
  get(
    getInputs(`./Day 8/${useTest ? 'test' : ''}input.txt`),
    map(line => {
      const [segments, outputs] = line.split(' | ')

      return {
        segments: segments
          .trim()
          .split(' ')
          .map(combo => combo.split('')),
        outputs: outputs
          .trim()
          .split(' ')
          .map(combo => combo.split('')),
      }
    })
  )

module.exports = {
  run: () => {
    get(
      getSegmentsAndOutputs(),
      //1 => 2 chars
      //4 => 4 chars
      //7 => 3 chars
      //8 => 7 chars
      reduce(
        (acc, { outputs }) =>
          acc +
          outputs.filter(
            combos => combos.length === 2 || combos.length === 3 || combos.length === 4 || combos.length === 7
          ).length,

        0
      ),
      log
    )
  },
  getSegmentsAndOutputs,
}
