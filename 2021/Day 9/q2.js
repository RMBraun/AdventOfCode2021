const { getInputs, log, sumArray } = require('../utils')
const { get, reduce, map, sort, slice } = require('@rybr/lenses')

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

const getAdjacentPoints = (heightMap, coordinates = []) => {
  const adjacentHeights = []

  coordinates.forEach(({ x, y }) => {
    if (x !== 0) adjacentHeights.push({ height: heightMap[y][x - 1], x: x - 1, y })
    if (x !== heightMap[0].length - 1) adjacentHeights.push({ height: heightMap[y][x + 1], x: x + 1, y })
    if (y !== 0) adjacentHeights.push({ height: heightMap[y - 1][x], x, y: y - 1 })
    if (y !== heightMap.length - 1) adjacentHeights.push({ height: heightMap[y + 1][x], x, y: y + 1 })
  })

  return adjacentHeights
}

const isLowestPoint = (heightMap, height, x, y) => {
  return getAdjacentPoints(heightMap, [{ height, x, y }]).every(({ height: adjacentHeight }) => adjacentHeight > height)
}

const searchForBasinCoords = (heightMap, { height, x, y }, allCoordsMap = {}) => {
  const adjacentPoints = getAdjacentPoints(heightMap, [{ height, x, y }]).filter(
    ({ height, x, y }) => height !== 9 && allCoordsMap[`${x}${y}`] == null
  )

  adjacentPoints.forEach(({ height, x, y }) => {
    allCoordsMap[`${x}${y}`] = { height, x, y }
  })

  adjacentPoints.forEach(coord => {
    searchForBasinCoords(heightMap, coord, allCoordsMap)
  })

  return allCoordsMap
}

module.exports = {
  run: () => {
    const heightMap = getHeightMap()

    get(
      heightMap,
      reduce((acc, row, y) => {
        row.forEach((height, x) => {
          if (isLowestPoint(heightMap, height, x, y)) {
            acc.push({
              height,
              x,
              y,
            })
          }
        })

        return acc
      }, []),
      map(point => Object.keys(searchForBasinCoords(heightMap, point)).length),
      sort((a, b) => b - a),
      slice(0, 3),
      reduce((acc, curr) => acc * curr, 1),
      log
    )
  },
}
