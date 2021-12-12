const { getRawInput, log, sumArray, unique } = require('../utils')
const { get, sort, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

const getCrabPositions = useTest =>
  get(
    getRawInput(`./Day 7/${useTest ? 'test' : ''}input.txt`),
    split(','),
    map(numStr => parseInt(numStr))
  )

const getPossiblePositions = crabs =>
  get(
    {
      min: Math.min(...crabs),
      max: Math.max(...crabs),
    },
    ({ min, max }) =>
      new Array(max + 1)
        .fill(null)
        .map((_, i) => i)
        .filter(position => position >= min)
  )

module.exports = {
  run: () => {
    const crabs = getCrabPositions()

    get(
      crabs,
      //get unique positions
      getPossiblePositions,
      //determine fuel cost for each position
      reduce((leastCost, x) => {
        const cost = get(
          crabs,
          reduce((acc2, crabX) => acc2 + Math.abs(crabX - x), 0)
        )

        return leastCost < cost ? leastCost : cost
      }, Infinity),
      log
    )
  },
  getCrabPositions,
  getPossiblePositions,
}
