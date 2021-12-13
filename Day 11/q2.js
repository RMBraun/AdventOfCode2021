const { get, set, reduce, map, slice } = require('@rybr/lenses')
const { getOctopusGrid, getAdjacentPoints, getFlashPoints, processFlashes, incGrid } = require('./q1')

const areAllZero = grid => grid.every(row => row.every(point => point.val === 0))

module.exports = {
  run: () => {
    const grid = getOctopusGrid(false)

    for (let count = 0; count < 500; count++) {
      if (areAllZero(grid)) {
        console.log(count)
        break
      }
      incGrid(grid)
      processFlashes(grid)
    }
  },
}
