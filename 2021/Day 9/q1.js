const { getInputs, log, sumArray } = require('../utils')
const { get, reduce, map } = require('@rybr/lenses')

const getHeightMap = useTest =>
  get(
    getInputs(`./Day 9/${useTest ? 'test' : ''}input.txt`),
    map(row =>
      row
        .trim()
        .split('')
        .map(numStr => parseInt(numStr))
    )
  )

const isLowestPoint = (heightMap, height, x, y) => {
  const adjacentHeights = []

  if (x !== 0) adjacentHeights.push(heightMap[y][x - 1])
  if (x !== heightMap[0].length - 1) adjacentHeights.push(heightMap[y][x + 1])

  if (y !== 0) adjacentHeights.push(heightMap[y - 1][x])
  if (y !== heightMap.length - 1) adjacentHeights.push(heightMap[y + 1][x])

  return adjacentHeights.every(adjacentHeight => adjacentHeight > height)
}

module.exports = {
  run: () => {
    get(
      getHeightMap(),
      reduce((acc, row, y, heightMap) => {
        row.forEach((height, x) => {
          if (isLowestPoint(heightMap, height, x, y)) {
            acc.push(height + 1)
          }
        })

        return acc
      }, []),
      sumArray,
      log
    )
  },
}
