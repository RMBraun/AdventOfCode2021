const { getInputs, log, sumArray } = require('../utils')
const { get, defaults, set, reduce, map, concat, entries, filter, values } = require('@rybr/lenses')

const SIZE = {
  SMALL: 'SMALL',
  LARGE: 'LARGE',
}
const aCharCode = 'a'.charCodeAt(0)

const getCaveSize = caveId => (caveId.charCodeAt(0) >= aCharCode ? SIZE.SMALL : SIZE.LARGE)

const getCaves = useTest =>
  getInputs(`./Day 12/${useTest ? 'test' : ''}input.txt`).reduce((acc, curr) => {
    const [caveIdStart, caveIdEnd] = curr.split('-')

    set(acc, caveIdStart, 'id', caveIdStart)
    set(acc, caveIdStart, 'size', getCaveSize(caveIdStart))
    set(acc, caveIdStart, 'connections', connections => get(connections, defaults([]), concat(caveIdEnd)))

    set(acc, caveIdEnd, 'id', caveIdEnd)
    set(acc, caveIdEnd, 'size', getCaveSize(caveIdEnd))
    set(acc, caveIdEnd, 'connections', connections => get(connections, defaults([]), concat(caveIdStart)))

    return acc
  }, {})

const purgeDeadEnds = caves => {
  const deadCaves = get(
    caves,
    values(),
    filter(
      ({ connections }) =>
        connections.length === 0 || (connections.length === 1 && getCaveSize(connections[0]) === SIZE.SMALL)
    ),
    map(({ id }) => id)
  )

  return deadCaves.length === 0
    ? caves
    : get(
        caves,
        entries(),
        reduce((acc, [caveId, caveInfo]) => {
          if (!deadCaves.includes(caveId)) {
            acc[caveId] = set(caveInfo, 'connections', connections => connections.filter(id => !deadCaves.includes(id)))
          }

          return acc
        }, {})
      )
}

const findPaths = (caves, caveId = 'start', currentPath = [], allPaths = []) => {
  if (caveId === 'end') {
    currentPath.push(caveId)
    allPaths.push(currentPath)
  } else {
    const connections = get(
      caves,
      caveId,
      'connections',
      filter(
        connectionId =>
          caves[connectionId].size === SIZE.LARGE ||
          (caves[connectionId].size === SIZE.SMALL && !currentPath.includes(connectionId))
      )
    )

    connections.forEach(connectionId => {
      findPaths(caves, connectionId, currentPath.concat(caveId), allPaths)
    })
  }

  return allPaths
}

module.exports = {
  run: () => {
    get(
      getCaves(),
      purgeDeadEnds,
      //log,
      findPaths,
      //   map(row => row.join(',')),
      //   log,
      'length',
      log
    )
  },
  getCaveSize,
  getCaves,
  SIZE,
}
