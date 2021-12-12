const { log, sumArray } = require('../utils')
const { getStartingFish } = require('./q1')
const { get, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

//run with only the starting inputs [1, 2, 3, 4, 5]
const SEED = [null, 6206821033, 5617089148, 5217223242, 4726100874, 4368232009 ]

const getTotalFishCreated = (totalTime, timer) => {
    let totalOffspring = 0
    let timeRemaning = totalTime - timer

    while(timeRemaning > 0) {

        totalOffspring = totalOffspring + 1 + getTotalFishCreated(timeRemaning, 9)

        timeRemaning = timeRemaning - 7
    }

    return totalOffspring
}

module.exports = {
  run: () => {
    get(
      getStartingFish(),
      //log,
      reduce(
        (acc, timer) => {
            acc[timer] = acc[timer] || 0
            acc[timer] = acc[timer] + 1
            
            return acc
        }
        , []
      ),
      //log,
      map((count, i) => count * SEED[i]),
      //log,
      sumArray,
      log
    )
  },
}