const { getRawInput, log } = require('../../utils')
const { get, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

const getStartingFish = useTest =>
  get(
    getRawInput(`./Day 6/${useTest ? 'test' : ''}input.txt`),
    split(','),
    map(numStr => parseInt(numStr))
  )

module.exports = {
  run: () => {
    get(
      getStartingFish(true),
      //log,
      fish => {
        const fishModel = fish.slice(0)
        let newTime
        let newFishCount = 0
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < fishModel.length; j++) {
            newTime = fishModel[j] - 1

            if (newTime === -1) {
              fishModel[j] = 6
              fishModel.push(9)
            } else {
              fishModel[j] = newTime
            }
          }

          console.log(`day ${23 - i}:`, fishModel.join(','))
        }

        return fishModel
      },
      'length',
      log
    )
  },
  getStartingFish,
}
