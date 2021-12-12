const { getCrabPositions, getPossiblePositions } = require('./q1')
const { log, sumArray, unique } = require('../utils')
const { get, sort, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

const sumFactorial = num => {
  let sum = 0

  for (let i = 1; i <= num; i++) {
    sum = sum + i
  }

  return sum
}

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
          reduce((acc2, crabX) => acc2 + sumFactorial(Math.abs(crabX - x)), 0)
        )

        return leastCost < cost ? leastCost : cost
      }, Infinity),
      log
    )
  },
  getCrabPositions,
}
