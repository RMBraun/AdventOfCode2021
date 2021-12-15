const { getInputs, log, sumArray } = require('../utils')
const { get, defaults, set, sort, reduce, map, concat, entries, filter, values, slice, join } = require('@rybr/lenses')

const getCoords = useTest =>
  getInputs(`./Day 13/${useTest ? 'test' : ''}input_1.txt`).map(row => row.split(',').map(numStr => parseInt(numStr)))

const getFolds = useTest =>
  getInputs(`./Day 13/${useTest ? 'test' : ''}input_2.txt`).map(row => {
    const [axis, num] = row.split(' ')[2].split('=')

    return {
      axis,
      num: parseInt(num),
    }
  })

const foldPaper = (grid, axis, num) => {
  const largestY = grid.length
  const largestX = grid[0].length

  const yStart = axis === 'y' ? num + 1 : 0
  const xStart = axis === 'x' ? num + 1 : 0

  for (let y = yStart; y < largestY; y++) {
    for (let x = xStart; x < largestX; x++) {
      if (grid[y][x] === '#') {
        const mirrorY = axis === 'y' ? 2 * num - y : y
        const mirrorX = axis === 'x' ? 2 * num - x : x

        grid[mirrorY][mirrorX] = '#'
      }
    }
  }

  return axis === 'y' ? grid.slice(0, num) : grid.map(row => row.slice(0, num))
}

module.exports = {
  run: () => {
    const coords = getCoords()
    const folds = getFolds()

    const largestX = get(
      coords,
      sort((a, b) => b[0] - a[0]),
      0,
      0
    )

    const largestY = get(
      coords,
      sort((a, b) => b[1] - a[1]),
      0,
      1
    )

    get(
      coords,
      reduce(
        (acc, [x, y]) => {
          acc[y][x] = '#'

          return acc
        },
        Array(largestY + 1)
          .fill()
          .map(() => Array(largestX + 1).fill('.'))
      ),
      //   log,
      grid => {
        const { axis, num } = folds[0]

        return folds.reduce((acc, { axis, num }) => foldPaper(acc, axis, num), grid)
      },
      map(row => row.join('')),
      join('\n'),
      log
    )
  },
}
