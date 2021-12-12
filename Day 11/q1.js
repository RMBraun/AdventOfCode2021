const { getInputs, log, sumArray } = require('../utils')
const { get, set, reduce, map, slice } = require('@rybr/lenses')

const N = 10

const getOctopusGrid = useTest =>
  getInputs(`./Day 11/${useTest ? 'test' : ''}input.txt`).map((row, y) =>
    row
      .trim()
      .split('')
      .map((numStr, x) => ({ val: parseInt(numStr), hasFlashed: false, x, y }))
  )

const printGrid = grid => console.log(grid.map(row => row.map(point => point.val).join(',\t')).join('\n') + '\n')

const incGrid = grid =>
  grid.map(row =>
    row.map(point => {
      point.val = point.val > 9 ? 0 : point.val + 1
      point.hasFlashed = false
      return point
    })
  )

const getAdjacentPoints = (grid, coord) => {
  let y = Math.min(Math.max(coord.y - 1, 0), N - 1)
  const y2 = Math.min(Math.max(coord.y + 1, 0), N - 1)
  let x = Math.min(Math.max(coord.x - 1, 0), N - 1)
  const x2 = Math.min(Math.max(coord.x + 1, 0), N - 1)

  let points = []

  for (let j = y; j <= y2; j++) {
    for (let i = x; i <= x2; i++) {
      if (coord.x != i || coord.y != j) {
        points.push(grid.get(i, j))
      }
    }
  }

  return points
}

const getFlashPoints = grid => {
  let points = []
  let point
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      point = grid.get(x, y)
      if (!point.hasFlashed && point.val > 9) {
        points.push(point)
      }
    }
  }

  return points
}

const processFlashes = (grid, flashCount = 0, allFlashedPoints = []) => {
  const flashPoints = getFlashPoints(grid)

  if (flashPoints.length === 0) {
    allFlashedPoints.forEach(point => {
      point.val = 0
    })
    return flashCount
  }

  flashPoints.forEach(point => {
    point.val = point.val + 1
    point.hasFlashed = true
    getAdjacentPoints(grid, point).forEach(adjPoint => {
      adjPoint.val = adjPoint.val + 1
    })
  })

  return processFlashes(grid, flashCount + flashPoints.length, allFlashedPoints.concat(flashPoints))
}

module.exports = {
  run: () => {
    const grid = getOctopusGrid()

    let flashCount = 0
    for (let count = 0; count < 100; count++) {
      incGrid(grid)
      flashCount = processFlashes(grid, flashCount)
    }

    console.log(flashCount)
  },
  getOctopusGrid,
  incGrid,
  getAdjacentPoints,
  getFlashPoints,
  processFlashes,
}
