const { getInputs, log, sumArray, unique } = require('../utils')
const { get, defaults, set, reduce, map, concat, entries, filter, values, sort } = require('@rybr/lenses')
const { SIZE, getCaveSize, getCaves } = require('./q1')

const findPaths = (caves, caveId = 'start', currentPath = [], allPaths = [], hasRevisited = false) => {
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
          connectionId !== 'start' &&
          (caves[connectionId].size === SIZE.LARGE ||
            !hasRevisited ||
            (caves[connectionId].size === SIZE.SMALL && !currentPath.includes(connectionId)))
      )
    )

    connections.forEach(connectionId => {
      findPaths(
        caves,
        connectionId,
        currentPath.concat(caveId),
        allPaths,
        hasRevisited || (caves[connectionId].size === SIZE.SMALL && currentPath.includes(connectionId))
      )
    })
  }

  return allPaths
}

module.exports = {
  run: () => {
    get(
      getCaves(),
      //log,
      findPaths,
      //   map(row => row.join(',')),
      //   sort((a, b) => (a > b ? 1 : -1)),
      //   log,
      'length',
      log
    )
  },
}
