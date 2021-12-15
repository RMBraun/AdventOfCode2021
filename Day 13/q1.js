const { getInputs, log, sumArray } = require('../utils')
const { get, defaults, set, sort, reduce, map, concat, entries, filter, values, slice } = require('@rybr/lenses')

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
      log,
      grid => {
        console.log('\n\n')
        const { axis, num } = folds[0]

        const yStart = axis === 'y' ? num + 1 : 0
        const xStart = axis === 'x' ? num + 1 : 0

        for (let y = yStart; y <= largestY; y++) {
          for (let x = xStart; x <= largestX; x++) {
            if (grid[y][x] === '#') {
              const mirrorY = axis === 'y' ? 2 * num - y : y
              const mirrorX = axis === 'x' ? 2 * num - x : x

              grid[mirrorY][mirrorX] = '#'
            }
          }
        }

        return axis === 'y' ? grid.slice(0, num) : grid.map(row => row.slice(0, num))
      },
      //map(row => row.join('')),
      log,
      map(row => row.reduce((acc, curr) => acc + (curr === '#' ? 1 : 0), 0)),
      log,
      sumArray,
      log
    )
  },
}
